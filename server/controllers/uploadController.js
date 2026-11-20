const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const hasCloudinary = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (hasCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
}

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please provide a file to upload.' });
    }

    let fileUrl = `/uploads/${req.file.filename}`;
    let publicId = null;

    if (hasCloudinary) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: 'portfolio_uploads',
          resource_type: 'auto'
        });
        if (uploadResult && uploadResult.secure_url) {
          fileUrl = uploadResult.secure_url;
          publicId = uploadResult.public_id;
        }
      } catch (cloudErr) {
        console.warn('[Upload] Cloudinary upload failed, falling back to local storage:', cloudErr.message);
      }
    }

    res.json({
      success: true,
      message: 'File uploaded successfully.',
      url: fileUrl,
      filename: req.file.filename,
      publicId: publicId,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { url, filename, publicId } = req.body;

    if (publicId && hasCloudinary) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.warn('[Upload] Cloudinary deletion error:', err.message);
      }
    }

    const targetName = filename || (url && url.startsWith('/uploads/') ? path.basename(url) : null);
    if (targetName) {
      const localPath = path.join(__dirname, '../uploads', targetName);
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath);
      }
    }

    res.json({
      success: true,
      message: 'File removed successfully.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { uploadFile, deleteFile };
