import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

import CursorFollower from '../components/public/CursorFollower';
import Navbar from '../components/public/Navbar';
import Hero from '../components/public/Hero';
import About from '../components/public/About';
import Skills from '../components/public/Skills';
import Services from '../components/public/Services';
import Projects from '../components/public/Projects';
import Experience from '../components/public/Experience';
import Testimonials from '../components/public/Testimonials';
import Contact from '../components/public/Contact';
import Footer from '../components/public/Footer';

const HomePage = () => {
  const { portfolio, profile, about, skills, services, projects, experiences, testimonials, settings, loading, error, refreshData } = usePortfolio();

  useEffect(() => {
    if (settings?.siteTitle) {
      document.title = settings.siteTitle;
    }
    if (settings?.metaDescription) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', settings.metaDescription);
      }
    }
  }, [settings]);

  if (loading && !portfolio) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-primary">
        <div className="w-14 h-14 rounded-2xl bg-primary text-warmBeige flex items-center justify-center font-bold text-xl shadow-lg mb-4 animate-pulse">
          MY
        </div>
        <p className="font-mono text-xs text-stone-500 uppercase tracking-widest">
          Loading Portfolio Architecture...
        </p>
      </div>
    );
  }

  if (error && !portfolio) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center text-primary">
        <h2 className="text-xl font-bold mb-2">Unable to Load Portfolio Data</h2>
        <p className="text-xs text-secondary mb-4 max-w-sm">
          Please verify that the backend API server is running on port 5000.
        </p>
        <button
          onClick={refreshData}
          className="px-5 py-2 rounded-xl bg-primary text-warmBeige text-xs font-semibold"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-bg text-primary">
      
      <CursorFollower />

      
      <Navbar
        profile={profile}
        settings={settings}
        projectsCount={projects?.length || 45}
        servicesCount={services?.length || 7}
      />

      
      <main>
        <Hero profile={profile} settings={settings} />
        <About about={about} profile={profile} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Services services={services} />
        <Experience experiences={experiences} />
        
        <Contact profile={profile} settings={settings} />
      </main>

      
      <Footer profile={profile} settings={settings} />
    </div>
  );
};

export default HomePage;
