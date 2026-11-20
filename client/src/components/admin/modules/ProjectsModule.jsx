import React, { useState } from 'react';
import { createProject, updateProject, deleteProject, uploadFile } from '../../../api';
import { useToast } from '../../ui/Toast';
import Modal from '../../ui/Modal';
import ConfirmDialog from '../../ui/ConfirmDialog';
import { Plus, Edit2, Trash2, Search, ExternalLink, Github, Sparkles, Upload } from 'lucide-react';

const categories = ['Full Stack', 'Mobile App', 'Frontend', 'Backend'];

const ProjectsModule = ({ projects, onUpdated }) => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const [form, setForm] = useState({
    title: '',
    category: 'Full Stack',
    shortDescription: '',
    description: '',
    thumbnail: '',
    screenshotsText: '',
    technologiesText: '',
    liveUrl: '',
    githubUrl: '',
    isFeatured: false,
    year: '2025',
    client: ''
  });

  const [loading, setLoading] = useState(false);
  const [uploadingThumb, setUploadingThumb] = useState(false);

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingProject(null);
    setForm({
      title: '',
      category: 'Full Stack',
      shortDescription: '',
      description: '',
      thumbnail: '',
      screenshotsText: '',
      technologiesText: '',
      liveUrl: '',
      githubUrl: '',
      isFeatured: false,
      year: new Date().getFullYear().toString(),
      client: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProject(p);
    setForm({
      title: p.title,
      category: p.category || 'Full Stack',
      shortDescription: p.shortDescription || '',
      description: p.description || '',
      thumbnail: p.thumbnail || '',
      screenshotsText: (p.screenshots || []).join('\n'),
      technologiesText: (p.technologies || []).join(', '),
      liveUrl: p.liveUrl || '',
      githubUrl: p.githubUrl || '',
      isFeatured: !!p.isFeatured,
      year: p.year || '2025',
      client: p.client || ''
    });
    setModalOpen(true);
  };

  const handleThumbUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingThumb(true);
      const res = await uploadFile(file);
      if (res.data.success && res.data.url) {
        setForm((prev) => ({
          ...prev,
          thumbnail: res.data.url,
          screenshotsText: prev.screenshotsText ? `${res.data.url}\n${prev.screenshotsText}` : res.data.url
        }));
        toast.success('Thumbnail image uploaded successfully!');
      }
    } catch (err) {
      toast.error('Failed to upload image.');
    } finally {
      setUploadingThumb(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.thumbnail || !form.description) {
      toast.error('Title, Thumbnail, and Description are required.');
      return;
    }

    try {
      setLoading(true);
      const technologies = form.technologiesText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const screenshots = form.screenshotsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      if (!screenshots.includes(form.thumbnail)) {
        screenshots.unshift(form.thumbnail);
      }

      const payload = {
        title: form.title,
        category: form.category,
        shortDescription: form.shortDescription || form.description.slice(0, 120),
        description: form.description,
        thumbnail: form.thumbnail,
        screenshots,
        technologies,
        liveUrl: form.liveUrl,
        githubUrl: form.githubUrl,
        isFeatured: form.isFeatured,
        year: form.year,
        client: form.client
      };

      if (editingProject) {
        await updateProject(editingProject._id, payload);
        toast.success(`Project "${form.title}" updated.`);
      } else {
        await createProject(payload);
        toast.success(`Project "${form.title}" created.`);
      }

      setModalOpen(false);
      if (onUpdated) onUpdated();
    } catch (err) {
      toast.error('Failed to save project.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      await deleteProject(projectToDelete._id);
      toast.success(`Project "${projectToDelete.title}" removed.`);
      if (onUpdated) onUpdated();
    } catch (err) {
      toast.error('Failed to delete project.');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
        <div>
          <h3 className="font-bold text-lg text-primary">Projects & Case Studies</h3>
          <p className="text-xs text-secondary">
            Manage your featured web and mobile applications showcase.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-darkBrown text-warmBeige text-xs font-semibold shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      
      <div className="relative">
        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search projects by title or category..."
          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-stone-200 bg-white"
        />
      </div>

      
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 font-mono uppercase text-secondary">
              <tr>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Technologies</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((p) => (
                <tr key={p._id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="w-12 h-9 rounded-lg object-cover border border-stone-200 bg-stone-100"
                      />
                      <div>
                        <span className="font-bold text-primary block leading-tight">{p.title}</span>
                        <span className="text-[11px] text-stone-500 font-mono">{p.year || '2025'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono font-medium text-secondary">{p.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {(p.technologies || []).slice(0, 3).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px] font-mono">
                          {t}
                        </span>
                      ))}
                      {(p.technologies?.length || 0) > 3 && (
                        <span className="text-[10px] text-stone-400 font-mono">
                          +{p.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {p.isFeatured ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-warmBeige/40 text-darkBrown font-mono font-semibold text-[10px]">
                        <Sparkles className="w-3 h-3 text-accent" /> Featured
                      </span>
                    ) : (
                      <span className="text-stone-400 font-mono text-[11px]">Standard</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-1.5 rounded-lg text-stone-600 hover:text-primary hover:bg-stone-100"
                      title="Edit Project"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setProjectToDelete(p);
                        setDeleteConfirmOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'Add New Project'}
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Project Title *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder="e.g. AuraPay — Fintech Platform"
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Category *
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          
          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Project Thumbnail Image *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={form.thumbnail}
                onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                required
                placeholder="https://... or upload below"
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-200"
              />
              <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-300 hover:border-darkBrown bg-stone-50 text-xs font-medium cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-accent" />
                <span>{uploadingThumb ? 'Uploading...' : 'Upload'}</span>
                <input type="file" accept="image/*" onChange={handleThumbUpload} className="hidden" />
              </label>
            </div>
            {form.thumbnail && (
              <img
                src={form.thumbnail}
                alt="thumb preview"
                className="mt-2 w-32 h-20 rounded-lg object-cover border border-stone-200"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Short Description (Card Summary)
            </label>
            <input
              type="text"
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              placeholder="Brief 1-sentence overview"
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Full Project Description *
            </label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              placeholder="Deep dive into the architecture, features, and results..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 resize-y"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Technologies (Comma separated)
            </label>
            <input
              type="text"
              value={form.technologiesText}
              onChange={(e) => setForm({ ...form, technologiesText: e.target.value })}
              placeholder="React 18, Node.js, MongoDB, Tailwind CSS, Redis"
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Additional Screenshots (One URL per line)
            </label>
            <textarea
              rows={2}
              value={form.screenshotsText}
              onChange={(e) => setForm({ ...form, screenshotsText: e.target.value })}
              placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 font-mono text-[11px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Live Demo Link
              </label>
              <input
                type="text"
                value={form.liveUrl}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                placeholder="https://example.com/demo"
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                GitHub Repository Link
              </label>
              <input
                type="text"
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Year Completed
              </label>
              <input
                type="text"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                placeholder="2025"
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Client / Organization Name
              </label>
              <input
                type="text"
                value={form.client}
                onChange={(e) => setForm({ ...form, client: e.target.value })}
                placeholder="e.g. Aura Financial Inc."
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
              className="w-4 h-4 rounded text-darkBrown focus:ring-darkBrown"
            />
            <span className="text-xs font-semibold text-stone-800">
              Highlight as Featured Project on homepage
            </span>
          </label>

          <div className="pt-4 flex justify-end gap-3 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-xs rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-primary hover:bg-darkBrown text-warmBeige transition-colors shadow-sm"
            >
              {loading ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      </Modal>

      
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Project"
        message={`Are you sure you want to permanently delete the project "${projectToDelete?.title}"?`}
      />
    </div>
  );
};

export default ProjectsModule;
