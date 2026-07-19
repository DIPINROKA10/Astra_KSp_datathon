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
    // Simulate vector search database query delay
    setTimeout(() => {
      // Re-rank results with slight random offsets to simulate semantic searching
      const ranked = [...moCases].map(item => {
        // Calculate dynamic similarity based on keyword overlap
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
    <div className="flex-1 bg-[#090b11] h-screen overflow-y-auto p-8 font-sans text-slate-300">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white font-sans">Semantic MO Search</h1>
        <p className="text-xs text-slate-500 font-mono mt-1">pgvector Cosine-Similarity Pattern Matching Index</p>
      </div>

      {/* Search Input Box */}
      <div className="bg-[#121624] border border-[#1e293b]/40 rounded-xl p-6 shadow-lg mb-8">
        <form onSubmit={handleSearch}>
          <label className="text-[10px] text-slate-400 font-mono font-bold tracking-wider uppercase block mb-2">
            Input crime Modus Operandi (MO) description
          </label>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Describe behavioral signature, vehicles, weapons, or suspect traits in plain English..."
                className="w-full bg-[#141a2e] text-white text-sm py-3 pl-11 pr-4 rounded-lg border border-[#1e293b]/60 focus:outline-none focus:border-blue-500 font-sans"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold font-sans transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50"
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="font-mono">Searching Index...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Execute AI Match</span>
                </>
              )}
            </button>
          </div>
        </form>
        <p className="text-[10px] text-slate-500 font-mono mt-3">
          Note: This system query processes unstructured text against 12,847 embedded records using local 'nomic-embed-text' model weights.
        </p>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/80">
        <span className="text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">
          Similarity Results ({results.length} Matches)
        </span>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
          <Activity className="w-3.5 h-3.5" />
          <span>Vector lookup took 14ms (P95)</span>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {results.map((result, i) => (
          <div 
            key={i} 
            className="bg-[#121624] border border-[#1e293b]/40 rounded-xl p-6 hover:border-[#3b82f6]/30 transition-all shadow-md group"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="px-2.5 py-0.5 bg-blue-600/10 text-blue-400 border border-blue-500/15 rounded-md text-[10px] font-mono font-bold">
                    {result.fir_id}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{result.district}</span>
                  </div>
                  <span className="text-slate-600">•</span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{result.date}</span>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-white font-sans group-hover:text-blue-400 transition-colors">
                  {result.crime_type} — {result.bns_sections.join(', ')}
                </h3>
              </div>

              {/* Similarity Score bar dial */}
              <div className="flex flex-col items-end min-w-[120px]">
                <span className="text-[10px] font-mono text-slate-500 block">SIMILARITY SCORE</span>
                <span className="text-xl font-bold font-mono text-emerald-400">
                  {(result.similarity * 100).toFixed(1)}%
                </span>
                <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1.5">
                  <div 
                    style={{ width: `${result.similarity * 100}%` }}
                    className="h-full bg-emerald-500" 
                  />
                </div>
              </div>
            </div>

            {/* Narrative Detail */}
            <div className="bg-[#0c0e17] border border-slate-800/60 rounded-lg p-4 mb-4 text-xs leading-relaxed text-slate-300">
              <div className="flex items-center gap-1 text-[9px] font-mono text-slate-500 uppercase mb-2 font-bold">
                <FileText className="w-3.5 h-3.5" />
                <span>Raw FIR Narrative excerpt</span>
              </div>
              <p className="font-sans">
                {result.narrative}
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono border-t border-slate-800/60 pt-4">
              <span className="text-slate-500">
                Mapped equivalent under IPC: {result.crime_type === 'Chain Snatching' ? '379-IPC' : '420-IPC'}
              </span>
              <div className="flex items-center gap-3">
                <button className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5">
                  <span>Analyze Network Node</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
