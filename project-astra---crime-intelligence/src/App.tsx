import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import CrimeMapView from './components/CrimeMapView';
import NetworkView from './components/NetworkView';
import MOSearchView from './components/MOSearchView';
import CopilotView from './components/CopilotView';
import AlertsView from './components/AlertsView';
import PredictionsView from './components/PredictionsView';
import { mockAlerts } from './mockData';
import { Alert, UserProfile } from './types';

export default function App() {
  const [user] = useState<UserProfile>({
    name: 'State Crime Analyst',
    email: 'analyst@ksp.gov.in',
    picture: `https://api.dicebear.com/7.x/identicon/svg?seed=analyst@ksp.gov.in`
  });
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDismissAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, is_active: false } : a));
  };

  const handleSelectDistrict = (district: string | null) => {
    setSelectedDistrict(district);
  };

  const handleNavigateToView = useCallback((view: string) => {
    setActiveView(view);
    setSidebarOpen(false);
  }, []);

  const activeAlertCount = alerts.filter(a => a.is_active).length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#07090f] text-slate-300 font-sans antialiased">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:relative z-40 h-full transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <Sidebar 
          activeView={activeView} 
          setActiveView={handleNavigateToView} 
          activeAlertCount={activeAlertCount} 
          user={user}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-hidden flex flex-col min-w-0">
        {/* Mobile top bar with hamburger */}
        <div className="md:hidden h-12 bg-[#0a0d16] border-b border-[#1e293b]/50 px-4 flex items-center gap-3 shrink-0 z-20">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-bold text-white text-sm tracking-tight">ASTRA</span>
        </div>

        {activeView === 'dashboard' && (
          <DashboardView 
            alerts={alerts} 
            onDismissAlert={handleDismissAlert} 
            onSelectDistrict={handleSelectDistrict}
            onNavigateToView={handleNavigateToView}
          />
        )}
        {activeView === 'map' && (
          <CrimeMapView 
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
          />
        )}
        {activeView === 'network' && (
          <NetworkView />
        )}
        {activeView === 'mo-search' && (
          <MOSearchView />
        )}
        {activeView === 'copilot' && (
          <CopilotView />
        )}
        {activeView === 'alerts' && (
          <AlertsView 
            alerts={alerts}
            onDismissAlert={handleDismissAlert}
            onNavigateToView={handleNavigateToView}
          />
        )}
        {activeView === 'predictions' && (
          <PredictionsView />
        )}
      </div>
    </div>
  );
}
