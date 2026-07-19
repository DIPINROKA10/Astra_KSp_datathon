import React, { useState } from 'react';
import { 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  Compass, 
  Users, 
  MapPin, 
  Fingerprint, 
  Activity,
  Calendar,
  Filter,
  CheckCircle,
  BellRing
} from 'lucide-react';
import { Incident, Alert } from '../types';
import { mockIncidents, mockAlerts } from '../mockData';

interface DashboardViewProps {
  alerts: Alert[];
  onDismissAlert: (id: string) => void;
  onSelectDistrict: (district: string | null) => void;
  onNavigateToView: (view: string) => void;
}

export default function DashboardView({ 
  alerts, 
  onDismissAlert, 
  onSelectDistrict,
  onNavigateToView
}: DashboardViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Analytical stats cards matching screenshot values
  const stats = [
    { label: 'TOTAL FIRS', value: '12,847', subtext: 'all time', icon: FileText, color: 'text-blue-400' },
    { label: 'FIRS LAST 7 DAYS', value: '142', subtext: '12.4% vs prev week', icon: TrendingUp, color: 'text-emerald-400', isGreenText: true },
    { label: 'ACTIVE ALERTS', value: alerts.filter(a => a.is_active).length.toString(), subtext: `${alerts.filter(a => a.severity === 'HIGH' && a.is_active).length} High, ${alerts.filter(a => a.severity === 'MEDIUM' && a.is_active).length} Med`, icon: AlertTriangle, color: 'text-red-400' },
    { label: 'HIGH-RISK ZONES', value: '8', subtext: 'STGCN forecast', icon: Compass, color: 'text-amber-500' },
    { label: 'REPEAT OFFENDERS', value: '412', subtext: 'POLE identified', icon: Users, color: 'text-indigo-400' },
    { label: 'DISTRICTS COVERED', value: '31', subtext: 'of 31 districts', icon: MapPin, color: 'text-cyan-400' },
    { label: 'TOP CRIME TYPE', value: 'Theft', subtext: 'by 28% volume', icon: Fingerprint, color: 'text-purple-400' },
    { label: 'MODEL STATUS', value: 'ACTIVE', subtext: 'STGCN + CrimeGAT', icon: Activity, color: 'text-emerald-500' },
  ];

  // Visual trend data
  const trendData = [
    { week: 'Week 21', count: 30, isCurrent: false },
    { week: 'Week 22', count: 36, isCurrent: false },
    { week: 'Week 23', count: 41, isCurrent: false },
    { week: 'Week 24', count: 26, isCurrent: false },
    { week: 'Week 25', count: 22, isCurrent: false },
    { week: 'Week 26', count: 21, isCurrent: false },
    { week: 'Current', count: 24, isCurrent: true }, // The red bar
  ];

  const maxTrendVal = Math.max(...trendData.map(d => d.count));

  return (
    <div className="flex-1 bg-[#0d101a] h-screen overflow-y-auto p-8 font-sans text-slate-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">Intelligence Dashboard</h1>
          <p className="text-xs text-slate-500 font-mono mt-1">Karnataka State Police — ASTRA v1.0</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141a2e] border border-[#1e293b]/50 text-xs font-mono text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span>LAST Retrained: TODAY 02:00 IST</span>
          </div>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              className="bg-[#121624] border border-[#1e293b]/40 rounded-xl p-5 hover:border-[#3b82f6]/30 transition-all shadow-md flex items-start justify-between group"
            >
              <div>
                <p className="text-[10px] text-slate-400 font-mono tracking-wider font-semibold">{stat.label}</p>
                <h3 className="text-2xl font-bold font-sans text-white mt-1.5 group-hover:text-blue-400 transition-colors">
                  {stat.value}
                </h3>
                <p className={`text-[11px] font-mono mt-1.5 ${stat.isGreenText ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {stat.subtext}
                </p>
              </div>
              <div className={`p-2 rounded-lg bg-slate-900/40 border border-slate-800/60 ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Trend Chart */}
        <div className="lg:col-span-2 bg-[#121624] border border-[#1e293b]/40 rounded-xl p-6 shadow-lg flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-white">Weekly Incident Trend</h2>
              <p className="text-xs text-slate-500">Aggregate regional crime patterns & forecasting</p>
            </div>
            <span className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full font-mono">
              District: All
            </span>
          </div>

          {/* Interactive Chart Area */}
          <div className="flex-1 flex items-end justify-between h-64 gap-3 px-2 pt-6 border-b border-slate-800/50">
            {trendData.map((d, index) => {
              const barHeightPercent = (d.count / maxTrendVal) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-1 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[11px] px-2 py-1 rounded-md border border-slate-700 shadow-xl -translate-y-full font-mono z-20 pointer-events-none whitespace-nowrap">
                    {d.isCurrent ? `Forecasted/Active: ${d.count} cases` : `${d.count} cases`}
                  </div>

                  {/* SVG/Div Bar */}
                  <div 
                    style={{ height: `${barHeightPercent}%` }}
                    className={`w-full rounded-t-md transition-all duration-500 relative cursor-pointer ${
                      d.isCurrent 
                        ? 'bg-red-500 hover:bg-red-400 shadow-[0_0_12px_#ef4444]' 
                        : 'bg-blue-500 hover:bg-blue-400'
                    }`}
                  >
                    {/* Pulsing indicator on forecasted bar */}
                    {d.isCurrent && (
                      <span className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                    )}
                  </div>

                  <span className="text-[10px] text-slate-500 mt-3 font-mono transform -rotate-12 group-hover:text-slate-300">
                    {d.week}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 mt-6 pt-2 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-sm" />
              <span>Historical Trend</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-sm animate-pulse" />
              <span>Current Week / Forecast (STGCN Input)</span>
            </div>
          </div>
        </div>

        {/* Active Alerts List panel */}
        <div className="bg-[#121624] border border-[#1e293b]/40 rounded-xl p-6 shadow-lg flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/50">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                <h2 className="text-base font-bold text-white">Active Alerts</h2>
              </div>
              <p className="text-xs text-slate-500">Auto-generated via z-score deviations</p>
            </div>
            <BellRing className="w-4 h-4 text-red-400" />
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[300px] lg:max-h-none">
            {alerts.filter(a => a.is_active).length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center py-12">
                <CheckCircle className="w-8 h-8 text-emerald-500 mb-2" />
                <p className="text-sm font-semibold">All Systems Normal</p>
                <p className="text-xs">No active anomalies detected</p>
              </div>
            ) : (
              alerts.filter(a => a.is_active).map((alert) => (
                <div 
                  key={alert.id}
                  className={`p-4 rounded-lg border transition-all ${
                    alert.severity === 'HIGH'
                      ? 'bg-red-500/5 border-red-500/20 hover:border-red-500/40'
                      : alert.severity === 'MEDIUM'
                      ? 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40'
                      : 'bg-yellow-500/5 border-yellow-500/20 hover:border-yellow-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded-full ${
                        alert.severity === 'HIGH'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : alert.severity === 'MEDIUM'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {alert.severity}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono font-semibold truncate max-w-[120px]">
                        {alert.district}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      z = {alert.z_score.toFixed(2)}
                    </span>
                  </div>
                  
                  <h4 className="text-xs font-bold text-white mb-1">
                    {alert.crime_type} Outbreak
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                    {alert.message}
                  </p>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        onSelectDistrict(alert.district);
                        onNavigateToView('map');
                      }}
                      className="text-[10px] font-mono text-blue-400 hover:text-blue-300 font-semibold"
                    >
                      Analyze Map
                    </button>
                    <span className="text-[10px] text-slate-700">|</span>
                    <button 
                      onClick={() => onDismissAlert(alert.id)}
                      className="text-[10px] font-mono text-slate-500 hover:text-slate-300"
                    >
                      Dismiss Alert
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Lower Recent Incidents Feed */}
      <div className="mt-8 bg-[#121624] border border-[#1e293b]/40 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-white">Recent Ingested Case Files</h2>
            <p className="text-xs text-slate-500">BSA Section 63 chain-of-custody signed records</p>
          </div>
          <button 
            onClick={() => onNavigateToView('map')}
            className="text-xs text-blue-400 hover:text-blue-300 font-mono font-semibold"
          >
            View All Incident Feeds →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono font-medium">
                <th className="py-3 px-4">FIR ID</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Police Station</th>
                <th className="py-3 px-4">Crime Category</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">BNS Statutes</th>
                <th className="py-3 px-4">SHA-256 Hash Signature</th>
                <th className="py-3 px-4 text-right">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-slate-300">
              {mockIncidents.slice(0, 4).map((inc) => (
                <tr key={inc.id} className="hover:bg-slate-800/20 transition-all">
                  <td className="py-3 px-4 font-mono font-bold text-white">{inc.fir_id}</td>
                  <td className="py-3 px-4 font-sans font-medium">{inc.district}</td>
                  <td className="py-3 px-4 text-slate-400">{inc.police_station}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded-md text-[11px]">
                      {inc.crime_type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{inc.fir_date}</td>
                  <td className="py-3 px-4 text-blue-400 font-mono max-w-[150px] truncate">
                    {inc.bns_sections.join(', ')}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600 truncate max-w-[140px]" title={inc.sha256}>
                    {inc.sha256}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] font-semibold bg-emerald-500/5 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      SECURE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
