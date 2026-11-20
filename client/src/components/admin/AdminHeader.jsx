import React from 'react';
import { Menu, Bell, Shield, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';

const AdminHeader = ({ setIsSidebarOpen, activeTabTitle, unreadCount = 0 }) => {
  const { user } = useAuth();
  const { refreshData, loading } = usePortfolio();

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-primary capitalize">
            {activeTabTitle}
          </h2>
          <p className="text-[11px] font-mono text-secondary hidden sm:block">
            Production Management & Content Control
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        
        <button
          onClick={refreshData}
          disabled={loading}
          className="p-2 text-stone-500 hover:text-primary hover:bg-stone-100 rounded-lg transition-colors"
          title="Sync latest database state"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-accent' : ''}`} />
        </button>

        
        <div className="flex items-center gap-3 pl-3 border-l border-stone-200">
          <div className="w-8 h-8 rounded-full bg-primary text-warmBeige flex items-center justify-center font-bold text-xs">
            {user?.name?.[0] || 'A'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-primary leading-tight">
              {user?.name || 'Administrator'}
            </p>
            <p className="text-[10px] font-mono text-emerald-600 font-semibold">
              Authenticated
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
