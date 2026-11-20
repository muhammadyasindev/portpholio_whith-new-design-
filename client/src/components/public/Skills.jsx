import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IconRenderer from '../ui/IconRenderer';
import { Sparkles, Terminal, CheckCircle2, ArrowUpRight } from 'lucide-react';

const categories = [
  'All',
  'Frontend Development',
  'Backend Development',
  'Mobile App Development',
  'Databases',
  'Tools & Technologies',
];

const Skills = ({ skills = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredSkills =
    selectedCategory === 'All'
      ? skills
      : skills.filter(
          (s) => (s.category || '').toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <section id="skills" className="relative py-24 md:py-32 bg-white select-none border-t border-stone-200/80">
      
      

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight font-sans flex items-center gap-1.5">
            <span className="text-stone-400 font-light">/</span>TECHNICAL SKILLS
          </h2>
          <p className="text-sm md:text-base text-stone-500 font-normal mt-2 max-w-lg">
            Battle-tested engineering matrix across full-stack architectures, modern mobile applications, and distributed cloud services.
          </p>
        </motion.div>

        
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-12 border-b border-stone-100">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? skills.length
                  : skills.filter(
                      (s) => (s.category || '').toLowerCase() === cat.toLowerCase()
                    ).length;

              const isSelected = selectedCategory === cat;
              return (
                <motion.button
                  key={cat}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-semibold tracking-wide transition-all cursor-pointer px-4 py-2 rounded-full ${
                    isSelected
                      ? 'bg-black text-white shadow-xs'
                      : 'bg-stone-50 text-stone-600 hover:text-black hover:bg-stone-100 border border-stone-200/80'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="ml-1.5 opacity-60 text-[11px]">[{count}]</span>
                </motion.button>
              );
            })}
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-black transition-colors"
          >
            <span>Inquire Custom Stack</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          <AnimatePresence>
            {filteredSkills.map((skill, idx) => (
              <motion.div
                layout
                key={skill._id || skill.name || idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.35, delay: idx * 0.02, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-6 rounded-2xl bg-white border border-stone-200/90 hover:border-black hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-default"
              >
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-center text-stone-800 group-hover:bg-black group-hover:text-white group-hover:scale-105 transition-all duration-300">
                      <IconRenderer name={skill.icon} className="w-6 h-6" />
                    </div>

                    {skill.isFeatured ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-900 text-[10px] font-mono font-semibold tracking-wider uppercase">
                        <Sparkles className="w-3 h-3 text-black" />
                        Featured
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-stone-50 text-stone-500 text-[10px] font-mono">
                        {skill.level || 'Production'}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-lg text-black tracking-tight group-hover:text-black transition-colors">
                    {skill.name}
                  </h3>

                  <p className="text-xs text-stone-400 font-medium mt-1">
                    {skill.category || 'Technology'}
                  </p>
                </div>

                
                <div className="pt-5 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono">
                  <span className="flex items-center gap-1.5 text-stone-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                    <span>Production Grade</span>
                  </span>
                  <span className="text-stone-400 font-normal">
                    {skill.level || 'Mastery'}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-black tracking-tight">
                Architectural Standards & Clean Code
              </p>
              <p className="text-xs text-stone-500 font-normal">
                Continuous integration, test-driven methodologies, automated typing, and optimal performance benchmarks.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full bg-black text-white hover:bg-stone-800 text-xs font-semibold transition-all shadow-xs whitespace-nowrap"
          >
            Start a Collaboration ↗
          </a>
        </div>

      </div>
    </section>
  );
};

export default Skills;
