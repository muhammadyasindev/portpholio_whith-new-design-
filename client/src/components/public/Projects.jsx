import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import ProjectModal from './ProjectModal';

const filterTabs = ['All', 'Full Stack', 'Mobile App', 'Backend & APIs'];

const Projects = ({ projects = [] }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeProject, setActiveProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredProjects =
    selectedFilter === 'All'
      ? projects
      : projects.filter((p) => {
          const cat = (p.category || '').toLowerCase();
          if (selectedFilter === 'Full Stack') {
            return cat.includes('full stack') || cat.includes('web') || p.isFeatured;
          }
          if (selectedFilter === 'Mobile App') {
            return cat.includes('mobile') || cat.includes('app') || cat.includes('android');
          }
          if (selectedFilter === 'Backend & APIs') {
            return cat.includes('backend') || cat.includes('api') || cat.includes('database');
          }
          return true;
        });

  const handleOpenModal = (project) => {
    setActiveProject(project);
    setModalOpen(true);
  };

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-white select-none border-t border-stone-200/80">
      
      

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight font-sans flex items-center gap-1.5">
            <span className="text-stone-400 font-light">/</span>SELECTED WORK
          </h2>
          <p className="text-sm md:text-base text-stone-500 font-normal mt-2 max-w-lg">
            Featured full-stack platforms, scalable web architectures, and high-performance native mobile applications.
          </p>
        </motion.div>

        
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-12 border-b border-stone-100">
          <div className="flex flex-wrap items-center gap-2 sm:gap-6">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer pb-2 relative ${
                  selectedFilter === tab
                    ? 'text-black border-b-2 border-black'
                    : 'text-stone-400 hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-black transition-colors"
          >
            <span>Inquire About New Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.article
                layout
                key={project._id || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                exit={{ opacity: 0, scale: 0.96 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleOpenModal(project)}
                className="group cursor-pointer flex flex-col space-y-4"
              >
                
                <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden bg-stone-900 border border-stone-200/90 shadow-xs group-hover:shadow-xl transition-all duration-500">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />

                  
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-mono font-semibold text-black shadow-xs">
                      {project.category || 'Web Application'}
                    </span>
                  </div>

                  
                  <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white text-xs font-semibold shadow-lg">
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                
                <div className="space-y-2 px-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg sm:text-xl font-bold text-black tracking-tight group-hover:underline">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <p className="text-xs sm:text-sm text-stone-500 font-normal line-clamp-2">
                    {project.description || project.summary}
                  </p>

                  
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {(project.technologies || ['React', 'Node.js', 'MongoDB']).slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[11px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      
      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        project={activeProject}
      />
    </section>
  );
};

export default Projects;
