import React, { useState } from 'react';
import { updateSettings } from '../../../api';
import { useToast } from '../../ui/Toast';
import { Save, Globe, Instagram, Linkedin, Github, Twitter, MessageCircle, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

const SocialLinksModule = ({ settings, onUpdated }) => {
  const toast = useToast();
  const [socialLinks, setSocialLinks] = useState({
    dribbble: settings?.socialLinks?.dribbble || 'https://dribbble.com/shots/26995447-Personal-Portfolio-Website-Animations',
    instagram: settings?.socialLinks?.instagram || 'https://instagram.com',
    linkedin: settings?.socialLinks?.linkedin || 'https://linkedin.com',
    github: settings?.socialLinks?.github || 'https://github.com',
    twitter: settings?.socialLinks?.twitter || 'https://twitter.com',
    whatsapp: settings?.socialLinks?.whatsapp || 'https://wa.me/923123456789',
    behance: settings?.socialLinks?.behance || 'https://behance.net',
    youtube: settings?.socialLinks?.youtube || 'https://youtube.com'
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (network, val) => {
    setSocialLinks((prev) => ({ ...prev, [network]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await updateSettings({
        socialLinks
      });
      if (res.data.success) {
        toast.success('Social profile links updated successfully!');
        if (onUpdated) onUpdated();
      }
    } catch (err) {
      toast.error('Failed to update social links.');
    } finally {
      setSaving(false);
    }
  };

  const platforms = [
    { key: 'dribbble', label: 'Dribbble (Featured in Hero)', icon: Globe, placeholder: 'https://dribbble.com/shots/...' },
    { key: 'instagram', label: 'Instagram (Hero Pill)', icon: Instagram, placeholder: 'https://instagram.com/username' },
    { key: 'linkedin', label: 'LinkedIn Professional Profile', icon: Linkedin, placeholder: 'https://linkedin.com/in/username' },
    { key: 'github', label: 'GitHub Open Source Profile', icon: Github, placeholder: 'https://github.com/username' },
    { key: 'twitter', label: 'Twitter / X', icon: Twitter, placeholder: 'https://twitter.com/username' },
    { key: 'whatsapp', label: 'WhatsApp Direct Chat URL', icon: MessageCircle, placeholder: 'https://wa.me/923123456789' },
    { key: 'behance', label: 'Behance Portfolio', icon: Globe, placeholder: 'https://behance.net/username' },
    { key: 'youtube', label: 'YouTube Channel', icon: Globe, placeholder: 'https://youtube.com/@channel' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
        <div>
          <span className="text-[11px] font-mono text-stone-400 font-semibold tracking-wider uppercase block mb-1">
            MODULE 14 / SOCIAL LINKS & CHANNELS
          </span>
          <h3 className="font-bold text-lg text-primary">Social Profiles & Outreach Links</h3>
          <p className="text-xs text-secondary">
            Manage the social pills in the Hero section, contact links, and footer navigation handles.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-black text-white hover:bg-stone-800 text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Social Links'}</span>
        </button>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map((p) => {
          const Icon = p.icon;
          const currentUrl = socialLinks[p.key] || '';
          return (
            <div
              key={p.key}
              className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-black transition-all shadow-xs space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <label className="text-xs font-mono uppercase font-semibold text-primary">
                    {p.label}
                  </label>
                </div>

                {currentUrl && (
                  <a
                    href={currentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-stone-500 hover:text-black flex items-center gap-1 transition-colors"
                  >
                    <span>Test Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <input
                type="url"
                value={currentUrl}
                onChange={(e) => handleChange(p.key, e.target.value)}
                placeholder={p.placeholder}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20 font-mono text-stone-700"
              />
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default SocialLinksModule;
