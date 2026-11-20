import React from 'react';
import {
  LayoutDashboard,
  User,
  Sparkles,
  FileText,
  Code2,
  Briefcase,
  FolderGit2,
  Layers,
  GraduationCap,
  Award,
  Quote,
  MessageSquare,
  Share2,
  FileCode,
  Palette,
  Search,
  ExternalLink,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export const navSections = [
  {
    group: 'CORE OVERVIEW',
    items: [
      { id: 'overview', label: '1. Dashboard Overview', icon: LayoutDashboard },
      { id: 'profile', label: '2. Profile Management', icon: User },
      { id: 'hero', label: '3. Hero Content', icon: Sparkles },
      { id: 'about', label: '4. About Content', icon: FileText }
    ]
  },
  {
    group: 'SHOWCASE & WORK',
    items: [
      { id: 'skills', label: '5. Skills Management', icon: Code2 },
      { id: 'services', label: '6. Services Management', icon: Briefcase },
      { id: 'projects', label: '7. Projects Management', icon: FolderGit2 },
      { id: 'case-studies', label: '8. Project Case Studies', icon: Layers }
    ]
  },
  {
    group: 'BACKGROUND & PROOF',
    items: [
      { id: 'experience', label: '9. Experience Management', icon: Briefcase },
      { id: 'education', label: '10. Education Management', icon: GraduationCap },
      { id: 'certifications', label: '11. Certifications', icon: Award },
      { id: 'testimonials', label: '12. Testimonials', icon: Quote }
    ]
  },
  {
    group: 'COMMUNICATIONS',
    items: [
      { id: 'messages', label: '13. Contact Messages', icon: MessageSquare, hasBadge: true },
      { id: 'social', label: '14. Social Links', icon: Share2 },
      { id: 'resume', label: '15. Resume Management', icon: FileCode }
    ]
  },
  {
    group: 'SYSTEM & DESIGN',
    items: [
      { id: 'theme', label: '16. Theme Settings', icon: Palette },
      { id: 'seo', label: '17. SEO Settings', icon: Search }
    ]
  }
];

const AdminSidebar = ({ activeTab, setActiveTab, unreadCount = 0, isOpen, setIsOpen }) => {
  const { logout } = useAuth();

  return (
    <>
      
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-xs"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-stone-950 text-stone-300 flex flex-col justify-between transition-transform duration-200 border-r border-stone-800 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        
        <div>
          <div className="p-5 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-black text-xs font-syne shadow-sm">
                DA
              </div>
              <div>
                <h1 className="font-bold text-white text-xs leading-tight tracking-wide">
                  PORTFOLIO CMS
                </h1>
                <p className="text-[10px] font-mono text-stone-400">17 Functional Modules</p>
              </div>
            </div>
          </div>

          
          <nav className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-160px)] scrollbar-none">
            {navSections.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <span className="px-3 text-[10px] font-mono text-stone-400 font-semibold tracking-wider uppercase block">
                  {sec.group}
                </span>

                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white text-black font-semibold shadow-xs'
                          : 'text-stone-300 hover:text-white hover:bg-stone-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-black' : 'text-stone-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.hasBadge && unreadCount > 0 && (
                        <span
                          className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 ${
                            isActive ? 'bg-black text-white' : 'bg-rose-500 text-white'
                          }`}
                        >
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        
        <div className="p-3 border-t border-stone-800 space-y-1 bg-stone-950">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-stone-300 hover:text-white hover:bg-stone-900 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              <span>View Public Site</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">
              Live
            </span>
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
