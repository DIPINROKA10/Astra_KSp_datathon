import React from 'react';
import { 
  Shield, 
  LayoutDashboard, 
  Map, 
  Share2, 
  Search, 
  MessageSquareCode, 
  Bell, 
  TrendingUp
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  activeAlertCount: number;
  user?: { name: string; email: string; picture?: string; } | null;
}

export default function Sidebar({ activeView, setActiveView, activeAlertCount, user }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'Crime Map', icon: Map },
    { id: 'network', label: 'POLE Network', icon: Share2 },
    { id: 'mo-search', label: 'MO Search', icon: Search },
    { id: 'copilot', label: 'Copilot', icon: MessageSquareCode, isSpecial: true },
    { id: 'alerts', label: 'Alerts', icon: Bell, count: activeAlertCount },
    { id: 'predictions', label: 'Predictions', icon: TrendingUp }
  ];

  return (
    <div className="w-64 bg-[#0a0d16] border-r border-[#1e293b]/50 h-screen flex flex-col select-none text-slate-300">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-[#1e293b]/50 gap-3">
        <div className="p-2 bg-blue-600/15 rounded-lg text-blue-400">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <span className="font-sans font-bold tracking-tight text-white text-lg">ASTRA</span>
          <p className="text-[10px] text-slate-500 font-mono tracking-wider">KSP SYSTEMS v1.0</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium tracking-wide transition-all ${
                isActive 
                  ? 'bg-blue-600/15 text-white border-l-2 border-blue-500 font-semibold' 
                  : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && item.count > 0 && (
                <span className="px-2 py-0.5 text-xs bg-red-600/20 text-red-400 border border-red-500/20 rounded-full font-bold">
                  {item.count}
                </span>
              )}
              {item.isSpecial && (
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" />
              )}
            </button>
          );
        })}
      </div>

      {/* User Information Footer */}
      <div className="p-4 border-t border-[#1e293b]/50 bg-[#07090f]">
        <div className="flex items-center gap-3">
          {user?.picture ? (
            <img 
              src={user.picture} 
              alt={user.name} 
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full border border-blue-500/30 object-cover shadow-lg"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg border border-blue-500/30 text-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate font-sans" title={user?.name || "State Crime Analyst"}>
              {user?.name || "State Crime Analyst"}
            </p>
            <p className="text-[9px] text-slate-500 font-mono truncate" title={user?.email || "analyst@ksp.gov.in"}>
              {user?.email || "analyst@ksp.gov.in"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
