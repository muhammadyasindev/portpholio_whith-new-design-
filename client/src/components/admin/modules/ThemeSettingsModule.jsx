import React, { useState } from 'react';
import { updateSettings } from '../../../api';
import { useToast } from '../../ui/Toast';
import { Save, Palette, RotateCcw, Sparkles, CheckCircle2, Type, Sliders } from 'lucide-react';

const defaultTheme = {
  primaryBg: '#FFFFFF',
  secondaryBg: '#FAFAFA',
  primaryText: '#000000',
  secondaryText: '#737373',
  accentColor: '#000000',
  headingFont: 'Syne, sans-serif',
  bodyFont: 'Plus Jakarta Sans, sans-serif',
  animationPreference: 'smooth'
};

const ThemeSettingsModule = ({ settings, onUpdated }) => {
  const toast = useToast();
  const [theme, setTheme] = useState({
    primaryBg: settings?.theme?.primaryBg || defaultTheme.primaryBg,
    secondaryBg: settings?.theme?.secondaryBg || defaultTheme.secondaryBg,
    primaryText: settings?.theme?.primaryText || defaultTheme.primaryText,
    secondaryText: settings?.theme?.secondaryText || defaultTheme.secondaryText,
    accentColor: settings?.theme?.accentColor || defaultTheme.accentColor,
    headingFont: settings?.theme?.headingFont || defaultTheme.headingFont,
    bodyFont: settings?.theme?.bodyFont || defaultTheme.bodyFont,
    animationPreference: settings?.theme?.animationPreference || defaultTheme.animationPreference
  });

  const [saving, setSaving] = useState(false);

  const handleColorChange = (key, val) => {
    setTheme((prev) => ({ ...prev, [key]: val }));
  };

  const handleResetDefault = () => {
    setTheme(defaultTheme);
    toast.info('Restored original Dribbble reference theme.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await updateSettings({ theme });
      if (res.data.success) {
        toast.success('Theme settings saved and applied to public portfolio!');
        if (onUpdated) onUpdated();
      }
    } catch (err) {
      toast.error('Failed to save theme settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
        <div>
          <span className="text-[11px] font-mono text-stone-400 font-semibold tracking-wider uppercase block mb-1">
            MODULE 16 / THEME & DESIGN SYSTEM
          </span>
          <h3 className="font-bold text-lg text-primary">Theme & Color Customization</h3>
          <p className="text-xs text-secondary">
            Control the palette, typography pairing, and motion preferences without compromising design harmony.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefault}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-xs font-semibold text-stone-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-black text-white hover:bg-stone-800 text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Apply Theme'}</span>
          </button>
        </div>
      </div>

      
      <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono uppercase text-secondary font-semibold">
            Live Palette Sample
          </h4>
          <span className="text-[11px] font-mono text-stone-500">
            Dribbble Minimalist Standard
          </span>
        </div>

        <div
          className="p-8 rounded-2xl border transition-all"
          style={{
            backgroundColor: theme.primaryBg,
            borderColor: '#E5E5E5',
            color: theme.primaryText
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span
                className="text-[10px] font-mono uppercase tracking-wider block mb-1"
                style={{ color: theme.secondaryText }}
              >
                Sample Headline Preview
              </span>
              <h2
                className="text-2xl sm:text-3xl font-black uppercase tracking-tight"
                style={{ fontFamily: theme.headingFont }}
              >
                DYMAS ALFIN
              </h2>
              <p
                className="text-xs mt-1"
                style={{ color: theme.secondaryText, fontFamily: theme.bodyFont }}
              >
                Designing digital products that are clear, usable, and conversion focused.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className="px-5 py-2.5 rounded-full text-xs font-semibold shadow-xs"
                style={{
                  backgroundColor: theme.accentColor,
                  color: theme.primaryBg
                }}
              >
                Let's collaborate ↗
              </span>
            </div>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        
        <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-black" />
            <h4 className="text-xs font-mono uppercase text-secondary font-semibold">
              Color Architecture
            </h4>
          </div>

          
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono uppercase text-stone-700 font-semibold">
                Primary Background
              </label>
              <span className="text-xs font-mono text-stone-500">{theme.primaryBg}</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.primaryBg}
                onChange={(e) => handleColorChange('primaryBg', e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer border border-stone-200 p-0.5 bg-white"
              />
              <input
                type="text"
                value={theme.primaryBg}
                onChange={(e) => handleColorChange('primaryBg', e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-stone-200 font-mono"
              />
            </div>
          </div>

          
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono uppercase text-stone-700 font-semibold">
                Secondary Background
              </label>
              <span className="text-xs font-mono text-stone-500">{theme.secondaryBg}</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.secondaryBg}
                onChange={(e) => handleColorChange('secondaryBg', e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer border border-stone-200 p-0.5 bg-white"
              />
              <input
                type="text"
                value={theme.secondaryBg}
                onChange={(e) => handleColorChange('secondaryBg', e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-stone-200 font-mono"
              />
            </div>
          </div>

          
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono uppercase text-stone-700 font-semibold">
                Primary Text Color
              </label>
              <span className="text-xs font-mono text-stone-500">{theme.primaryText}</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.primaryText}
                onChange={(e) => handleColorChange('primaryText', e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer border border-stone-200 p-0.5 bg-white"
              />
              <input
                type="text"
                value={theme.primaryText}
                onChange={(e) => handleColorChange('primaryText', e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-stone-200 font-mono"
              />
            </div>
          </div>

          
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono uppercase text-stone-700 font-semibold">
                Secondary / Muted Text
              </label>
              <span className="text-xs font-mono text-stone-500">{theme.secondaryText}</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.secondaryText}
                onChange={(e) => handleColorChange('secondaryText', e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer border border-stone-200 p-0.5 bg-white"
              />
              <input
                type="text"
                value={theme.secondaryText}
                onChange={(e) => handleColorChange('secondaryText', e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-stone-200 font-mono"
              />
            </div>
          </div>

          
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono uppercase text-stone-700 font-semibold">
                Accent / CTA Color
              </label>
              <span className="text-xs font-mono text-stone-500">{theme.accentColor}</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.accentColor}
                onChange={(e) => handleColorChange('accentColor', e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer border border-stone-200 p-0.5 bg-white"
              />
              <input
                type="text"
                value={theme.accentColor}
                onChange={(e) => handleColorChange('accentColor', e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-stone-200 font-mono"
              />
            </div>
          </div>
        </div>

        
        <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-black" />
            <h4 className="text-xs font-mono uppercase text-secondary font-semibold">
              Typography & Motion
            </h4>
          </div>

          
          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Heading Typography (Display)
            </label>
            <select
              value={theme.headingFont}
              onChange={(e) => setTheme({ ...theme, headingFont: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-black/20"
            >
              <option value="Syne, sans-serif">Syne (Dribbble Reference Default)</option>
              <option value="Plus Jakarta Sans, sans-serif">Plus Jakarta Sans</option>
              <option value="Inter, sans-serif">Inter</option>
              <option value="JetBrains Mono, monospace">JetBrains Mono</option>
            </select>
          </div>

          
          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Body Typography (Text)
            </label>
            <select
              value={theme.bodyFont}
              onChange={(e) => setTheme({ ...theme, bodyFont: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-black/20"
            >
              <option value="Plus Jakarta Sans, sans-serif">Plus Jakarta Sans (Reference Default)</option>
              <option value="Inter, sans-serif">Inter</option>
              <option value="system-ui, sans-serif">System UI / Native</option>
            </select>
          </div>

          
          <div>
            <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
              Animation & Transition Preference
            </label>
            <select
              value={theme.animationPreference}
              onChange={(e) => setTheme({ ...theme, animationPreference: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-black/20"
            >
              <option value="smooth">Smooth Framer Motion Choreography (Default)</option>
              <option value="subtle">Subtle Minimal Fade In</option>
              <option value="none">Reduced Motion (Instant UI)</option>
            </select>
          </div>
        </div>

      </div>
    </form>
  );
};

export default ThemeSettingsModule;
