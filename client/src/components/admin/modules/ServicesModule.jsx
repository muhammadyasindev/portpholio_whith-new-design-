import React, { useState } from 'react';
import { createService, updateService, deleteService } from '../../../api';
import { useToast } from '../../ui/Toast';
import Modal from '../../ui/Modal';
import ConfirmDialog from '../../ui/ConfirmDialog';
import IconRenderer from '../../ui/IconRenderer';
import { Plus, Edit2, Trash2, Check } from 'lucide-react';

const ServicesModule = ({ services, onUpdated }) => {
  const toast = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const [form, setForm] = useState({
    title: '',
    icon: 'Monitor',
    shortDescription: '',
    description: '',
    deliverablesText: ''
  });

  const [loading, setLoading] = useState(false);

  const handleOpenAdd = () => {
    setEditingService(null);
    setForm({
      title: '',
      icon: 'Monitor',
      shortDescription: '',
      description: '',
      deliverablesText: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (svc) => {
    setEditingService(svc);
    setForm({
      title: svc.title,
      icon: svc.icon || 'Monitor',
      shortDescription: svc.shortDescription || '',
      description: svc.description || '',
      deliverablesText: (svc.deliverables || []).join('\n')
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const deliverables = form.deliverablesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        title: form.title,
        icon: form.icon,
        shortDescription: form.shortDescription || form.description.slice(0, 100),
        description: form.description,
        deliverables
      };

      if (editingService) {
        await updateService(editingService._id, payload);
        toast.success(`Service "${form.title}" updated.`);
      } else {
        await createService(payload);
        toast.success(`Service "${form.title}" created.`);
      }

      setModalOpen(false);
      if (onUpdated) onUpdated();
    } catch (err) {
      toast.error('Failed to save service.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!serviceToDelete) return;
    try {
      await deleteService(serviceToDelete._id);
      toast.success(`Service "${serviceToDelete.title}" deleted.`);
      if (onUpdated) onUpdated();
    } catch (err) {
      toast.error('Failed to delete service.');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
        <div>
          <h3 className="font-bold text-lg text-primary">Offered Services & Capabilities</h3>
          <p className="text-xs text-secondary">
            Manage your service solutions, descriptions, and deliverable bullet points.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-darkBrown text-warmBeige text-xs font-semibold shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc) => (
          <div
            key={svc._id}
            className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-darkBrown">
                  <IconRenderer name={svc.icon} className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(svc)}
                    className="p-1.5 rounded-lg text-stone-500 hover:text-primary hover:bg-stone-100"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setServiceToDelete(svc);
                      setDeleteConfirmOpen(true);
                    }}
                    className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="font-bold text-base text-primary mb-2">{svc.title}</h4>
              <p className="text-xs text-secondary leading-relaxed mb-4">
                {svc.description}
              </p>

              {svc.deliverables && svc.deliverables.length > 0 && (
                <div className="space-y-1.5 pt-3 border-t border-stone-100">
                  <span className="text-[10px] font-mono uppercase text-stone-400 font-semibold block mb-1">
                    Deliverables:
                  </span>
                  {svc.deliverables.map((d, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-stone-700">
                      <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingService ? 'Edit Service' : 'Add New Service'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Service Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              placeholder="e.g. Full Stack Web Development"
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Lucide Icon Name
            </label>
            <input
              type="text"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              placeholder="Monitor, Smartphone, Server, Database..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Detailed Description *
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              placeholder="Explain what this service provides..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 resize-y"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Key Deliverables (One per line)
            </label>
            <textarea
              rows={4}
              value={form.deliverablesText}
              onChange={(e) => setForm({ ...form, deliverablesText: e.target.value })}
              placeholder="Deliverable item 1&#10;Deliverable item 2&#10;Deliverable item 3"
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 resize-y font-mono"
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
              {loading ? 'Saving...' : 'Save Service'}
            </button>
          </div>
        </form>
      </Modal>

      
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Service"
        message={`Are you sure you want to remove the service "${serviceToDelete?.title}"?`}
      />
    </div>
  );
};

export default ServicesModule;
