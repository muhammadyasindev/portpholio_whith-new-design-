import React, { useState } from 'react';
import { updateSettings, uploadFile, deleteUploadedFile } from '../../../api';
import { useToast } from '../../ui/Toast';
import { Save, Search, Upload, Trash2, Globe, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

const SEOSettingsModule = ({ settings, onUpdated }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    siteTitle: settings?.siteTitle || 'DYMAS ALFIN — Personal Portfolio',
    siteTagline: settings?.siteTagline || 'Designing digital products that are clear, usable, and conversion focused.',
    metaDescription: settings?.metaDescription || 'Official portfolio showcasing selected digital products, UI/UX systems, and full-stack applications.',
    keywords: settings?.keywords || 'UI/UX Designer, Product Designer, Full Stack Developer, React, Portfolio',
    ogImage: settings?.ogImage || '/designer_headshot.jpg',
    canonicalUrl: settings?.canonicalUrl || 'https://portfolio.dev',
    author: settings?.author || 'DYMAS ALFIN',
    twitterHandle: settings?.twitterHandle || '@portfolio',
    allowRobotsIndex: settings?.allowRobotsIndex ?? true
  });

  const [saving, setSaving] = useState(false);
  const [uploadingOg, setUploadingOg] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleOgUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingOg(true);
      const res = await uploadFile(file);
      if (res.data.success && res.data.url) {
        setFormData((prev) => ({ ...prev, ogImage: res.data.url }));
        toast.success('Open Graph social preview image uploaded!');
      }
    } catch (err) {
      toast.error('Failed to upload social preview image.');
    } finally {
      setUploadingOg(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await updateSettings(formData);
      if (res.data.success) {
        toast.success('SEO and Meta tags saved successfully!');
        if (onUpdated) onUpdated();
      }
    } catch (err) {
      toast.error('Failed to save SEO settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
        <div>
          <span className="text-[11px] font-mono text-stone-400 font-semibold tracking-wider uppercase block mb-1">
            MODULE 17 / SEO & SEARCH ENGINE OPTIMIZATION
          </span>
          <h3 className="font-bold text-lg text-primary">Search Engine Visibility & Metadata</h3>
          <p className="text-xs text-secondary">
            Configure Google search previews, Open Graph share banners, keywords, and crawler indexing rules.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-black text-white hover:bg-stone-800 text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save SEO Rules'}</span>
        </button>
      </div>

      
      <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-stone-500" />
            <h4 className="text-xs font-mono uppercase text-secondary font-semibold">
              Google Search Result Snippet (Simulation)
            </h4>
          </div>
          <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            SERP Preview
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 max-w-2xl font-sans space-y-1">
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <span className="w-4 h-4 rounded-full bg-stone-200 flex items-center justify-center text-[9px] font-bold">
              🌐
            </span>
            <span className="truncate">{formData.canonicalUrl || 'https://portfolio.dev'}</span>
          </div>
          <h3 className="text-base sm:text-lg text-blue-700 hover:underline cursor-pointer font-medium leading-snug">
            {formData.siteTitle || 'Personal Portfolio Website'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2">
            {formData.metaDescription ||
              'Explore portfolio case studies, interactive UI prototypes, and engineering systems.'}
          </p>
        </div>
      </div>

      
      <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
        <h4 className="text-xs font-mono uppercase text-secondary font-semibold">
          Meta Tags & Indexing Directives
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              {"Browser Title Tag (<title>) *"}
            </label>
            <input
              type="text"
              name="siteTitle"
              value={formData.siteTitle}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20 font-semibold"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Meta Description (Search Snippet) *
            </label>
            <textarea
              name="metaDescription"
              rows="3"
              value={formData.metaDescription}
              onChange={handleChange}
              required
              maxLength="200"
              placeholder="Recommended: 150-160 characters describing your skills and portfolio offerings."
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20 leading-relaxed"
            />
            <p className="text-[11px] text-stone-400 mt-1">{formData.metaDescription.length} / 200 characters</p>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Canonical URL
            </label>
            <input
              type="url"
              name="canonicalUrl"
              value={formData.canonicalUrl}
              onChange={handleChange}
              placeholder="https://portfolio.dev"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Author Name
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="DYMAS ALFIN"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Meta Keywords (Comma separated)
            </label>
            <input
              type="text"
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              placeholder="UI/UX Designer, Product Designer, React, Node.js, Frontend Architecture"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20 font-mono"
            />
          </div>

          
          <div className="sm:col-span-2 p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <label className="block text-xs font-mono uppercase text-stone-700 font-semibold">
              Open Graph Social Preview Banner (`og:image`)
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-32 h-20 rounded-xl overflow-hidden bg-stone-200 border border-stone-300 shrink-0">
                <img
                  src={formData.ogImage || '/designer_headshot.jpg'}
                  alt="OG Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5 flex-1">
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200 hover:border-black text-stone-800 text-xs font-semibold shadow-xs transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingOg ? 'Uploading Image...' : 'Upload 1200x630 OG Image'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleOgUpload}
                    disabled={uploadingOg}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-stone-400">
                  Used when sharing your portfolio link on Twitter, LinkedIn, WhatsApp, and iMessage.
                </p>
              </div>
            </div>
          </div>

          
          <div className="sm:col-span-2 flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <div>
              <p className="text-xs font-bold text-black">Allow Search Engine Crawlers (`index, follow`)</p>
              <p className="text-[11px] text-stone-500">
                Enables Googlebot, Bing, and DuckDuckGo to crawl and index your portfolio publicly.
              </p>
            </div>
            <input
              type="checkbox"
              name="allowRobotsIndex"
              checked={formData.allowRobotsIndex}
              onChange={handleChange}
              className="w-4 h-4 accent-black rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SEOSettingsModule;
