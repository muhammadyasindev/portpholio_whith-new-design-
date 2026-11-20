import React, { useState } from 'react';
import { createSkill, updateSkill, deleteSkill } from '../../../api';
import { useToast } from '../../ui/Toast';
import Modal from '../../ui/Modal';
import ConfirmDialog from '../../ui/ConfirmDialog';
import IconRenderer from '../../ui/IconRenderer';
import { Plus, Edit2, Trash2, Search, Sparkles } from 'lucide-react';

const categories = [
  'Frontend Development',
  'Backend Development',
  'Mobile App Development',
  'Databases',
  'Programming Languages',
  'Tools & Technologies'
];

const SkillsModule = ({ skills, onUpdated }) => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);

  const [form, setForm] = useState({
    name: '',
    category: 'Frontend Development',
    proficiency: 85,
    icon: 'Code',
    level: 'Advanced',
    isFeatured: false
  });

  const [loading, setLoading] = useState(false);

  const filtered = skills.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCat === 'All' || s.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setEditingSkill(null);
    setForm({
      name: '',
      category: 'Frontend Development',
      proficiency: 85,
      icon: 'Code',
      level: 'Advanced',
      isFeatured: false
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (skill) => {
    setEditingSkill(skill);
    setForm({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon: skill.icon || 'Code',
      level: skill.level || 'Advanced',
      isFeatured: !!skill.isFeatured
    });
    setModalOpen(true);
  };

  const handleOpenDelete = (skill) => {
    setSkillToDelete(skill);
    setDeleteConfirmOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingSkill) {
        await updateSkill(editingSkill._id, form);
        toast.success(`Skill "${form.name}" updated successfully!`);
      } else {
        await createSkill(form);
        toast.success(`Skill "${form.name}" created successfully!`);
      }
      setModalOpen(false);
      if (onUpdated) onUpdated();
    } catch (err) {
      toast.error('Failed to save skill.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!skillToDelete) return;
    try {
      await deleteSkill(skillToDelete._id);
      toast.success(`Skill "${skillToDelete.name}" deleted.`);
      if (onUpdated) onUpdated();
    } catch (err) {
      toast.error('Failed to delete skill.');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
        <div>
          <h3 className="font-bold text-lg text-primary">Skills & Technical Competencies</h3>
          <p className="text-xs text-secondary">
            Total {skills.length} skills listed across 6 primary engineering domains.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-darkBrown text-warmBeige text-xs font-semibold shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Skill</span>
        </button>
      </div>

      
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search skills (e.g. React, Docker, MongoDB)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-stone-200 bg-white"
          />
        </div>

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="w-full sm:w-56 px-3 py-2.5 text-xs rounded-xl border border-stone-200 bg-white font-medium text-stone-700"
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 font-mono uppercase text-secondary">
              <tr>
                <th className="px-6 py-4">Skill</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Proficiency</th>
                <th className="px-6 py-4">Level</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((skill) => (
                <tr key={skill._id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="px-6 py-4 font-semibold text-primary">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-darkBrown">
                        <IconRenderer name={skill.icon} className="w-4 h-4" />
                      </div>
                      <div>
                        <span>{skill.name}</span>
                        {skill.isFeatured && (
                          <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-warmBeige/40 text-darkBrown font-mono">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-secondary">{skill.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-primary">{skill.proficiency}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-stone-600">{skill.level || 'Expert'}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(skill)}
                      className="p-1.5 rounded-lg text-stone-600 hover:text-primary hover:bg-stone-100"
                      title="Edit Skill"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenDelete(skill)}
                      className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                      title="Delete Skill"
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
        title={editingSkill ? 'Edit Technical Skill' : 'Add New Technical Skill'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Skill Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              placeholder="e.g. React.js, GraphQL, PostgreSQL"
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-darkBrown/30"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Domain Category *
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

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-stone-600 font-semibold uppercase">Proficiency Percentage:</span>
              <span className="font-bold text-accent">{form.proficiency}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={form.proficiency}
              onChange={(e) => setForm({ ...form, proficiency: Number(e.target.value) })}
              className="w-full accent-darkBrown"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Lucide Icon Name
              </label>
              <input
                type="text"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                placeholder="Code, Server, Database..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                Proficiency Level
              </label>
              <select
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
              >
                <option value="Master">Master</option>
                <option value="Expert">Expert</option>
                <option value="Advanced">Advanced</option>
                <option value="Intermediate">Intermediate</option>
              </select>
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
              Feature on prominent summary badges
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
              {loading ? 'Saving...' : 'Save Skill'}
            </button>
          </div>
        </form>
      </Modal>

      
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Skill"
        message={`Are you sure you want to remove the skill "${skillToDelete?.name}" from your portfolio?`}
      />
    </div>
  );
};

export default SkillsModule;
