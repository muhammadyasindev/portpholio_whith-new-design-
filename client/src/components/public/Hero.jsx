import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Globe, Instagram, Download, Sparkles, MapPin } from 'lucide-react';

const Hero = ({ profile, settings }) => {
  const fullName = profile?.name || 'Muhammad Yasin';
  const designation = profile?.designation || 'Full Stack Web & App Developer';
  const headline = profile?.headline || 'Building Digital Experiences That Make a Difference.';
  const shortIntro =
    profile?.shortIntro ||
    'I build modern, scalable and user-focused web and mobile applications, transforming ideas into powerful digital products.';
  const location = profile?.location || 'Balochistan, Pakistan';
  const availabilityStatus = profile?.availabilityStatus || 'Available for Freelance & Collaboration';
  const avatarSrc = profile?.avatar || '/designer_headshot.jpg';
  const resumeUrl = profile?.resumeUrl || '/uploads/Muhammad_Yasin_FullStack_Resume.pdf';

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-28 sm:pt-32 pb-20 md:pb-28 bg-[#FDFDFD] overflow-hidden select-none">


      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:28px_28px] opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">


          <div className="lg:col-span-7 space-y-7 text-left z-10">


            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-wrap items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-stone-200/90 shadow-xs text-xs font-medium text-stone-800"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{availabilityStatus}</span>
              <span className="text-stone-300 hidden sm:inline">•</span>
              <span className="text-stone-500 flex items-center gap-1 hidden sm:inline-flex">
                <MapPin className="w-3 h-3 text-stone-400" />
                {location}
              </span>
            </motion.div>


            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-stone-500 font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5 text-stone-900" />
                <span>{designation}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black tracking-tight leading-[1.08] font-sans"
              >
                Building Digital Experiences <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-stone-800 to-stone-500">
                  That Make a Difference.
                </span>
              </motion.h1>
            </div>


            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base sm:text-lg md:text-xl text-stone-600 font-normal leading-relaxed max-w-2xl"
            >
              {shortIntro}
            </motion.p>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleScrollTo('projects')}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-black hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg group cursor-pointer"
              >
                <span>View Selected Work</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleScrollTo('contact')}
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs cursor-pointer"
              >
                <span>Let's Talk</span>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={resumeUrl && resumeUrl.endsWith('.pdf') ? 'Muhammad_Yasin_Resume.pdf' : undefined}
                className="inline-flex items-center gap-2 px-5 py-4 rounded-full text-stone-600 hover:text-black text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </motion.a>
            </motion.div>


            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-6"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-stone-400 font-medium">CONNECT:</span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full border border-stone-200 bg-white hover:border-black text-stone-700 hover:text-black transition-all shadow-xs"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full border border-stone-200 bg-white hover:border-black text-stone-700 hover:text-black transition-all shadow-xs"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://dribbble.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full border border-stone-200 bg-white hover:border-black text-stone-700 hover:text-black transition-all shadow-xs"
                    aria-label="Dribbble Portfolio"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full border border-stone-200 bg-white hover:border-black text-stone-700 hover:text-black transition-all shadow-xs"
                    aria-label="Instagram Profile"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>React • Next.js • Node.js • React Native • Cloud</span>
              </div>
            </motion.div>

          </div>


          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[420px]"
            >


              <div className="relative rounded-[32px] overflow-hidden bg-stone-100 border border-stone-200/90 shadow-2xl aspect-[4/5] group">
                <img
                  src={avatarSrc}
                  alt={fullName}
                  className="w-full h-full object-cover object-top filter contrast-[1.03] group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = '/profile-portrait.png';
                  }}
                />


                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-7 sm:p-8 text-white">
                  <p className="text-[11px] font-mono tracking-wider uppercase text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Full Stack Architect
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">
                    {fullName}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 font-sans">
                    {location} • Available Globally
                  </p>
                </div>
              </div>


              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: [0, -6, 0] }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.4 },
                  scale: { duration: 0.6, delay: 0.4 },
                  x: { duration: 0.6, delay: 0.4 },
                  y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }
                }}
                className="absolute -top-4 -left-6 bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-2xl p-4 shadow-xl hidden sm:flex items-center gap-3.5 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-sm">
                  05+
                </div>
                <div>
                  <p className="text-xs font-bold text-black">Years Experience</p>
                  <p className="text-[11px] text-stone-500 font-mono">Production Engineering</p>
                </div>
              </motion.div>


              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: [0, 6, 0] }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.5 },
                  scale: { duration: 0.6, delay: 0.5 },
                  x: { duration: 0.6, delay: 0.5 },
                  y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }
                }}
                className="absolute -bottom-5 -right-4 bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-2xl p-4 shadow-xl hidden sm:flex items-center gap-3.5 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-black">45+ Projects Delivered</p>
                  <p className="text-[11px] text-stone-500 font-mono">Web, Mobile & Cloud</p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
