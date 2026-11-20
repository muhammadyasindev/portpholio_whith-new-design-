import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Globe, Instagram, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = ({ profile, settings }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = settings?.socialLinks || {};

  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-16 border-b border-stone-800 gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-3 block">
              HAVE A PROJECT IN MIND?
            </span>
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.05]">
              Let's craft something <br />
              <span className="text-stone-400">extraordinary together.</span>
            </h3>
          </div>

          <button
            onClick={scrollToTop}
            className="self-start lg:self-auto flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs font-medium transition-all group cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16 border-b border-stone-800 text-xs text-stone-400">
          
          <div className="space-y-3">
            <h4 className="font-bold text-white text-base">
              {profile?.name || 'Muhammad Yasin'}
            </h4>
            <p className="leading-relaxed">
              {profile?.designation || 'Full Stack Web & App Developer'}. Based in {profile?.location || 'Balochistan, Pakistan'}.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-[11px] font-mono text-emerald-400 border border-stone-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Available for New Work
              </span>
            </div>
          </div>

          
          <div className="space-y-2.5">
            <h5 className="font-mono uppercase text-white font-semibold">Explore</h5>
            <p><a href="#home" className="hover:text-white transition-colors">Home</a></p>
            <p><a href="#projects" className="hover:text-white transition-colors">Selected Works [40]</a></p>
            <p><a href="#services" className="hover:text-white transition-colors">Capabilities & Services</a></p>
            <p><a href="#experience" className="hover:text-white transition-colors">Career Timeline</a></p>
            <p><a href="#contact" className="hover:text-white transition-colors">Contact Inquiry</a></p>
          </div>

          
          <div className="space-y-2.5">
            <h5 className="font-mono uppercase text-white font-semibold">Contact Direct</h5>
            <p className="text-white font-medium">{profile?.email || 'contact@yasinportfolio.dev'}</p>
            <p>{profile?.phone || '+92 312 3456789'}</p>
            <p>{profile?.location || 'Balochistan, Pakistan'}</p>
            {profile?.resumeUrl && (
              <p className="pt-2">
                <a
                  href={profile.resumeUrl}
                  download="Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline"
                >
                  Download CV / Resume &rarr;
                </a>
              </p>
            )}
          </div>

          
          <div className="space-y-3">
            <h5 className="font-mono uppercase text-white font-semibold">Socials</h5>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://dribbble.com/shots/26995447-Personal-Portfolio-Website-Animations"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
                title="Dribbble"
              >
                <Globe className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-mono gap-4">
          <p>&copy; {new Date().getFullYear()} {profile?.name || 'Muhammad Yasin'}. All rights reserved.</p>
          <p>Personal Portfolio Website Animations Design System</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
