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
    <div className="flex-1 bg-[#090b11] h-screen overflow-y-auto p-4 md:p-8 font-sans text-slate-300">
      
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white font-sans">Spatio-Temporal Forecast Model</h1>
        <p className="text-[10px] md:text-xs text-slate-500 font-mono mt-1">STGCN (Spatio-Temporal Graph Convolutional Network) v1.02 Metrics</p>
      </div>

      {/* Model configuration description board card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        
        {/* Model Specs Card */}
        <div className="bg-[#121624] border border-[#1e293b]/40 rounded-xl p-4 md:p-5 shadow-md lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <Cpu className="w-4 h-4 md:w-5 md:h-5 text-blue-400 shrink-0" />
              <h2 className="text-xs md:text-sm font-bold text-white font-sans">Model Hyperparameters & Training Specs</h2>
            </div>
            
            <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed mb-3 md:mb-4">
              Our <strong>STGCN (Spatio-Temporal Graph Convolutional Network)</strong> trains on historical crime incident inputs mapped onto a non-Euclidean state road-network graph.
            </p>

            <div className="grid grid-cols-2 gap-2 md:gap-4 text-[10px] md:text-xs font-mono">
              <div className="bg-[#0c0e17] p-2 md:p-2.5 rounded-lg border border-slate-800">
                <span className="text-[9px] md:text-[10px] text-slate-500 uppercase block mb-0.5 md:mb-1">Epochs Run</span>
                <span className="text-white font-bold">100 (Early Stop)</span>
              </div>
              <div className="bg-[#0c0e17] p-2 md:p-2.5 rounded-lg border border-slate-800">
                <span className="text-[9px] md:text-[10px] text-slate-500 uppercase block mb-0.5 md:mb-1">Validation Loss</span>
                <span className="text-emerald-400 font-bold">0.082 MAE</span>
              </div>
              <div className="bg-[#0c0e17] p-2 md:p-2.5 rounded-lg border border-slate-800">
                <span className="text-[9px] md:text-[10px] text-slate-500 uppercase block mb-0.5 md:mb-1">Grid Indexing</span>
                <span className="text-white font-bold">H3 res-8</span>
              </div>
              <div className="bg-[#0c0e17] p-2 md:p-2.5 rounded-lg border border-slate-800">
                <span className="text-[9px] md:text-[10px] text-slate-500 uppercase block mb-0.5 md:mb-1">GNN Kernel</span>
                <span className="text-white font-bold">ChebConv (K=3)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] md:text-[11px] font-mono border-t border-slate-800/60 pt-3 md:pt-4 mt-3 md:mt-4">
            <span className="text-slate-500">Device: LOCAL CPU/GPU</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">100% AIR-GAPPED</span>
              <span className="sm:hidden">AIR-GAPPED</span>
            </span>
          </div>
        </div>

        {/* Feature Weights */}
        <div className="bg-[#121624] border border-[#1e293b]/40 rounded-xl p-4 md:p-5 shadow-md">
          <div className="flex items-center gap-2 mb-2 md:mb-3 pb-2 border-b border-slate-800">
            <Settings className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-500 shrink-0" />
            <h2 className="text-xs md:text-sm font-bold text-white font-sans">Input Features (19 Dim)</h2>
          </div>
          <div className="space-y-1 md:space-y-1.5 text-[10px] md:text-[11px] font-mono text-slate-400">
            <div className="flex justify-between py-1 border-b border-slate-800/40">
              <span className="truncate mr-2">crime_count</span>
              <span className="text-white font-bold shrink-0">45%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/40">
              <span className="truncate mr-2">day_sin_cos</span>
              <span className="text-white shrink-0">22%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/40">
              <span className="truncate mr-2">hour_sin_cos</span>
              <span className="text-white shrink-0">14%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/40">
              <span className="truncate mr-2">SECC_index</span>
              <span className="text-slate-500 shrink-0">8%</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="truncate mr-2">pop_density</span>
              <span className="text-slate-500 shrink-0">6%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Predictions grid results table */}
      <div className="bg-[#121624] border border-[#1e293b]/40 rounded-xl p-4 md:p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4 md:mb-6 pb-2 border-b border-slate-800">
          <div className="min-w-0">
            <h2 className="text-xs md:text-sm font-bold text-white">Grid Cells Forecasting (T+48h)</h2>
            <p className="text-[10px] md:text-xs text-slate-500 hidden sm:block">H3 resolution cells prediction scores with model confidence</p>
          </div>
          <span className="text-[9px] md:text-[10px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full font-mono font-bold shrink-0 ml-2">
            48h
          </span>
        </div>

        <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
          <table className="w-full text-left text-[10px] md:text-xs border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono font-medium">
                <th className="py-2.5 md:py-3 px-3 md:px-4">H3 Cell</th>
                <th className="py-2.5 md:py-3 px-3 md:px-4">District</th>
                <th className="py-2.5 md:py-3 px-3 md:px-4 hidden sm:table-cell">Horizon</th>
                <th className="py-2.5 md:py-3 px-3 md:px-4">Risk Score</th>
                <th className="py-2.5 md:py-3 px-3 md:px-4">Confidence</th>
                <th className="py-2.5 md:py-3 px-3 md:px-4 hidden md:table-cell">Top SHAP Factor</th>
                <th className="py-2.5 md:py-3 px-3 md:px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-slate-300">
              {mockPredictions.map((pred) => (
                <tr key={pred.id} className="hover:bg-slate-800/20 transition-all font-mono">
                  <td className="py-2.5 md:py-3 px-3 md:px-4 font-bold text-white truncate max-w-[100px]">{pred.h3_index}</td>
                  <td className="py-2.5 md:py-3 px-3 md:px-4 font-sans font-medium text-slate-300">{pred.district}</td>
                  <td className="py-2.5 md:py-3 px-3 md:px-4 text-slate-500 hidden sm:table-cell">T+48h</td>
                  <td className="py-2.5 md:py-3 px-3 md:px-4">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <span className={`text-[10px] md:text-xs font-bold ${
                        pred.risk_score > 0.8
                          ? 'text-red-400'
                          : pred.risk_score > 0.6
                          ? 'text-amber-400'
                          : 'text-blue-400'
                      }`}>
                        {Math.round(pred.risk_score * 100)}%
                      </span>
                      <div className="w-12 md:w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
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
                  <td className="py-2.5 md:py-3 px-3 md:px-4 text-emerald-400">{pred.confidence * 100}%</td>
                  <td className="py-2.5 md:py-3 px-3 md:px-4 font-sans text-slate-400 max-w-[150px] md:max-w-[200px] truncate hidden md:table-cell">
                    Recent Density (+{Math.round(pred.shap_values.recent_crime_density * 100)}%), Temporal (+{Math.round(pred.shap_values.day_of_week * 100)}%)
                  </td>
                  <td className="py-2.5 md:py-3 px-3 md:px-4 text-right font-sans">
                    <span className={`inline-flex items-center gap-1 text-[9px] md:text-[10px] font-semibold bg-slate-900 border border-slate-800 px-1.5 md:px-2 py-0.5 rounded-full ${
                      pred.risk_score > 0.8
                        ? 'text-red-400 border-red-500/20 bg-red-500/5'
                        : 'text-slate-400'
                    }`}>
                      {pred.risk_score > 0.8 ? 'Deploy' : 'Monitor'}
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
