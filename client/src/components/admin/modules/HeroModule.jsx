import React, { useState } from 'react';
import { updateProfile } from '../../../api';
import { useToast } from '../../ui/Toast';
import { Save, Sparkles, Eye, ArrowUpRight, Globe, Layers, MapPin, CheckCircle2 } from 'lucide-react';

const HeroModule = ({ profile, onUpdated }) => {
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    name: profile?.name || 'Muhammad Yasin',
    designation: profile?.designation || 'Full Stack Web & App Developer',
    headline: profile?.headline || 'Building Digital Experiences That Make a Difference.',
    shortIntro:
      profile?.shortIntro ||
      'I build modern, scalable and user-focused web and mobile applications, transforming ideas into powerful digital products.',
    location: profile?.location || 'Balochistan, Pakistan',
    availabilityStatus: profile?.availabilityStatus || 'Available for Freelance & Collaboration',
    avatar: profile?.avatar || '/designer_headshot.jpg',
    resumeUrl: profile?.resumeUrl || '/uploads/Muhammad_Yasin_FullStack_Resume.pdf',
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await updateProfile(formData);
      if (res.data.success) {
        toast.success('Hero content updated successfully!');
        if (onUpdated) onUpdated();
      }
    } catch (err) {
      toast.error('Failed to update hero content.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
        <div>
          <span className="text-[11px] font-mono text-stone-400 font-semibold tracking-wider uppercase block mb-1">
            MODULE 03 / HERO CONTENT & BRANDING
          </span>
          <h3 className="font-bold text-lg text-primary">Hero Section Composition</h3>
          <p className="text-xs text-secondary">
            Configure the main developer headline, value proposition statement, availability status, and showcase portrait.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-black text-white hover:bg-stone-800 text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Hero Changes'}</span>
        </button>
      </div>

      
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-stone-500" />
            <h4 className="text-xs font-mono uppercase text-secondary font-semibold">
              Live Hero Layout Preview
            </h4>
          </div>
          <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold">
            Clean Full-Stack Architecture
          </span>
        </div>

        <div className="p-8 rounded-2xl bg-[#FDFDFD] border border-stone-200 overflow-hidden select-none">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            
            <div className="md:col-span-8 space-y-4 text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-[10px] font-medium text-stone-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {formData.availabilityStatus} • {formData.location}
              </span>

              <div>
                <p className="text-[10px] font-mono uppercase text-stone-400 font-semibold tracking-widest">
                  {formData.designation}
                </p>
                <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight leading-snug mt-1">
                  Building Digital Experiences <br />
                  <span className="text-stone-500">That Make a Difference.</span>
                </h3>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed max-w-lg">
                {formData.shortIntro}
              </p>

              <div className="flex items-center gap-3 pt-1">
                <span className="px-4 py-2 rounded-full bg-black text-white text-[10px] font-semibold">
                  View Selected Work ↗
                </span>
                <span className="px-4 py-2 rounded-full border border-stone-300 text-stone-800 text-[10px] font-semibold">
                  Let's Talk
                </span>
              </div>
            </div>

            
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-36 aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-md">
                <img
                  src={formData.avatar || '/designer_headshot.jpg'}
                  alt="Avatar"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3 text-white">
                  <p className="text-[9px] font-mono text-emerald-400">Full Stack Engineer</p>
                  <p className="text-xs font-bold">{formData.name}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      
      <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
        <h4 className="text-xs font-mono uppercase text-secondary font-semibold">
          Hero Content & Developer Identity
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Developer Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Muhammad Yasin"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Developer Designation *
            </label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
              placeholder="e.g. Full Stack Web & App Developer"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g. Balochistan, Pakistan"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Availability Status *
            </label>
            <input
              type="text"
              name="availabilityStatus"
              value={formData.availabilityStatus}
              onChange={handleChange}
              required
              placeholder="e.g. Available for Freelance & Collaboration"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Main Headline *
            </label>
            <input
              type="text"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              required
              placeholder="Building Digital Experiences That Make a Difference."
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20 font-semibold"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Hero Tagline / Bio Statement *
            </label>
            <textarea
              name="shortIntro"
              rows="3"
              value={formData.shortIntro}
              onChange={handleChange}
              required
              placeholder="I build modern, scalable and user-focused web and mobile applications, transforming ideas into powerful digital products."
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20 leading-relaxed"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Avatar Image Path or URL
            </label>
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="/designer_headshot.jpg"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20 font-mono text-[11px]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Resume / CV Download URL (Google Drive, Cloudinary, PDF link, or Hosted URL)
            </label>
            <input
              type="text"
              name="resumeUrl"
              value={formData.resumeUrl}
              onChange={handleChange}
              placeholder="e.g. https://drive.google.com/file/d/... or /uploads/resume.pdf"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20 font-mono text-[11px]"
            />
            <p className="text-[11px] text-stone-400 mt-1">
              Pass your CV URL here. When visitors click "Download CV" in the Hero section or Footer, this link is opened/downloaded.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default HeroModule;
