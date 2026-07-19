import React, { useState } from 'react';
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

  // Handle dismiss alert interactivity
  const handleDismissAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, is_active: false } : a));
  };

  // Handle setting district and jumping views
  const handleSelectDistrict = (district: string | null) => {
    setSelectedDistrict(district);
  };

  const activeAlertCount = alerts.filter(a => a.is_active).length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#07090f] text-slate-300 font-sans antialiased">
      {/* Sidebar - Navigation Hub */}
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        activeAlertCount={activeAlertCount} 
        user={user}
      />

      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-hidden flex flex-col">
        {activeView === 'dashboard' && (
          <DashboardView 
            alerts={alerts} 
            onDismissAlert={handleDismissAlert} 
            onSelectDistrict={handleSelectDistrict}
            onNavigateToView={setActiveView}
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
            onNavigateToView={setActiveView}
          />
        )}
        {activeView === 'predictions' && (
          <PredictionsView />
        )}
      </div>
    </div>
  );
}
