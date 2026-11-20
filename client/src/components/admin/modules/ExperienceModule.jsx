import React, { useState } from 'react';
import { createExperience, updateExperience, deleteExperience } from '../../../api';
import { useToast } from '../../ui/Toast';
import Modal from '../../ui/Modal';
import ConfirmDialog from '../../ui/ConfirmDialog';
import { Plus, Edit2, Trash2, Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

const ExperienceModule = ({ experiences = [], onUpdated }) => {
  const toast = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [form, setForm] = useState({
    type: 'experience',
    title: '',
    organization: '',
    location: '',
    period: '2024 — Present',
    description: '',
    skillsText: ''
  });

  const [loading, setLoading] = useState(false);

  const workList = experiences.filter((e) => e.type === 'experience');

  const handleOpenAdd = () => {
    setEditingItem(null);
    setForm({
      type: 'experience',
      title: '',
      organization: '',
      location: '',
      period: '2024 — Present',
      description: '',
      skillsText: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({
      type: 'experience',
      title: item.title,
      organization: item.organization,
      location: item.location || '',
      period: item.period,
      description: item.description,
      skillsText: (item.skillsUsed || []).join(', ')
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const skillsUsed = form.skillsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        type: 'experience',
        title: form.title,
        organization: form.organization,
        location: form.location,
        period: form.period,
        description: form.description,
        skillsUsed
      };

      if (editingItem) {
        await updateExperience(editingItem._id, payload);
        toast.success(`Work experience record updated.`);
      } else {
        await createExperience(payload);
        toast.success(`Work experience record added.`);
      }

      setModalOpen(false);
      if (onUpdated) onUpdated();
    } catch (err) {
      toast.error('Failed to save experience.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteExperience(itemToDelete._id);
      toast.success('Experience record deleted.');
      setDeleteConfirmOpen(false);
      setItemToDelete(null);
      if (onUpdated) onUpdated();
    } catch (err) {
      toast.error('Failed to delete item.');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
        <div>
          <span className="text-[11px] font-mono text-stone-400 font-semibold tracking-wider uppercase block mb-1">
            MODULE 09 / EXPERIENCE MANAGEMENT
          </span>
          <h3 className="font-bold text-lg text-primary">Professional Work History</h3>
          <p className="text-xs text-secondary">
            Manage your employment history, engineering positions, company achievements, and active tenure.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-black text-white hover:bg-stone-800 text-xs font-semibold shadow-xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Position</span>
        </button>
      </div>

      
      <div className="space-y-4">
        {workList.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-stone-200 text-stone-400 text-xs">
            No work experience recorded yet. Click "Add Position" to create your first entry.
          </div>
        ) : (
          workList.map((item) => (
            <div
              key={item._id}
              className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-black transition-all shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base text-black">{item.title}</h4>
                    <span className="text-xs font-mono text-stone-500 font-semibold">
                      @ {item.organization}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.period}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-2">
                    {item.description}
                  </p>
                  {item.skillsUsed && item.skillsUsed.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.skillsUsed.map((sk, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-mono"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-start shrink-0">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-lg text-stone-500 hover:text-black hover:bg-stone-100 transition-colors"
                  title="Edit entry"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setItemToDelete(item);
                    setDeleteConfirmOpen(true);
                  }}
                  className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                  title="Delete entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? 'Edit Work Experience' : 'Add Work Experience'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Job Title / Position *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              placeholder="e.g. Lead Full Stack Architect"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Company / Organization *
              </label>
              <input
                type="text"
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                required
                placeholder="e.g. Aura Financial Inc."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Remote / New York, USA"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Tenure Period *
            </label>
            <input
              type="text"
              value={form.period}
              onChange={(e) => setForm({ ...form, period: e.target.value })}
              required
              placeholder="e.g. 2024 — Present or 2022 — 2024"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Key Responsibilities & Impact *
            </label>
            <textarea
              rows="4"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              placeholder="Spearheaded microservice decomposition, scaled API throughput, and designed client dashboards..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Skills & Tech Leveraged (Comma separated)
            </label>
            <input
              type="text"
              value={form.skillsText}
              onChange={(e) => setForm({ ...form, skillsText: e.target.value })}
              placeholder="React, Next.js, TypeScript, Docker, Redis"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-black text-white hover:bg-stone-800 text-xs font-semibold disabled:opacity-50"
            >
              {loading ? 'Saving...' : editingItem ? 'Save Updates' : 'Create Record'}
            </button>
          </div>
        </form>
      </Modal>

      
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Work Experience"
        message={`Are you sure you want to remove "${itemToDelete?.title}" from your work history?`}
      />
    </div>
  );
};

export default ExperienceModule;
