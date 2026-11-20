import React, { useState } from 'react';
import { updateProfile, uploadFile, deleteUploadedFile } from '../../../api';
import { useToast } from '../../ui/Toast';
import { Save, Upload, Trash2, MapPin, CheckCircle, Mail, Phone, MessageSquare, User, Eye } from 'lucide-react';

const ProfileModule = ({ profile, onUpdated }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: profile?.name || 'Muhammad Yasin',
    designation: profile?.designation || 'Full Stack Web & App Developer',
    email: profile?.email || 'contact@yasinportfolio.dev',
    phone: profile?.phone || '+92 312 3456789',
    whatsapp: profile?.whatsapp || '+92 312 3456789',
    location: profile?.location || 'Balochistan, Pakistan',
    availabilityStatus: profile?.availabilityStatus || 'Available for Freelance & Collaboration',
    isAvailable: profile?.isAvailable ?? true,
    avatar: profile?.avatar || '/designer_headshot.jpg',
    resumeUrl: profile?.resumeUrl || '',
    yearsOfExperience: profile?.yearsOfExperience || 5,
    completedProjects: profile?.completedProjects || 45
  });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const res = await uploadFile(file);
      if (res.data.success && res.data.url) {
        setFormData((prev) => ({ ...prev, avatar: res.data.url }));
        toast.success('Avatar image uploaded successfully!');
      }
    } catch (err) {
      toast.error('Failed to upload image. Please check file format.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteAvatar = async () => {
    if (!formData.avatar) return;
    try {
      await deleteUploadedFile({ url: formData.avatar });
      setFormData((prev) => ({ ...prev, avatar: '/designer_headshot.jpg' }));
      toast.success('Avatar reset to default.');
    } catch (err) {
      setFormData((prev) => ({ ...prev, avatar: '/designer_headshot.jpg' }));
      toast.info('Avatar set to reference default.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await updateProfile(formData);
      if (res.data.success) {
        toast.success('Profile details saved successfully!');
        if (onUpdated) onUpdated();
      }
    } catch (err) {
      toast.error('Failed to save profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
        <div>
          <span className="text-[11px] font-mono text-stone-400 font-semibold tracking-wider uppercase block mb-1">
            MODULE 02 / PROFILE MANAGEMENT
          </span>
          <h3 className="font-bold text-lg text-primary">Personal & Professional Profile</h3>
          <p className="text-xs text-secondary">
            Manage your personal bio, contact info, geographical location, and active availability badge.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-black text-white hover:bg-stone-800 text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4 text-center">
            <h4 className="text-xs font-mono uppercase text-secondary font-semibold text-left">
              Profile Photo / Cutout
            </h4>

            <div className="relative w-44 h-52 mx-auto rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 flex items-center justify-center group shadow-xs">
              <img
                src={formData.avatar || '/designer_headshot.jpg'}
                alt="Profile Preview"
                className="w-full h-full object-contain object-bottom"
                onError={(e) => {
                  e.target.src = '/designer_headshot.jpg';
                }}
              />
              {uploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-mono">
                  Uploading...
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={handleDeleteAvatar}
                className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                title="Reset to default image"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-stone-400">
              Recommended: Front-facing portrait cutout on solid white or transparent background.
            </p>
          </div>

          
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
            <h4 className="text-xs font-mono uppercase text-secondary font-semibold">
              Live Status Indicator
            </h4>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${formData.isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'}`} />
                <span className="text-xs font-semibold text-primary">
                  {formData.isAvailable ? 'Active & Available' : 'Busy / Not Taking Projects'}
                </span>
              </div>
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="w-4 h-4 accent-black rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-stone-600 font-semibold mb-1">
                Badge Display Text
              </label>
              <input
                type="text"
                name="availabilityStatus"
                value={formData.availabilityStatus}
                onChange={handleChange}
                placeholder="e.g. Available for New Project"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>
          </div>
        </div>

        
        <div className="lg:col-span-8 p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Professional Designation *
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Primary Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Downloadable Resume / CV Document URL
              </label>
              <input
                type="text"
                name="resumeUrl"
                value={formData.resumeUrl}
                onChange={handleChange}
                placeholder="e.g. https://drive.google.com/file/... or /uploads/resume.pdf"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20 font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Location (City, Country)
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Years of Experience (Numeric)
              </label>
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Completed Projects Count
              </label>
              <input
                type="number"
                name="completedProjects"
                value={formData.completedProjects}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileModule;
