import React from 'react';
import {
  FolderGit2,
  Code2,
  Briefcase,
  MessageSquare,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Clock,
  ArrowUpRight
} from 'lucide-react';

const OverviewModule = ({ portfolio, messages, setActiveTab }) => {
  const unreadMessages = messages.filter((m) => m.status === 'unread');

  const stats = [
    {
      title: 'Projects',
      count: portfolio?.projects?.length || 0,
      sub: `${portfolio?.projects?.filter((p) => p.isFeatured)?.length || 0} Featured`,
      icon: FolderGit2,
      tab: 'projects'
    },
    {
      title: 'Skills & Tech',
      count: portfolio?.skills?.length || 0,
      sub: 'Categorized Matrix',
      icon: Code2,
      tab: 'skills'
    },
    {
      title: 'Services',
      count: portfolio?.services?.length || 0,
      sub: 'Active Offerings',
      icon: Briefcase,
      tab: 'services'
    },
    {
      title: 'Inquiries',
      count: messages.length,
      sub: `${unreadMessages.length} Unread`,
      icon: MessageSquare,
      tab: 'messages',
      highlight: unreadMessages.length > 0
    }
  ];

  return (
    <div className="space-y-8">
      
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900 to-stone-800 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-warmBeige/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-warmBeige text-xs font-mono mb-3 border border-stone-700">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Developer Portfolio Control Hub</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Welcome back, {portfolio?.profile?.name || 'Developer'}!
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            All updates you save here instantly sync live across your public portfolio. MongoDB database adapter is active with fallback persistent storage.
          </p>
        </div>
      </div>

      
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => setActiveTab(item.tab)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer group ${
                item.highlight
                  ? 'bg-accent/10 border-accent/40 hover:bg-accent/15'
                  : 'bg-white border-stone-200 hover:border-darkBrown/40 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase text-secondary font-semibold">
                  {item.title}
                </span>
                <div className="p-2 rounded-xl bg-stone-100 group-hover:bg-primary group-hover:text-warmBeige text-stone-700 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-primary font-mono leading-none mb-1">
                {item.count}
              </p>
              <p className="text-[11px] text-stone-500 font-medium">{item.sub}</p>
            </div>
          );
        })}
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base text-primary">Recent Inquiries</h3>
              <p className="text-xs text-secondary">Latest messages from potential clients</p>
            </div>
            <button
              onClick={() => setActiveTab('messages')}
              className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
            >
              <span>View All ({messages.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-10 text-stone-400 text-xs font-mono">
              No messages received yet.
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {messages.slice(0, 4).map((msg) => (
                <div key={msg._id} className="py-3.5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-xs text-primary truncate">{msg.name}</span>
                      <span className="text-[10px] text-stone-400 font-mono">
                        ({msg.email})
                      </span>
                      {msg.status === 'unread' && (
                        <span className="w-2 h-2 rounded-full bg-accent" title="Unread" />
                      )}
                    </div>
                    <p className="text-xs text-stone-600 truncate">{msg.subject || msg.message}</p>
                  </div>
                  <span className="text-[11px] font-mono text-stone-400 whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        
        <div className="lg:col-span-4 bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-primary mb-1">Developer Identity</h3>
            <p className="text-xs text-secondary mb-6">Quick profile verification</p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={
                    portfolio?.profile?.avatar ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
                  }
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-primary">
                    {portfolio?.profile?.name || 'Muhammad Yasin'}
                  </h4>
                  <p className="text-xs text-secondary leading-tight">
                    {portfolio?.profile?.designation}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-mono text-[11px]">Location:</span>
                  <span className="font-medium text-stone-800">
                    {portfolio?.profile?.location || 'Balochistan, Pakistan'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-mono text-[11px]">Availability:</span>
                  <span className="font-medium text-emerald-600">
                    {portfolio?.profile?.isAvailable ? 'Available' : 'Busy'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-mono text-[11px]">Email:</span>
                  <span className="font-medium text-stone-800 truncate max-w-[150px]">
                    {portfolio?.profile?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('profile')}
            className="mt-6 w-full py-2.5 rounded-xl border border-stone-300 hover:border-darkBrown text-xs font-semibold text-primary hover:bg-stone-50 transition-colors"
          >
            Edit Profile & Hero
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewModule;
