import React, { useState } from 'react';
import { updateProject, uploadFile, deleteUploadedFile } from '../../../api';
import { useToast } from '../../ui/Toast';
import { Save, Plus, Trash2, Upload, Image, Sparkles, ExternalLink, CheckCircle } from 'lucide-react';

const CaseStudiesModule = ({ projects = [], onUpdated }) => {
  const toast = useToast();
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?._id || '');
  const activeProject = projects.find((p) => p._id === selectedProjectId) || projects[0];

  const [form, setForm] = useState({
    title: activeProject?.title || '',
    category: activeProject?.category || 'Full Stack',
    shortDescription: activeProject?.shortDescription || '',
    description: activeProject?.description || '',
    thumbnail: activeProject?.thumbnail || '',
    screenshots: activeProject?.screenshots || [],
    technologies: (activeProject?.technologies || []).join(', '),
    liveUrl: activeProject?.liveUrl || '',
    githubUrl: activeProject?.githubUrl || '',
    client: activeProject?.client || '',
    year: activeProject?.year || '2025'
  });

  const [saving, setSaving] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const handleSelectProject = (id) => {
    setSelectedProjectId(id);
    const proj = projects.find((p) => p._id === id);
    if (proj) {
      setForm({
        title: proj.title || '',
        category: proj.category || 'Full Stack',
        shortDescription: proj.shortDescription || '',
        description: proj.description || '',
        thumbnail: proj.thumbnail || '',
        screenshots: proj.screenshots || [],
        technologies: (proj.technologies || []).join(', '),
        liveUrl: proj.liveUrl || '',
        githubUrl: proj.githubUrl || '',
        client: proj.client || '',
        year: proj.year || '2025'
      });
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      setUploadingGallery(true);
      const newUrls = [];
      for (const file of files) {
        const res = await uploadFile(file);
        if (res.data.success && res.data.url) {
          newUrls.push(res.data.url);
        }
      }
      setForm((prev) => ({
        ...prev,
        screenshots: [...prev.screenshots, ...newUrls]
      }));
      toast.success(`${newUrls.length} screenshot(s) added to project gallery!`);
    } catch (err) {
      toast.error('Failed to upload some gallery images.');
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleDeleteScreenshot = async (idx) => {
    const targetUrl = form.screenshots[idx];
    try {
      await deleteUploadedFile({ url: targetUrl });
    } catch (e) {
    }
    setForm((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== idx)
    }));
    toast.success('Screenshot removed from gallery.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProjectId) {
      toast.error('Please select a project to update.');
      return;
    }

    try {
      setSaving(true);
      const techArray = form.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await updateProject(selectedProjectId, {
        ...form,
        technologies: techArray
      });

      if (res.data.success) {
        toast.success(`Case study for "${form.title}" saved successfully!`);
        if (onUpdated) onUpdated();
      }
    } catch (err) {
      toast.error('Failed to update project case study.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
        <div>
          <span className="text-[11px] font-mono text-stone-400 font-semibold tracking-wider uppercase block mb-1">
            MODULE 08 / PROJECT CASE STUDIES
          </span>
          <h3 className="font-bold text-lg text-primary">In-Depth Case Study & Gallery Editor</h3>
          <p className="text-xs text-secondary">
            Curate detailed engineering stories, architecture diagrams, and multi-screenshot galleries for project inspect lightboxes.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving || !selectedProjectId}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-black text-white hover:bg-stone-800 text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Case Study'}</span>
        </button>
      </div>

      
      <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <label className="block text-xs font-mono uppercase text-secondary font-semibold mb-1">
            Select Active Case Study:
          </label>
          <select
            value={selectedProjectId}
            onChange={(e) => handleSelectProject(e.target.value)}
            className="px-4 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title} ({p.category})
              </option>
            ))}
          </select>
        </div>

        <span className="text-xs font-mono text-stone-500 bg-stone-100 px-3 py-1.5 rounded-full">
          Total Projects: {projects.length}
        </span>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-5">
          <h4 className="text-xs font-mono uppercase text-secondary font-semibold">
            Case Study Narrative & Details
          </h4>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Project Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Domain Category
              </label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Client / Company
              </label>
              <input
                type="text"
                value={form.client}
                onChange={(e) => setForm({ ...form, client: e.target.value })}
                placeholder="e.g. Aura Financial Inc."
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Elevator Pitch / Summary Tagline
            </label>
            <textarea
              rows="2"
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Comprehensive Case Study & Architecture Story *
            </label>
            <textarea
              rows="6"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              placeholder="Describe the problem, architectural decisions, database modeling, and business results..."
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Technologies & Frameworks (Comma separated)
            </label>
            <input
              type="text"
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
              placeholder="React, Node.js, MongoDB, Tailwind CSS, TypeScript"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
        </div>

        
        <div className="lg:col-span-5 p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono uppercase text-secondary font-semibold">
              Project Gallery ({form.screenshots.length})
            </h4>
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black text-white hover:bg-stone-800 text-[11px] font-semibold transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>{uploadingGallery ? 'Uploading...' : 'Add Images'}</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleGalleryUpload}
                disabled={uploadingGallery}
                className="hidden"
              />
            </label>
          </div>

          {form.screenshots.length === 0 ? (
            <div className="p-8 border-2 border-dashed border-stone-200 rounded-2xl text-center space-y-2">
              <Image className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="text-xs text-stone-500 font-medium">No gallery screenshots yet.</p>
              <p className="text-[11px] text-stone-400">
                Click "Add Images" to upload mobile/desktop app previews.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
              {form.screenshots.map((shot, idx) => (
                <div
                  key={idx}
                  className="relative rounded-xl overflow-hidden border border-stone-200 group aspect-[4/3] bg-stone-100"
                >
                  <img src={shot} alt="Screenshot" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteScreenshot(idx)}
                      className="p-1.5 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-colors"
                      title="Remove screenshot"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-2 border-t border-stone-100 space-y-2">
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Live Production Link
            </label>
            <input
              type="url"
              value={form.liveUrl}
              onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
              placeholder="https://example.com"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesModule;
