import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getFullPortfolio } from '../api';
import { initialPortfolioData } from '../data/initialData';

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(initialPortfolioData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPortfolio = useCallback(async () => {
    try {
      const res = await getFullPortfolio();
      if (res.data && res.data.success && res.data.data) {
        setData(res.data.data);
        setError(null);
      }
    } catch (err) {
      console.warn('[PortfolioContext] Backend API sync note:', err.message);
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  useEffect(() => {
    if (data?.settings?.theme) {
      const theme = data.settings.theme;
      const root = document.documentElement;
      if (theme.primaryBg) root.style.setProperty('--color-primary-bg', theme.primaryBg);
      if (theme.secondaryBg) root.style.setProperty('--color-secondary-bg', theme.secondaryBg);
      if (theme.primaryText) root.style.setProperty('--color-primary-text', theme.primaryText);
      if (theme.secondaryText) root.style.setProperty('--color-secondary-text', theme.secondaryText);
      if (theme.accentColor) root.style.setProperty('--color-accent', theme.accentColor);
      if (theme.headingFont) root.style.setProperty('--font-heading', theme.headingFont);
      if (theme.bodyFont) root.style.setProperty('--font-body', theme.bodyFont);
    }
  }, [data?.settings?.theme]);

  return (
    <PortfolioContext.Provider
      value={{
        portfolio: data,
        profile: data?.profile,
        about: data?.about,
        skills: data?.skills || [],
        services: data?.services || [],
        projects: data?.projects || [],
        experiences: data?.experiences || [],
        testimonials: data?.testimonials || [],
        settings: data?.settings,
        loading,
        error,
        refreshData: fetchPortfolio
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within a PortfolioProvider');
  return context;
};
