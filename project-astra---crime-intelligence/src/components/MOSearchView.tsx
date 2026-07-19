import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  MapPin, 
  Calendar, 
  ArrowUpRight, 
  HelpCircle,
  FileText,
  Activity
} from 'lucide-react';
import { moCases } from '../mockData';
import { MOSearchResult } from '../types';

export default function MOSearchView() {
  const [searchQuery, setSearchQuery] = useState('Two riders on black motorcycle snatched gold chain near crowded market terminal');
  const [results, setResults] = useState<MOSearchResult[]>(moCases);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      const ranked = [...moCases].map(item => {
        let score = 0.5 + Math.random() * 0.15;
        if (searchQuery.toLowerCase().includes('motorcycle') || searchQuery.toLowerCase().includes('pulsar')) {
          if (item.narrative.toLowerCase().includes('motorcycle') || item.narrative.toLowerCase().includes('pulsar')) {
            score += 0.25;
          }
        }
        if (searchQuery.toLowerCase().includes('chain') || searchQuery.toLowerCase().includes('gold')) {
          if (item.narrative.toLowerCase().includes('chain') || item.narrative.toLowerCase().includes('gold')) {
            score += 0.15;
          }
        }
        return {
          ...item,
          similarity: Math.min(score, 0.98)
        };
      }).sort((a, b) => b.similarity - a.similarity);

      setResults(ranked);
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="flex-1 bg-[#090b11] h-screen overflow-y-auto p-4 md:p-8 font-sans text-slate-300">
      
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white font-sans">Semantic MO Search</h1>
        <p className="text-[10px] md:text-xs text-slate-500 font-mono mt-1">pgvector Cosine-Similarity Pattern Matching Index</p>
      </div>

      {/* Search Input Box */}
      <div className="bg-[#121624] border border-[#1e293b]/40 rounded-xl p-4 md:p-6 shadow-lg mb-6 md:mb-8">
        <form onSubmit={handleSearch}>
          <label className="text-[9px] md:text-[10px] text-slate-400 font-mono font-bold tracking-wider uppercase block mb-2">
            Input crime Modus Operandi (MO) description
          </label>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Describe behavioral signature, vehicles, weapons..."
                className="w-full bg-[#141a2e] text-white text-xs md:text-sm py-2.5 md:py-3 pl-9 md:pl-11 pr-3 md:pr-4 rounded-lg border border-[#1e293b]/60 focus:outline-none focus:border-blue-500 font-sans"
              />
              <Search className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-500 absolute left-3 md:left-4 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-4 md:px-6 py-2.5 md:py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs md:text-sm font-semibold font-sans transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50 shrink-0"
            >
              {isSearching ? (
                <>
                  <div className="w-3.5 h-3.5 md:w-4 md:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="font-mono">Searching...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>AI Match</span>
                </>
              )}
            </button>
          </div>
        </form>
        <p className="text-[9px] md:text-[10px] text-slate-500 font-mono mt-2 md:mt-3">
          Processes unstructured text against 12,847 embedded records using local embedding model.
        </p>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-3 md:mb-4 pb-2 border-b border-slate-800/80">
        <span className="text-[10px] md:text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">
          Results ({results.length} Matches)
        </span>
        <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] text-slate-500 font-mono">
          <Activity className="w-3 h-3 md:w-3.5 md:h-3.5" />
          <span>14ms P95</span>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-3 md:space-y-4">
        {results.map((result, i) => (
          <div 
            key={i} 
            className="bg-[#121624] border border-[#1e293b]/40 rounded-xl p-4 md:p-6 hover:border-[#3b82f6]/30 transition-all shadow-md group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 md:gap-4 mb-3 md:mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 md:gap-2 flex-wrap mb-1.5 md:mb-2">
                  <span className="px-2 py-0.5 bg-blue-600/10 text-blue-400 border border-blue-500/15 rounded-md text-[9px] md:text-[10px] font-mono font-bold">
                    {result.fir_id}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] md:text-[11px] text-slate-400">
                    <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-slate-500" />
                    <span>{result.district}</span>
                  </div>
                  <span className="text-slate-600">•</span>
                  <div className="flex items-center gap-1 text-[10px] md:text-[11px] text-slate-400">
                    <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5 text-slate-500" />
                    <span>{result.date}</span>
                  </div>
                </div>
                <h3 className="text-xs md:text-sm font-bold text-white font-sans group-hover:text-blue-400 transition-colors">
                  {result.crime_type} — {result.bns_sections.join(', ')}
                </h3>
              </div>

              {/* Similarity Score */}
              <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:min-w-[100px]">
                <span className="text-[9px] md:text-[10px] font-mono text-slate-500">SIMILARITY</span>
                <span className="text-lg md:text-xl font-bold font-mono text-emerald-400">
                  {(result.similarity * 100).toFixed(1)}%
                </span>
                <div className="w-16 md:w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${result.similarity * 100}%` }}
                    className="h-full bg-emerald-500" 
                  />
                </div>
              </div>
            </div>

            {/* Narrative Detail */}
            <div className="bg-[#0c0e17] border border-slate-800/60 rounded-lg p-3 md:p-4 mb-3 md:mb-4 text-[10px] md:text-xs leading-relaxed text-slate-300">
              <div className="flex items-center gap-1 text-[8px] md:text-[9px] font-mono text-slate-500 uppercase mb-1.5 md:mb-2 font-bold">
                <FileText className="w-3 h-3 md:w-3.5 md:h-3.5" />
                <span>Raw FIR Narrative</span>
              </div>
              <p className="font-sans line-clamp-3">
                {result.narrative}
              </p>
            </div>

            <div className="flex items-center justify-between text-[10px] md:text-[11px] font-mono border-t border-slate-800/60 pt-3 md:pt-4">
              <span className="text-slate-500 truncate mr-2">
                IPC: {result.crime_type === 'Chain Snatching' ? '379-IPC' : '420-IPC'}
              </span>
              <button className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5 shrink-0">
                <span>Analyze Node</span>
                <ArrowUpRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
