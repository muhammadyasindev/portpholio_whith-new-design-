import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

const defaultServiceList = [
  {
    id: 'srv_1',
    title: 'UIUX DESIGN',
    description: 'Designing clear and scalable interfaces for dashboards, mobile apps, and websites.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'srv_2',
    title: 'WEB DESIGN & DEV',
    description: 'Engineering responsive, modern web applications built on React, Next.js, and high-performance backends.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'srv_3',
    title: 'BRANDING',
    description: 'Crafting coherent digital visual identities, typography guidelines, and design systems.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'srv_4',
    title: 'MOTIONS & ANIMATIONS',
    description: 'Elevating digital interfaces with fluid 60fps micro-interactions, scroll choreographies, and transitions.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'
  }
];

const Services = ({ services = [] }) => {
  const [activeId, setActiveId] = useState('srv_1');

  const displayServices =
    services.length > 0
      ? services.map((s, idx) => ({
          id: s._id || `srv_${idx + 1}`,
          title: (s.title || '').toUpperCase(),
          description: s.description || s.shortDescription || 'Crafting scalable solutions.',
          image: defaultServiceList[idx % defaultServiceList.length]?.image
        }))
      : defaultServiceList;

  return (
    <section id="services" className="relative py-24 md:py-32 bg-white select-none border-t border-stone-200/80">
      
      

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight font-sans flex items-center gap-1.5">
            <span className="text-stone-400 font-light">/</span>SERVICE
          </h2>
        </motion.div>

        
        <div className="space-y-4">
          {displayServices.map((service) => {
            const isActive = activeId === service.id;

            return (
              <motion.div
                key={service.id}
                layout
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                {isActive ? (
                  <div className="p-8 sm:p-12 rounded-[28px] bg-black text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl relative group">
                    
                    
                    <div className="space-y-3 max-w-lg">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight font-sans">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-400 font-normal leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    
                    <div className="flex items-center gap-6 self-stretch md:self-auto justify-between md:justify-end">
                      <div className="relative w-44 sm:w-56 h-28 sm:h-32 rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 shrink-0">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <button
                        onClick={() => setActiveId(null)}
                        className="p-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white transition-colors cursor-pointer shrink-0"
                        title="Collapse"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                  </div>
                ) : (
                  <div
                    onClick={() => setActiveId(service.id)}
                    className="p-7 sm:p-8 rounded-[24px] bg-white border border-stone-200/80 hover:border-black flex items-center justify-between transition-all duration-300 cursor-pointer group"
                  >
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase text-black tracking-tight font-sans group-hover:translate-x-1.5 transition-transform">
                      {service.title}
                    </h3>

                    <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;
