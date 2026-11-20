import React, { useState } from 'react';
import { updateSettings, updateAdminPassword } from '../../../api';
import { useToast } from '../../ui/Toast';
import { Save, Key, Globe, Share2, Palette } from 'lucide-react';

const SettingsModule = ({ settings, onUpdated }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    siteTitle: settings?.siteTitle || '',
    siteTagline: settings?.siteTagline || '',
    metaDescription: settings?.metaDescription || '',
    keywords: settings?.keywords || '',
    ogImage: settings?.ogImage || '',
    socialLinks: {
      github: settings?.socialLinks?.github || 'https://github.com',
      linkedin: settings?.socialLinks?.linkedin || 'https://linkedin.com',
      twitter: settings?.socialLinks?.twitter || 'https://twitter.com',
      instagram: settings?.socialLinks?.instagram || 'https://instagram.com',
      whatsapp: settings?.socialLinks?.whatsapp || 'https://wa.me/923123456789'
    }
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [savingSettings, setSavingSettings] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleSocialChange = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [field]: val }
    }));
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      setSavingSettings(true);
      const res = await updateSettings(formData);
      if (res.data.success) {
        toast.success('Website & SEO settings updated!');
        if (onUpdated) onUpdated();
      }
    } catch (err) {
      toast.error('Failed to update website settings.');
    } finally {
      setSavingSettings(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    try {
      setSavingPassword(true);
      const res = await updateAdminPassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      if (res.data.success) {
        toast.success('Admin password updated successfully!');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update password.');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      
      <form onSubmit={handleSettingsSubmit} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <div>
            <h3 className="font-bold text-lg text-primary">SEO & Platform Settings</h3>
            <p className="text-xs text-secondary">
              Configure search engine metadata, Open Graph sharing, and social profiles.
            </p>
          </div>
          <button
            type="submit"
            disabled={savingSettings}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-darkBrown text-warmBeige text-xs font-semibold shadow-sm transition-all disabled:opacity-60 cursor-pointer self-start sm:self-auto"
          >
            <Save className="w-4 h-4" />
            <span>{savingSettings ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-2">
                Website Meta Title *
              </label>
              <input
                type="text"
                value={formData.siteTitle}
                onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                required
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-2">
                Site Tagline
              </label>
              <input
                type="text"
                value={formData.siteTagline}
                onChange={(e) => setFormData({ ...formData, siteTagline: e.target.value })}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-2">
              SEO Meta Description
            </label>
            <textarea
              rows={3}
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50/50 resize-y"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-2">
              SEO Keywords (Comma separated)
            </label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50/50 font-mono"
            />
          </div>

          
          <div className="pt-4 border-t border-stone-100">
            <h4 className="text-xs font-mono uppercase text-stone-600 font-semibold mb-4">
              Social Media Accounts:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-stone-500 mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={formData.socialLinks.github}
                  onChange={(e) => handleSocialChange('github', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/50 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-stone-500 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={formData.socialLinks.linkedin}
                  onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/50 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-stone-500 mb-1">Twitter / X URL</label>
                <input
                  type="text"
                  value={formData.socialLinks.twitter}
                  onChange={(e) => handleSocialChange('twitter', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/50 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-stone-500 mb-1">WhatsApp Direct Link</label>
                <input
                  type="text"
                  value={formData.socialLinks.whatsapp}
                  onChange={(e) => handleSocialChange('whatsapp', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/50 font-mono"
                />
              </div>
            </div>
          </div>

          
          <div className="pt-4 border-t border-stone-100">
            <h4 className="text-xs font-mono uppercase text-stone-600 font-semibold mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4 text-accent" />
              <span>Design System Color Palette</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
              {[
                { name: 'Background', hex: '#FDFDFD', text: '#0A0909' },
                { name: 'Primary', hex: '#0A0909', text: '#FFFFFF' },
                { name: 'Secondary', hex: '#707070', text: '#FFFFFF' },
                { name: 'Dark Brown', hex: '#5E3A30', text: '#FFFFFF' },
                { name: 'Warm Beige', hex: '#CEB3A6', text: '#0A0909' },
                { name: 'Accent', hex: '#9C6455', text: '#FFFFFF' }
              ].map((c) => (
                <div
                  key={c.name}
                  className="p-3 rounded-xl border border-stone-200 text-center shadow-xs"
                  style={{ backgroundColor: c.hex, color: c.text }}
                >
                  <p className="font-bold text-[11px] leading-tight">{c.name}</p>
                  <p className="font-mono text-[10px] mt-1 opacity-90">{c.hex}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>

      
      <form onSubmit={handlePasswordSubmit} className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div>
          <h3 className="font-bold text-base text-primary flex items-center gap-2">
            <Key className="w-4 h-4 text-accent" />
            <span>Update Master Admin Password</span>
          </h3>
          <p className="text-xs text-secondary mt-0.5">
            Change credentials used to authenticate to /admin
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-stone-600 font-semibold mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              required
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-stone-600 font-semibold mb-1">
              New Password
            </label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              required
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-stone-600 font-semibold mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              required
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={savingPassword}
            className="px-5 py-2 text-xs font-semibold rounded-xl bg-stone-800 hover:bg-black text-white transition-colors"
          >
            {savingPassword ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsModule;
