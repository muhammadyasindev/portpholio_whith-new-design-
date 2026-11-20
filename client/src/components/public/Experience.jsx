import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, ArrowUpRight } from 'lucide-react';

const defaultExperiences = [
  {
    _id: 'exp_01',
    organization: 'Kumpin Studio',
    title: 'Senior Full Stack Specialist',
    period: 'Nov 2024 — Present',
    preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
    type: 'experience',
  },
  {
    _id: 'exp_02',
    organization: 'Mikan Team',
    title: 'Lead Web & Mobile Engineer',
    period: 'Aug 2023 — Oct 2024',
    preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
    type: 'experience',
  },
  {
    _id: 'exp_03',
    organization: 'Microsoft (Contract)',
    title: 'Full Stack Frontend Architect',
    period: 'Jan 2022 — Aug 2023',
    preview: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop',
    type: 'experience',
  },
  {
    _id: 'exp_04',
    organization: 'CloudCraft Solutions',
    title: 'Backend & API Developer',
    period: 'Mar 2020 — Dec 2021',
    preview: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop',
    type: 'experience',
  },
];

const defaultEducations = [
  {
    _id: 'edu_01',
    organization: 'University of Engineering & Technology',
    title: 'Bachelor of Science in Computer Science',
    period: '2018 — 2022',
    type: 'education',
  },
  {
    _id: 'edu_02',
    organization: 'Full Stack Development Certification',
    title: 'Meta Professional Developer Specialization',
    period: '2022',
    type: 'education',
  },
];

const Experience = ({ experiences = [] }) => {
  const [activeTab, setActiveTab] = useState('experience');
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const workList =
    experiences.filter((e) => (e.type || 'experience') === 'experience').length > 0
      ? experiences.filter((e) => (e.type || 'experience') === 'experience')
      : defaultExperiences;

  const eduList =
    experiences.filter((e) => e.type === 'education').length > 0
      ? experiences.filter((e) => e.type === 'education')
      : defaultEducations;

  const displayList = activeTab === 'experience' ? workList : eduList;

  return (
    <section id="experience" className="relative py-24 md:py-32 bg-[#121212] text-white select-none border-t border-stone-800">
      
      

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 border-b border-stone-800 pb-8"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-sans flex items-center gap-1.5">
              <span className="text-stone-500 font-light">/</span>EXPERIENCE & CAREER
            </h2>
            <p className="text-sm md:text-base text-stone-400 font-normal mt-2">
              05+ years of verified software engineering, enterprise delivery, and architectural milestones.
            </p>
          </div>

          
          <div className="flex items-center gap-2 bg-stone-900/90 p-1.5 rounded-full border border-stone-800 shrink-0">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'experience'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Experience [{workList.length}]</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education [{eduList.length}]</span>
            </motion.button>
          </div>
        </motion.div>

        
        <div className="divide-y divide-stone-800/80">
          {displayList.map((item, idx) => (
            <div
              key={item._id || idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative py-8 sm:py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer transition-colors hover:text-white"
            >
              
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                  {item.organization || item.institution}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 font-normal">
                  {item.title || item.degree}
                </p>
              </div>

              
              <div className="text-xs sm:text-sm font-mono text-stone-500 group-hover:text-stone-300 transition-colors">
                {item.period || item.year}
              </div>

              
              <AnimatePresence>
                {hoveredIdx === idx && item.preview && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute right-40 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2 pointer-events-none z-30"
                  >
                    <div className="w-48 h-32 rounded-2xl overflow-hidden bg-stone-900 border border-stone-700 shadow-2xl rotate-2">
                      <img
                        src={item.preview}
                        alt={item.organization}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
