import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CheckCircle2, X } from 'lucide-react';

const ProjectModal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

  const images =
    project.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : [project.thumbnail];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-white rounded-[32px] shadow-2xl overflow-hidden border border-stone-100 flex flex-col max-h-[92vh]"
        >
          
          <div className="sticky top-0 z-30 px-6 sm:px-8 py-5 bg-white/95 backdrop-blur-md border-b border-stone-100 flex items-center justify-between">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 hover:bg-black hover:text-white text-xs font-semibold text-black transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-medium text-black shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for New Project</span>
            </div>
          </div>

          
          <div className="overflow-y-auto p-6 sm:p-10 md:p-12 space-y-10">
            
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start justify-between">
              
              
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3 text-xs font-mono text-stone-400">
                  <span className="px-2.5 py-1 rounded-full bg-stone-100 text-black font-semibold">
                    {project.category || 'Landing Page'}
                  </span>
                  <span>{project.client || 'Kumpin Studio'}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight font-sans">
                  {project.title} <span className="text-stone-300 font-light">/ Real Project</span>
                </h1>

                <p className="text-sm sm:text-base text-stone-500 font-normal leading-relaxed max-w-xl">
                  {project.shortDescription || project.description}
                </p>

                
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black hover:bg-stone-800 text-white text-xs font-semibold shadow-xs transition-all"
                    >
                      <span>Live Preview</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <a
                    href="#contact"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-black text-xs font-semibold shadow-xs transition-all"
                  >
                    <span>Contact Me</span>
                  </a>
                </div>
              </div>

              
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-6 text-right lg:items-end justify-start">
                <div>
                  <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block mb-1">
                    Services
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-black">
                    {project.technologies?.slice(0, 3).join(', ') || 'UI/UX Design, Web Design'}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block mb-1">
                    Duration
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-black font-mono">
                    {project.year ? `${project.year} · 4 Weeks` : '4 Weeks'}
                  </p>
                </div>
              </div>

            </div>

            
            <div className="space-y-6 pt-4">
              <div className="relative aspect-[16/9] rounded-[28px] overflow-hidden bg-stone-900 border border-stone-200 shadow-md">
                <img
                  src={images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              
              <div className="p-8 sm:p-10 rounded-[24px] bg-stone-50 border border-stone-200/90 text-center max-w-3xl mx-auto space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-black tracking-tight">
                  "Where Vision Becomes Impact"
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-normal">
                  {project.description ||
                    'This project focuses on premium visual storytelling, editorial typography, and refined product presentation built to make every interaction feel timeless, exclusive, and unforgettable.'}
                </p>
              </div>

              
              {images.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {images.slice(1).map((shot, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-[16/10] rounded-[24px] overflow-hidden bg-stone-900 border border-stone-200 shadow-xs"
                    >
                      <img src={shot} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
