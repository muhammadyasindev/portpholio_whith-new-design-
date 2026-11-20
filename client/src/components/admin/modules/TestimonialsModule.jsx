import React, { useState } from 'react';
import { createTestimonial, updateTestimonial, deleteTestimonial, uploadFile } from '../../../api';
import { useToast } from '../../ui/Toast';
import Modal from '../../ui/Modal';
import ConfirmDialog from '../../ui/ConfirmDialog';
import { Plus, Edit2, Trash2, Star, Upload } from 'lucide-react';

const TestimonialsModule = ({ testimonials, onUpdated }) => {
  const toast = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [form, setForm] = useState({
    name: '',
    designation: '',
    company: '',
    avatar: '',
    rating: 5,
    content: '',
    project: ''
  });

  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setForm({
      name: '',
      designation: '',
      company: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      rating: 5,
      content: '',
      project: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingItem(t);
    setForm({
      name: t.name,
      designation: t.designation,
      company: t.company || '',
      avatar: t.avatar || '',
      rating: t.rating || 5,
      content: t.content,
      project: t.project || ''
    });
    setModalOpen(true);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingAvatar(true);
      const res = await uploadFile(file);
      if (res.data.success && res.data.url) {
        setForm((prev) => ({ ...prev, avatar: res.data.url }));
        toast.success('Avatar uploaded successfully!');
      }
    } catch (err) {
      toast.error('Failed to upload image.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingItem) {
        await updateTestimonial(editingItem._id, form);
        toast.success(`Testimonial from "${form.name}" updated.`);
      } else {
        await createTestimonial(form);
        toast.success(`Testimonial from "${form.name}" added.`);
      }

      setModalOpen(false);
      if (onUpdated) onUpdated();
    } catch (err) {
      toast.error('Failed to save testimonial.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteTestimonial(itemToDelete._id);
      toast.success('Testimonial removed.');
      if (onUpdated) onUpdated();
    } catch (err) {
      toast.error('Failed to delete testimonial.');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
        <div>
          <h3 className="font-bold text-lg text-primary">Client Feedback & Testimonials</h3>
          <p className="text-xs text-secondary">
            Manage your verified reviews and client ratings.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-darkBrown text-warmBeige text-xs font-semibold shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t._id}
            className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="p-1.5 rounded-lg text-stone-500 hover:text-primary hover:bg-stone-100"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setItemToDelete(t);
                      setDeleteConfirmOpen(true);
                    }}
                    className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed italic mb-6">
                "{t.content}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover border border-stone-200"
              />
              <div>
                <h4 className="text-xs font-bold text-primary">{t.name}</h4>
                <p className="text-[11px] text-secondary">
                  {t.designation} {t.company ? `— ${t.company}` : ''}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Client Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="e.g. Elena Rostova"
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Rating (1-5) *
              </label>
              <select
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
              >
                <option value={5}>5 Stars (Exceptional)</option>
                <option value={4}>4 Stars (Very Good)</option>
                <option value={3}>3 Stars (Good)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Designation / Role *
              </label>
              <input
                type="text"
                value={form.designation}
                onChange={(e) => setForm({ ...form, designation: e.target.value })}
                required
                placeholder="e.g. CTO / Product Lead"
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="e.g. Aura Financial Inc."
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Client Photo Avatar
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                placeholder="Image URL..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-200"
              />
              <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-300 hover:border-darkBrown bg-stone-50 text-xs font-medium cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-accent" />
                <span>{uploadingAvatar ? '...' : 'Upload'}</span>
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Testimonial Review *
            </label>
            <textarea
              rows={4}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
              placeholder="What did the client say about your engineering delivery..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 resize-y"
            />
          </div>

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
              {loading ? 'Saving...' : 'Save Testimonial'}
            </button>
          </div>
        </form>
      </Modal>

      
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Testimonial"
        message={`Are you sure you want to delete this client review?`}
      />
    </div>
  );
};

export default TestimonialsModule;
