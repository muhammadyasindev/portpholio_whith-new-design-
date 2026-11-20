import React, { useState } from 'react';
import { updateAbout } from '../../../api';
import { useToast } from '../../ui/Toast';
import { Save } from 'lucide-react';

const AboutModule = ({ about, onUpdated }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    title: about?.title || 'About Me',
    subtitle: about?.subtitle || 'Crafting thoughtful digital solutions with precision, passion & purpose.',
    bioParagraph1: about?.bioParagraph1 || '',
    bioParagraph2: about?.bioParagraph2 || '',
    developmentPhilosophy: about?.developmentPhilosophy || '',
    journeyStory: about?.journeyStory || '',
    stats: about?.stats || [
      { label: 'Projects Completed', value: '45+', counter: 45 },
      { label: 'Years Experience', value: '5+', counter: 5 },
      { label: 'Technologies Mastered', value: '28+', counter: 28 },
      { label: 'Client Satisfaction', value: '99%', counter: 99 }
    ]
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStatChange = (index, field, value) => {
    const updatedStats = [...formData.stats];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    setFormData({ ...formData, stats: updatedStats });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await updateAbout(formData);
      if (res.data.success) {
        toast.success('About section and statistics updated successfully!');
        if (onUpdated) onUpdated();
      }
    } catch (err) {
      toast.error('Failed to update About details.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
        <div>
          <h3 className="font-bold text-lg text-primary">About Story & Statistics</h3>
          <p className="text-xs text-secondary">
            Manage your biography, technical philosophy, and key numeric milestones.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-darkBrown text-warmBeige text-xs font-semibold shadow-sm transition-all disabled:opacity-60 cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save About Changes'}</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-2">
            Biography Paragraph 1 *
          </label>
          <textarea
            name="bioParagraph1"
            rows={4}
            value={formData.bioParagraph1}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-darkBrown/30 bg-stone-50/50 resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-2">
            Biography Paragraph 2
          </label>
          <textarea
            name="bioParagraph2"
            rows={4}
            value={formData.bioParagraph2}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-darkBrown/30 bg-stone-50/50 resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-2">
            The Development Journey Story
          </label>
          <textarea
            name="journeyStory"
            rows={3}
            value={formData.journeyStory}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-darkBrown/30 bg-stone-50/50 resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-2">
            Development Philosophy / Core Principle
          </label>
          <textarea
            name="developmentPhilosophy"
            rows={2}
            value={formData.developmentPhilosophy}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-darkBrown/30 bg-stone-50/50 resize-y"
          />
        </div>

        
        <div className="pt-4 border-t border-stone-100">
          <h4 className="text-xs font-mono uppercase text-stone-600 font-semibold mb-4">
            Numeric Milestone Counters:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {formData.stats.map((st, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
                <input
                  type="text"
                  value={st.label}
                  onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                  placeholder="Metric Label"
                  className="w-full text-xs font-mono font-semibold px-2 py-1 border border-stone-200 rounded bg-white"
                />
                <input
                  type="text"
                  value={st.value}
                  onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                  placeholder="e.g. 45+"
                  className="w-full text-sm font-bold px-2 py-1 border border-stone-200 rounded bg-white font-mono"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};

export default AboutModule;
