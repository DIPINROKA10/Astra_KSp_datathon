import React from 'react';
import { 
  TrendingUp, 
  Compass, 
  HelpCircle, 
  FileText, 
  Settings, 
  Cpu, 
  Play, 
  Activity, 
  Zap, 
  Lock,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { mockPredictions } from '../mockData';

export default function PredictionsView() {
  return (
    <div className="flex-1 bg-[#090b11] h-screen overflow-y-auto p-8 font-sans text-slate-300">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white font-sans">Spatio-Temporal Forecast Model</h1>
        <p className="text-xs text-slate-500 font-mono mt-1">STGCN (Spatio-Temporal Graph Convolutional Network) v1.02 Metrics</p>
      </div>

      {/* Model configuration description board card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Model Specs Card */}
        <div className="bg-[#121624] border border-[#1e293b]/40 rounded-xl p-5 shadow-md lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-5 h-5 text-blue-400" />
              <h2 className="text-sm font-bold text-white font-sans">Model Hyperparameters & Training Specs</h2>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Our <strong>STGCN (Spatio-Temporal Graph Convolutional Network)</strong> trains on historical crime incident inputs mapped onto a non-Euclidean state road-network graph. This is powered locally on-device via PyTorch Geometric.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="bg-[#0c0e17] p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block mb-1">Epochs Run</span>
                <span className="text-white font-bold">100 (Early Stop)</span>
              </div>
              <div className="bg-[#0c0e17] p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block mb-1">Validation Loss</span>
                <span className="text-emerald-400 font-bold">0.082 MAE</span>
              </div>
              <div className="bg-[#0c0e17] p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block mb-1">Grid Indexing</span>
                <span className="text-white font-bold">H3 resolution-8</span>
              </div>
              <div className="bg-[#0c0e17] p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block mb-1">GNN Kernel</span>
                <span className="text-white font-bold">ChebConv (K=3)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono border-t border-slate-800/60 pt-4 mt-4">
            <span className="text-slate-500">Device Target: LOCAL CPU/GPU THREADS</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              100% AIR-GAPPED TRAINING
            </span>
          </div>
        </div>

        {/* Feature Weights Input Description */}
        <div className="bg-[#121624] border border-[#1e293b]/40 rounded-xl p-5 shadow-md">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
            <Settings className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-white font-sans">Input Features Vector (19 Dim)</h2>
          </div>
          <div className="space-y-1.5 text-[11px] font-mono text-slate-400">
            <div className="flex justify-between py-1 border-b border-slate-800/40">
              <span>recent_crime_count</span>
              <span className="text-white font-bold">Weight: 45%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/40">
              <span>day_of_week_sin_cos</span>
              <span className="text-white">Weight: 22%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/40">
              <span>hour_of_day_sin_cos</span>
              <span className="text-white">Weight: 14%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/40">
              <span>socioeconomic_SECC_index</span>
              <span className="text-slate-500">Weight: 8%</span>
            </div>
            <div className="flex justify-between py-1">
              <span>population_density_census</span>
              <span className="text-slate-500">Weight: 6%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Predictions grid results table */}
      <div className="bg-[#121624] border border-[#1e293b]/40 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-white">Grid Cells Forecasting Logs (T+48 Hours)</h2>
            <p className="text-xs text-slate-500">H3 resolution cells prediction scores mapped with model confidence coefficient</p>
          </div>
          <span className="text-[10px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full font-mono font-bold">
            Horizon: 48h
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono font-medium">
                <th className="py-3 px-4">H3 Cell index</th>
                <th className="py-3 px-4">Assigned district</th>
                <th className="py-3 px-4">Predictions Horizon</th>
                <th className="py-3 px-4">Risk Probability Index</th>
                <th className="py-3 px-4">Model Confidence</th>
                <th className="py-3 px-4">Top SHAP Attributions Factor</th>
                <th className="py-3 px-4 text-right">Action status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-slate-300">
              {mockPredictions.map((pred) => (
                <tr key={pred.id} className="hover:bg-slate-800/20 transition-all font-mono">
                  <td className="py-3 px-4 font-bold text-white">{pred.h3_index}</td>
                  <td className="py-3 px-4 font-sans font-medium text-slate-300">{pred.district}</td>
                  <td className="py-3 px-4 text-slate-500">T+48 Hours</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${
                        pred.risk_score > 0.8
                          ? 'text-red-400'
                          : pred.risk_score > 0.6
                          ? 'text-amber-400'
                          : 'text-blue-400'
                      }`}>
                        {Math.round(pred.risk_score * 100)}%
                      </span>
                      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          style={{ width: `${pred.risk_score * 100}%` }}
                          className={`h-full ${
                            pred.risk_score > 0.8
                              ? 'bg-red-500'
                              : pred.risk_score > 0.6
                              ? 'bg-amber-500'
                              : 'bg-blue-500'
                          }`} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-emerald-400">P = {pred.confidence * 100}%</td>
                  <td className="py-3 px-4 font-sans text-slate-400 max-w-[200px] truncate">
                    Recent Density (+{Math.round(pred.shap_values.recent_crime_density * 100)}%), Temporal (+{Math.round(pred.shap_values.day_of_week * 100)}%)
                  </td>
                  <td className="py-3 px-4 text-right font-sans">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full ${
                      pred.risk_score > 0.8
                        ? 'text-red-400 border-red-500/20 bg-red-500/5'
                        : 'text-slate-400'
                    }`}>
                      {pred.risk_score > 0.8 ? 'Patrol Pre-deployed' : 'Monitor'}
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
