import React from 'react';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Activity, 
  Filter, 
  Calendar,
  AlertCircle,
  Eye,
  Trash2
} from 'lucide-react';
import { Alert } from '../types';

interface AlertsViewProps {
  alerts: Alert[];
  onDismissAlert: (id: string) => void;
  onNavigateToView: (view: string) => void;
}

export default function AlertsView({ alerts, onDismissAlert, onNavigateToView }: AlertsViewProps) {
  return (
    <div className="flex-1 bg-[#090b11] h-screen overflow-y-auto p-8 font-sans text-slate-300">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white font-sans">Active & Historical Alarms</h1>
        <p className="text-xs text-slate-500 font-mono mt-1">z-score Statistical Outbreak Detection engine logs</p>
      </div>

      {/* Grid count summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#121624] border border-[#1e293b]/40 rounded-xl p-5 flex items-center gap-4 shadow-md">
          <div className="p-3 bg-red-600/10 text-red-400 rounded-lg border border-red-500/15">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">CRITICAL SPIKES</span>
            <span className="text-2xl font-bold text-white font-mono">
              {alerts.filter(a => a.severity === 'HIGH' && a.is_active).length}
            </span>
          </div>
        </div>

        <div className="bg-[#121624] border border-[#1e293b]/40 rounded-xl p-5 flex items-center gap-4 shadow-md">
          <div className="p-3 bg-amber-600/10 text-amber-400 rounded-lg border border-amber-500/15">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">MEDIUM DEVIATIONS</span>
            <span className="text-2xl font-bold text-white font-mono">
              {alerts.filter(a => a.severity === 'MEDIUM' && a.is_active).length}
            </span>
          </div>
        </div>

        <div className="bg-[#121624] border border-[#1e293b]/40 rounded-xl p-5 flex items-center gap-4 shadow-md">
          <div className="p-3 bg-emerald-600/10 text-emerald-400 rounded-lg border border-emerald-500/15">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">RESOLVED ALARMS</span>
            <span className="text-2xl font-bold text-white font-mono">
              {alerts.filter(a => !a.is_active).length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Alert List table representation */}
      <div className="bg-[#121624] border border-[#1e293b]/40 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800">
          <span className="text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">
            Active System Anomalies
          </span>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
            <Activity className="w-3.5 h-3.5" />
            <span>Detection scan frequency: every 5 min</span>
          </div>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              className={`p-5 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                !alert.is_active
                  ? 'bg-slate-900/40 border-slate-800/60 opacity-60'
                  : alert.severity === 'HIGH'
                  ? 'bg-red-500/5 border-red-500/20 hover:border-red-500/40'
                  : 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40'
              }`}
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                    alert.severity === 'HIGH'
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : alert.severity === 'MEDIUM'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                  }`}>
                    {alert.severity}
                  </span>
                  <span className="text-xs font-bold text-white font-sans">
                    {alert.district} — {alert.crime_type}
                  </span>
                  {!alert.is_active && (
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 rounded-full">
                      RESOLVED
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {alert.message}
                </p>

                <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono">
                  <span>Current 7-day count: {alert.current_count} cases</span>
                  <span>•</span>
                  <span>Baseline mean: {alert.baseline_mean.toFixed(1)} cases</span>
                  <span>•</span>
                  <span className="text-blue-400 font-semibold">Standard deviation score (z-score): {alert.z_score.toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              {alert.is_active && (
                <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                  <button 
                    onClick={() => onNavigateToView('map')}
                    className="p-2 hover:bg-blue-500/10 hover:border-blue-500/30 border border-slate-800 rounded-lg text-blue-400 transition-all text-xs font-sans font-semibold flex items-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Map</span>
                  </button>
                  <button 
                    onClick={() => onDismissAlert(alert.id)}
                    className="p-2 hover:bg-red-500/10 hover:border-red-500/30 border border-slate-800 rounded-lg text-red-400 transition-all text-xs font-sans font-semibold flex items-center gap-1.5"
                    title="Dismiss alert"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Dismiss</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
