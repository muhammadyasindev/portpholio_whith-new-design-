import React, { useState } from 'react';
import { updateProfile, uploadFile, deleteUploadedFile } from '../../../api';
import { useToast } from '../../ui/Toast';
import { Save, Upload, Trash2, FileText, Download, ExternalLink, Eye, CheckCircle2, AlertCircle } from 'lucide-react';

const ResumeModule = ({ profile, onUpdated }) => {
  const toast = useToast();
  const [resumeUrl, setResumeUrl] = useState(
    profile?.resumeUrl || '/uploads/Muhammad_Yasin_FullStack_Resume.pdf'
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleUploadResume = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      toast.error('Only PDF documents are supported for resume downloads.');
      return;
    }

    try {
      setUploading(true);
      const res = await uploadFile(file);
      if (res.data.success && res.data.url) {
        setResumeUrl(res.data.url);
        await updateProfile({ resumeUrl: res.data.url });
        toast.success('Resume PDF uploaded and linked successfully!');
        if (onUpdated) onUpdated();
      }
    } catch (err) {
      toast.error('Failed to upload resume file.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteResume = async () => {
    if (!resumeUrl) return;
    try {
      await deleteUploadedFile({ url: resumeUrl });
      setResumeUrl('');
      await updateProfile({ resumeUrl: '' });
      toast.success('Resume removed from system.');
      if (onUpdated) onUpdated();
    } catch (err) {
      setResumeUrl('');
      await updateProfile({ resumeUrl: '' });
      toast.info('Resume link cleared.');
      if (onUpdated) onUpdated();
    }
  };

  const handleManualSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await updateProfile({ resumeUrl });
      if (res.data.success) {
        toast.success('Resume URL configuration saved!');
        if (onUpdated) onUpdated();
      }
    } catch (err) {
      toast.error('Failed to save resume settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
        <div>
          <span className="text-[11px] font-mono text-stone-400 font-semibold tracking-wider uppercase block mb-1">
            MODULE 15 / RESUME & CURRICULUM VITAE
          </span>
          <h3 className="font-bold text-lg text-primary">Resume Management & Downloads</h3>
          <p className="text-xs text-secondary">
            Upload, update, and manage the downloadable CV document linked across your portfolio.
          </p>
        </div>

        <button
          onClick={handleManualSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-black text-white hover:bg-stone-800 text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
            <h4 className="text-xs font-mono uppercase text-secondary font-semibold">
              Current Active Document
            </h4>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-xs text-primary truncate">
                    {resumeUrl ? resumeUrl.split('/').pop() : 'No resume file linked'}
                  </p>
                  <p className="text-[11px] font-mono text-stone-400">PDF Document · Max 15MB</p>
                </div>
              </div>

              {resumeUrl && (
                <div className="flex items-center gap-2 pt-2 border-t border-stone-200">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-black hover:border-black transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CV</span>
                  </a>
                  <button
                    onClick={handleDeleteResume}
                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Remove active resume"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            
            <div className="space-y-2">
              <label className="w-full cursor-pointer flex flex-col items-center justify-center p-6 border-2 border-dashed border-stone-300 hover:border-black rounded-2xl bg-stone-50/50 hover:bg-stone-50 transition-all text-center">
                <Upload className="w-6 h-6 text-stone-500 mb-2" />
                <span className="text-xs font-bold text-black">
                  {uploading ? 'Uploading PDF Document...' : 'Click to Upload New Resume (PDF)'}
                </span>
                <span className="text-[11px] text-stone-400 mt-1">Supports standard PDF up to 15MB</span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleUploadResume}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>

            
            <div className="space-y-1.5 pt-2">
              <label className="block text-[11px] font-mono text-stone-600 font-semibold uppercase">
                Or Enter Hosted Document URL:
              </label>
              <input
                type="text"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                placeholder="/uploads/resume.pdf or https://drive.google.com/..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20 font-mono text-stone-700"
              />
            </div>
          </div>
        </div>

        
        <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono uppercase text-secondary font-semibold">
              Live Document Preview
            </h4>
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-stone-500 hover:text-black flex items-center gap-1"
              >
                <span>Open in Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {resumeUrl ? (
            <div className="rounded-2xl overflow-hidden border border-stone-200 aspect-[4/5] bg-stone-100 flex items-center justify-center shadow-inner">
              <iframe
                src={resumeUrl}
                title="Resume Preview"
                className="w-full h-full border-none"
              />
            </div>
          ) : (
            <div className="p-16 border-2 border-dashed border-stone-200 rounded-2xl text-center space-y-2 text-stone-400">
              <FileText className="w-10 h-10 mx-auto text-stone-300" />
              <p className="text-xs font-medium">No resume document currently loaded.</p>
              <p className="text-[11px]">Upload a PDF to view live preview here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeModule;
