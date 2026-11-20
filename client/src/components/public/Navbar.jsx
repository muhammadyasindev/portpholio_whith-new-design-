import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ profile, settings, projectsCount = 45, servicesCount = 6 }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: `Work [${projectsCount || 45}]`, href: '#projects' },
    { name: `Services [${servicesCount || 6}]`, href: '#services' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-4 bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-xs'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          
          <div className="flex items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-stone-100 text-[13px] font-medium text-black">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>Available for New Project</span>
            </div>
          </div>

          
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium tracking-normal text-black">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="hover:text-stone-500 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          
          <div className="flex items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-black text-white hover:bg-stone-800 text-[13px] font-medium transition-all shadow-xs group"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>

            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-black hover:bg-stone-100 transition-colors border border-stone-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-30 bg-white/98 backdrop-blur-xl border-b border-stone-200 shadow-xl px-6 py-8 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-lg font-bold text-black hover:text-stone-600 transition-colors py-1"
                >
                  {item.name}
                </a>
              ))}

              <div className="pt-4 border-t border-stone-100 flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-full bg-black text-white"
                >
                  <span>Let's Talk</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center text-xs font-mono text-stone-500 hover:text-black py-2"
                >
                  Admin CMS Panel
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
