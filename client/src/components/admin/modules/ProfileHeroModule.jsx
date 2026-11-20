import React, { useState } from 'react';
import { updateProfile, uploadFile } from '../../../api';
import { useToast } from '../../ui/Toast';
import { Save, Upload, MapPin, CheckCircle } from 'lucide-react';

const ProfileHeroModule = ({ profile, onUpdated }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    designation: profile?.designation || '',
    headline: profile?.headline || '',
    shortIntro: profile?.shortIntro || '',
    location: profile?.location || 'Balochistan, Pakistan',
    availabilityStatus: profile?.availabilityStatus || 'Available for Freelance & Collaboration',
    isAvailable: profile?.isAvailable ?? true,
    email: profile?.email || '',
    phone: profile?.phone || '',
    whatsapp: profile?.whatsapp || '',
    resumeUrl: profile?.resumeUrl || '',
    avatar: profile?.avatar || '',
    yearsOfExperience: profile?.yearsOfExperience || 5,
    completedProjects: profile?.completedProjects || 45,
    technologiesCount: profile?.technologiesCount || 28,
    clientSatisfaction: profile?.clientSatisfaction || 99
  });

  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

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
      setUploadingAvatar(true);
      const res = await uploadFile(file);
      if (res.data.success && res.data.url) {
        setFormData((prev) => ({ ...prev, avatar: res.data.url }));
        toast.success('Avatar image uploaded successfully!');
      }
    } catch (err) {
      toast.error('Failed to upload image. Please check file format.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingResume(true);
      const res = await uploadFile(file);
      if (res.data.success && res.data.url) {
        setFormData((prev) => ({ ...prev, resumeUrl: res.data.url }));
        toast.success('Resume file uploaded successfully!');
      }
    } catch (err) {
      toast.error('Failed to upload resume file.');
    } finally {
      setUploadingResume(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await updateProfile(formData);
      if (res.data.success) {
        toast.success('Profile and Hero section updated successfully!');
        if (onUpdated) onUpdated();
      }
    } catch (err) {
      toast.error('Failed to update profile settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
        <div>
          <h3 className="font-bold text-lg text-primary">Personal Branding & Hero</h3>
          <p className="text-xs text-secondary">
            Manage your headline, introduction, portrait image, and availability indicator.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-darkBrown text-warmBeige text-xs font-semibold shadow-sm transition-all disabled:opacity-60 cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
        </button>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-4 space-y-6">
          
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm text-center">
            <h4 className="text-xs font-mono uppercase text-secondary font-semibold mb-4">
              Profile Portrait
            </h4>
            <div className="relative w-36 h-36 mx-auto rounded-2xl overflow-hidden border-2 border-stone-200 mb-4 bg-stone-100">
              <img
                src={formData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-300 hover:border-darkBrown bg-stone-50 hover:bg-white text-xs font-semibold text-primary cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5 text-accent" />
                <span>{uploadingAvatar ? 'Uploading...' : 'Upload New Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>

              <div>
                <span className="text-[10px] font-mono text-stone-400 block mb-1">
                  Or enter direct image URL:
                </span>
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-stone-50"
                />
              </div>
            </div>
          </div>

          
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
            <h4 className="text-xs font-mono uppercase text-secondary font-semibold">
              Live Availability Indicator
            </h4>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="w-4 h-4 rounded text-darkBrown focus:ring-darkBrown"
              />
              <span className="text-xs font-semibold text-primary">
                Show as Available for Freelance & Collaboration
              </span>
            </label>

            <div>
              <label className="block text-[11px] font-mono text-stone-500 mb-1">
                Badge Display Text
              </label>
              <input
                type="text"
                name="availabilityStatus"
                value={formData.availabilityStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 bg-stone-50"
              />
            </div>
          </div>

          
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
            <h4 className="text-xs font-mono uppercase text-secondary font-semibold">
              Resume / CV File
            </h4>
            <div className="space-y-3">
              <label className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-stone-300 hover:border-darkBrown bg-stone-50 text-xs font-semibold text-primary cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5 text-accent" />
                <span>{uploadingResume ? 'Uploading...' : 'Upload PDF Document'}</span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
              </label>

              <div>
                <span className="text-[10px] font-mono text-stone-400 block mb-1">
                  Resume URL or File Path:
                </span>
                <input
                  type="text"
                  name="resumeUrl"
                  value={formData.resumeUrl}
                  onChange={handleChange}
                  placeholder="/uploads/resume.pdf"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-stone-50"
                />
              </div>
            </div>
          </div>
        </div>

        
        <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-2">
                Developer Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-darkBrown/30 bg-stone-50/50"
              />
            </div>

            
            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-2">
                Professional Designation *
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                placeholder="Full Stack Web & App Developer"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-darkBrown/30 bg-stone-50/50"
              />
            </div>
          </div>

          
          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-2">
              Main Hero Headline *
            </label>
            <input
              type="text"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-darkBrown/30 bg-stone-50/50 font-medium"
            />
          </div>

          
          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-2">
              Short Introduction Paragraph *
            </label>
            <textarea
              name="shortIntro"
              rows={3}
              value={formData.shortIntro}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-darkBrown/30 bg-stone-50/50 resize-y"
            />
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Balochistan, Pakistan"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-darkBrown/30 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-2">
                Primary Contact Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-darkBrown/30 bg-stone-50/50"
              />
            </div>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+92 312 3456789"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-darkBrown/30 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-2">
                WhatsApp Number
              </label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="+92 312 3456789"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-darkBrown/30 bg-stone-50/50"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileHeroModule;
