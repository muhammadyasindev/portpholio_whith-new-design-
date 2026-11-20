import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex] || testimonials[0];
  if (!current) return null;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-white border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-accent uppercase tracking-widest font-semibold">
                06 / ENDORSEMENTS
              </span>
              <span className="w-8 h-[1px] bg-accent/40"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
              Client Feedback <br className="hidden sm:inline" />
              <span className="text-darkBrown">& Partnerships.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-secondary max-w-md">
            What product leaders, founders, and engineering managers have to say about working together.
          </p>
        </div>

        
        <div className="relative max-w-4xl mx-auto">
          <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-stone-50 border border-stone-200/90 shadow-sm relative">
            <Quote className="absolute top-8 right-8 w-16 h-16 text-warmBeige/40 pointer-events-none" />

            
            <div className="flex items-center gap-1 mb-6 text-amber-500">
              {[...Array(current.rating || 5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="text-lg sm:text-xl md:text-2xl font-medium text-stone-800 leading-relaxed mb-8 italic"
              >
                "{current.content}"
              </motion.blockquote>
            </AnimatePresence>

            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-stone-200">
              <div className="flex items-center gap-4">
                <img
                  src={
                    current.avatar ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
                  }
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-warmBeige shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-base text-primary leading-tight">
                    {current.name}
                  </h3>
                  <p className="text-xs text-secondary mt-0.5">
                    {current.designation} {current.company ? `— ${current.company}` : ''}
                  </p>
                  {current.project && (
                    <span className="text-[11px] font-mono text-accent block mt-0.5">
                      Project: {current.project}
                    </span>
                  )}
                </div>
              </div>

              
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-stone-400 mr-2">
                  0{currentIndex + 1} / 0{testimonials.length}
                </span>
                <button
                  onClick={prevTestimonial}
                  className="p-3 rounded-full border border-stone-300 hover:border-darkBrown hover:bg-white text-stone-700 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-3 rounded-full bg-primary hover:bg-darkBrown text-warmBeige transition-colors shadow-sm"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
