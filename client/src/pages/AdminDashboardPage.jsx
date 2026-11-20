import React, { useState, useEffect, useCallback } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { getMessages } from '../api';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';

import OverviewModule from '../components/admin/modules/OverviewModule';
import ProfileModule from '../components/admin/modules/ProfileModule';
import HeroModule from '../components/admin/modules/HeroModule';
import AboutModule from '../components/admin/modules/AboutModule';
import SkillsModule from '../components/admin/modules/SkillsModule';
import ServicesModule from '../components/admin/modules/ServicesModule';
import ProjectsModule from '../components/admin/modules/ProjectsModule';
import CaseStudiesModule from '../components/admin/modules/CaseStudiesModule';
import ExperienceModule from '../components/admin/modules/ExperienceModule';
import EducationModule from '../components/admin/modules/EducationModule';
import CertificationsModule from '../components/admin/modules/CertificationsModule';
import TestimonialsModule from '../components/admin/modules/TestimonialsModule';
import MessagesModule from '../components/admin/modules/MessagesModule';
import SocialLinksModule from '../components/admin/modules/SocialLinksModule';
import ResumeModule from '../components/admin/modules/ResumeModule';
import ThemeSettingsModule from '../components/admin/modules/ThemeSettingsModule';
import SEOSettingsModule from '../components/admin/modules/SEOSettingsModule';

const tabTitles = {
  overview: 'Module 01: Dashboard Overview',
  profile: 'Module 02: Profile Management',
  hero: 'Module 03: Hero Content',
  about: 'Module 04: About Content',
  skills: 'Module 05: Skills Management',
  services: 'Module 06: Services Management',
  projects: 'Module 07: Projects Management',
  'case-studies': 'Module 08: Project Case Studies',
  experience: 'Module 09: Experience Management',
  education: 'Module 10: Education Management',
  certifications: 'Module 11: Certifications',
  testimonials: 'Module 12: Testimonials',
  messages: 'Module 13: Contact Messages',
  social: 'Module 14: Social Links',
  resume: 'Module 15: Resume Management',
  theme: 'Module 16: Theme Settings',
  seo: 'Module 17: SEO Settings'
};

const AdminDashboardPage = () => {
  const { portfolio, refreshData } = usePortfolio();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const fetchInquiries = useCallback(async () => {
    try {
      const res = await getMessages();
      if (res.data.success && res.data.messages) {
        setMessages(res.data.messages);
      }
    } catch (err) {
      console.warn('[Admin] Could not load messages:', err.message);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleDataRefresh = () => {
    refreshData();
    fetchInquiries();
  };

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  return (
    <div className="min-h-screen bg-stone-100 flex">
      
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadCount={unreadCount}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        
        <AdminHeader
          setIsSidebarOpen={setIsSidebarOpen}
          activeTabTitle={tabTitles[activeTab] || 'Dashboard'}
          unreadCount={unreadCount}
        />

        
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto">
          
          {activeTab === 'overview' && (
            <OverviewModule
              portfolio={portfolio}
              messages={messages}
              setActiveTab={setActiveTab}
            />
          )}

          
          {activeTab === 'profile' && (
            <ProfileModule
              profile={portfolio?.profile}
              onUpdated={handleDataRefresh}
            />
          )}

          
          {activeTab === 'hero' && (
            <HeroModule
              profile={portfolio?.profile}
              onUpdated={handleDataRefresh}
            />
          )}

          
          {activeTab === 'about' && (
            <AboutModule
              about={portfolio?.about}
              onUpdated={handleDataRefresh}
            />
          )}

          
          {activeTab === 'skills' && (
            <SkillsModule
              skills={portfolio?.skills || []}
              onUpdated={handleDataRefresh}
            />
          )}

          
          {activeTab === 'services' && (
            <ServicesModule
              services={portfolio?.services || []}
              onUpdated={handleDataRefresh}
            />
          )}

          
          {activeTab === 'projects' && (
            <ProjectsModule
              projects={portfolio?.projects || []}
              onUpdated={handleDataRefresh}
            />
          )}

          
          {activeTab === 'case-studies' && (
            <CaseStudiesModule
              projects={portfolio?.projects || []}
              onUpdated={handleDataRefresh}
            />
          )}

          
          {activeTab === 'experience' && (
            <ExperienceModule
              experiences={portfolio?.experiences || []}
              onUpdated={handleDataRefresh}
            />
          )}

          
          {activeTab === 'education' && (
            <EducationModule
              experiences={portfolio?.experiences || []}
              onUpdated={handleDataRefresh}
            />
          )}

          
          {activeTab === 'certifications' && (
            <CertificationsModule
              experiences={portfolio?.experiences || []}
              onUpdated={handleDataRefresh}
            />
          )}

          
          {activeTab === 'testimonials' && (
            <TestimonialsModule
              testimonials={portfolio?.testimonials || []}
              onUpdated={handleDataRefresh}
            />
          )}

          
          {activeTab === 'messages' && (
            <MessagesModule
              messages={messages}
              onUpdated={handleDataRefresh}
            />
          )}

          
          {activeTab === 'social' && (
            <SocialLinksModule
              settings={portfolio?.settings}
              onUpdated={handleDataRefresh}
            />
          )}

          
          {activeTab === 'resume' && (
            <ResumeModule
              profile={portfolio?.profile}
              onUpdated={handleDataRefresh}
            />
          )}

          
          {activeTab === 'theme' && (
            <ThemeSettingsModule
              settings={portfolio?.settings}
              onUpdated={handleDataRefresh}
            />
          )}

          
          {activeTab === 'seo' && (
            <SEOSettingsModule
              settings={portfolio?.settings}
              onUpdated={handleDataRefresh}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
