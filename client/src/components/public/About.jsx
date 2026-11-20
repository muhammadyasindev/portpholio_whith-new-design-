import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles, Shield, MapPin, CheckCircle2, ArrowUpRight } from 'lucide-react';

const About = ({ about, profile }) => {
  const stats = [
    { label: 'Projects Completed', value: '45+', desc: 'Web, Mobile & SaaS' },
    { label: 'Years Experience', value: '05+', desc: 'Production Engineering' },
    { label: 'Technologies Mastered', value: '28+', desc: 'Modern Architecture' },
    { label: 'Client Satisfaction', value: '99%', desc: 'Across Global Clients' },
  ];

  const pillars = [
    {
      icon: Code2,
      tag: '01 / ARCHITECTURE',
      title: 'Scalable Systems',
      desc: 'Modular, maintainable codebases with clean architectural patterns, robust REST/GraphQL APIs, and enterprise-grade reliability.',
    },
    {
      icon: Sparkles,
      tag: '02 / USER EXPERIENCE',
      title: 'Design-Driven Polish',
      desc: 'Obsession with subtle typography hierarchy, 60fps micro-interactions, and intuitive interfaces that make complex software feel effortless.',
    },
    {
      icon: Shield,
      tag: '03 / PRODUCTION GRADE',
      title: 'Full Lifecycle Ownership',
      desc: 'End-to-end delivery from database schema modeling to cloud deployment, containerization, and continuous performance monitoring.',
    },
  ];

  const bioHeadline =
    about?.headline || 'Building Digital Experiences That Make a Difference.';
  const bioStory =
    about?.story ||
    about?.bioParagraph1 ||
    'I build modern, scalable and user-focused web and mobile applications, transforming ideas into powerful digital products. From initial interface concepts to database architecture and production deployment, I focus on crafting software that is both visually refined and rigorously engineered.';

  return (
    <section id="about" className="relative py-24 md:py-32 bg-white select-none border-t border-stone-200/80">
      
      

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight font-sans flex items-center gap-1.5">
            <span className="text-stone-400 font-light">/</span>ABOUT ME
          </h2>
          <p className="text-sm md:text-base text-stone-500 font-normal mt-2 max-w-md">
            Engineering high-performance software with design-level craftsmanship and architectural rigor.
          </p>
        </motion.div>

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight leading-[1.2] font-sans">
              {bioHeadline}
            </h3>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
              {bioStory}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-50 border border-stone-200 text-xs font-medium text-stone-800">
                <MapPin className="w-3.5 h-3.5 text-stone-600" />
                <span>{profile?.location || 'Balochistan, Pakistan'}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-50 border border-stone-200 text-xs font-medium text-stone-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{profile?.availabilityStatus || 'Available for Freelance & Collaboration'}</span>
              </div>
            </div>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-stone-50/80 p-7 sm:p-8 rounded-3xl border border-stone-200/90 space-y-5 shadow-xs hover:shadow-md transition-shadow duration-300"
          >
            <p className="text-xs font-mono uppercase tracking-wider text-stone-400 font-semibold">
              Approach & Core Focus
            </p>
            <ul className="space-y-4 text-xs sm:text-sm text-stone-800 font-medium">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <span>Full-Stack Modern Web Applications (React, Next.js, Node.js)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <span>Cross-Platform Native Mobile Apps (React Native / Android)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <span>Scalable RESTful & GraphQL API Infrastructure</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <span>High-Fidelity Animations & 60fps Micro-Interactions</span>
              </li>
            </ul>
          </motion.div>

        </div>

        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl bg-stone-50/60 border border-stone-200/80 mb-16">
          {stats.map((st, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1.5 cursor-default transition-all duration-300"
            >
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight font-sans">
                {st.value}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-stone-800">
                {st.label}
              </p>
              <p className="text-[11px] text-stone-500 font-mono">
                {st.desc}
              </p>
            </motion.div>
          ))}
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-7 rounded-2xl bg-white border border-stone-200/90 hover:border-black hover:shadow-lg transition-all duration-300 group space-y-4 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors duration-300 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-stone-400 font-semibold tracking-wider">
                    {item.tag}
                  </span>
                  <h4 className="text-lg font-bold text-black tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-normal pt-1">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default About;
