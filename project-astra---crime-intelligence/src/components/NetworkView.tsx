import React, { useState } from 'react';
import { 
  Share2, 
  Search, 
  User, 
  MapPin, 
  Car, 
  FileText, 
  ArrowUpRight, 
  Activity, 
  Lock, 
  CheckCircle,
  AlertTriangle,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { POLENode, POLEEdge } from '../types';
import { mockNodes, mockEdges } from '../mockData';

export default function NetworkView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedNode, setSelectedNode] = useState<POLENode | null>(mockNodes[0]); // default first
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  const [physicsOffset, setPhysicsOffset] = useState({ x: 0, y: 0 });

  // Filter nodes based on queries & type
  const filteredNodes = mockNodes.filter((node) => {
    const matchesSearch = node.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (node.properties.name && node.properties.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (node.properties.aliases && node.properties.aliases.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesType = selectedType === 'ALL' || node.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Expand node behavior simulation
  const handleExpandNode = (nodeId: string) => {
    if (expandedNodes.includes(nodeId)) {
      setExpandedNodes(expandedNodes.filter(id => id !== nodeId));
    } else {
      setExpandedNodes([...expandedNodes, nodeId]);
    }
  };

  // Node background styling colors
  const nodeStyles = {
    PERSON: { bg: 'bg-blue-600/15 text-blue-400 border-blue-500/50', icon: User },
    LOCATION: { bg: 'bg-emerald-600/15 text-emerald-400 border-emerald-500/50', icon: MapPin },
    OBJECT: { bg: 'bg-slate-700/20 text-slate-400 border-slate-600/40', icon: Car },
    EVENT: { bg: 'bg-amber-600/15 text-amber-400 border-amber-500/50', icon: FileText }
  };

  return (
    <div className="flex-1 bg-[#090b11] h-screen flex flex-col font-sans text-slate-300 overflow-hidden relative">
      
      {/* Network control header */}
      <div className="h-16 bg-[#0c0e17] border-b border-[#1e293b]/40 px-6 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-400" />
            <h1 className="text-base font-bold text-white font-sans">POLE Network</h1>
          </div>
          <span className="text-xs text-slate-500">|</span>
          <p className="text-xs text-slate-500 font-mono">CrimeGAT Link Association Graph</p>
        </div>

        {/* Entity search query filter */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search suspect, plate, place..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#141a2e] text-slate-200 text-xs py-1.5 pl-8 pr-3 rounded-lg border border-[#1e293b]/60 focus:outline-none focus:border-blue-500 font-sans w-52"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Graph Canvas (Interactive) */}
        <div className="flex-1 bg-[#07090e] relative flex items-center justify-center p-8 select-none overflow-hidden">
          
          {/* Zoom & Canvas controls overlay */}
          <div className="absolute top-6 left-6 flex items-center gap-1.5 p-1.5 bg-[#0c0e17] border border-slate-800 rounded-lg z-10 shadow-md">
            <button 
              onClick={() => setPhysicsOffset({ x: physicsOffset.x - 30, y: physicsOffset.y })}
              className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
            >
              ←
            </button>
            <button 
              onClick={() => setPhysicsOffset({ x: physicsOffset.x, y: physicsOffset.y - 30 })}
              className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
            >
              ↑
            </button>
            <button 
              onClick={() => setPhysicsOffset({ x: physicsOffset.x, y: physicsOffset.y + 30 })}
              className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
            >
              ↓
            </button>
            <button 
              onClick={() => setPhysicsOffset({ x: physicsOffset.x + 30, y: physicsOffset.y })}
              className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
            >
              →
            </button>
            <span className="w-px h-4 bg-slate-800" />
            <button 
              onClick={() => setPhysicsOffset({ x: 0, y: 0 })}
              className="px-2 py-0.5 text-[10px] font-mono text-slate-400 hover:text-white hover:bg-slate-800 rounded"
            >
              Recenter
            </button>
          </div>

          {/* Node Category Filters precisely styled like tabs */}
          <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-[#0c0e17] p-1 rounded-lg border border-[#1e293b]/50 z-10">
            {['ALL', 'PERSON', 'LOCATION', 'OBJECT', 'EVENT'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1 text-[10px] font-mono rounded-md font-bold uppercase transition-all ${
                  selectedType === t
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
                }`}
              >
                {t === 'ALL' ? 'All' : t}
              </button>
            ))}
          </div>

          {/* Visual Canvas Mesh Background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
            <div className="w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>

          {/* POLE Nodes Relationship visual representation */}
          <div 
            className="relative w-full h-full flex items-center justify-center transition-all duration-300"
            style={{ transform: `translate(${physicsOffset.x}px, ${physicsOffset.y}px)` }}
          >
            {/* Displaying relationships SVG background canvas to render connecting vectors (both solid and CrimeGAT predicted) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e293b" />
                </marker>
                <marker id="arrow-predicted" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#8b5cf6" opacity="0.6" />
                </marker>
              </defs>

              {/* Render connecting vectors/lines mathematically centered */}
              {mockEdges.map((edge) => {
                const sourceNode = mockNodes.find(n => n.id === edge.source);
                const targetNode = mockNodes.find(n => n.id === edge.target);
                if (!sourceNode || !targetNode) return null;

                // Simple simulated circular layout coordinates based on node placement
                const getCoords = (id: string) => {
                  const idx = mockNodes.findIndex(n => n.id === id);
                  const angle = (idx / mockNodes.length) * 2 * Math.PI;
                  const radius = 220;
                  return {
                    x: 400 + Math.cos(angle) * radius,
                    y: 300 + Math.sin(angle) * radius
                  };
                };

                const start = getCoords(edge.source);
                const end = getCoords(edge.target);

                return (
                  <g key={edge.id} className="opacity-70">
                    <line
                      x1={start.x}
                      y1={start.y}
                      x2={end.x}
                      y2={end.y}
                      stroke={edge.predicted ? '#a78bfa' : '#334155'}
                      strokeWidth={edge.predicted ? 2 : 1.5}
                      strokeDasharray={edge.predicted ? "5,5" : "none"}
                      markerEnd={edge.predicted ? "url(#arrow-predicted)" : "url(#arrow)"}
                    />
                    {edge.predicted && (
                      <g>
                        <rect
                          x={(start.x + end.x) / 2 - 25}
                          y={(start.y + end.y) / 2 - 10}
                          width="50"
                          height="20"
                          rx="4"
                          fill="#0c0e17"
                          stroke="#a78bfa"
                          strokeWidth="1"
                        />
                        <text
                          x={(start.x + end.x) / 2}
                          y={(start.y + end.y) / 2 + 4}
                          fill="#a78bfa"
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {Math.round(edge.weight * 100)}%
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Nodes Layout on top of vectors */}
            {filteredNodes.map((node, idx) => {
              const angle = (mockNodes.findIndex(n => n.id === node.id) / mockNodes.length) * 2 * Math.PI;
              const radius = 220;
              const x = 400 + Math.cos(angle) * radius;
              const y = 300 + Math.sin(angle) * radius;

              const style = nodeStyles[node.type];
              const Icon = style.icon;
              const isSelected = selectedNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{ left: `${x}px`, top: `${y}px` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-all duration-200 ${
                    isSelected ? 'scale-110' : 'hover:scale-105'
                  }`}
                >
                  <div className={`flex flex-col items-center`}>
                    <div className={`p-3 rounded-xl border-2 shadow-xl ${style.bg} ${
                      isSelected ? 'ring-4 ring-blue-500/30 border-blue-400 scale-105' : ''
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <span className="mt-1.5 px-2 py-0.5 rounded-md bg-[#0a0d14]/90 border border-slate-800 text-[10px] font-semibold text-slate-300 font-sans tracking-tight max-w-[120px] truncate">
                      {node.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend indicator explaining GAT predicted vs historical links */}
          <div className="absolute bottom-6 left-6 p-4 bg-[#0c0e17] border border-slate-800 rounded-lg shadow-xl z-10 w-52 font-sans">
            <span className="text-[9px] font-bold text-slate-400 font-mono tracking-wider uppercase block mb-2">Graph Legend</span>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 bg-slate-500 inline-block" />
                <span className="text-slate-400 font-mono text-[11px]">Confirmed Relationship</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 border-t-2 border-dashed border-[#a78bfa] inline-block" />
                <span className="text-[#a78bfa] font-mono text-[11px] font-semibold flex items-center gap-1">
                  CrimeGAT Association
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Node Properties side drawer panel */}
        {selectedNode && (
          <div className="w-80 bg-[#0c0e17] border-l border-[#1e293b]/50 h-full overflow-y-auto p-6 flex flex-col z-10 shadow-2xl relative font-sans">
            <div className="pb-4 border-b border-slate-800/80 mb-5">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded-full uppercase ${
                  nodeStyles[selectedNode.type].bg
                }`}>
                  {selectedNode.type}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  DEGREE CENTRALITY: {selectedNode.degree}
                </span>
              </div>
              <h3 className="text-base font-bold text-white leading-tight">
                {selectedNode.label}
              </h3>
              {selectedNode.properties.aliases && selectedNode.properties.aliases.length > 0 && (
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Aliases: {selectedNode.properties.aliases.join(', ')}
                </p>
              )}
            </div>

            {/* Properties List */}
            <div className="flex-1 space-y-4 text-xs">
              {/* If PERSON */}
              {selectedNode.type === 'PERSON' && (
                <div className="space-y-3.5">
                  {selectedNode.properties.offender_score !== undefined && (
                    <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-3 text-center">
                      <span className="text-[10px] font-mono text-red-400 block tracking-wider uppercase font-bold mb-0.5">Composite Offender Score</span>
                      <span className="text-3xl font-extrabold text-white font-mono">
                        {Math.round(selectedNode.properties.offender_score * 100)}%
                      </span>
                    </div>
                  )}
                  {selectedNode.properties.address && (
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase block mb-0.5">Primary Residence</span>
                      <span className="text-slate-300 leading-relaxed font-sans">{selectedNode.properties.address}</span>
                    </div>
                  )}
                  {selectedNode.properties.district && (
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase block mb-0.5">Assigned District</span>
                      <span className="text-slate-300 font-sans">{selectedNode.properties.district}</span>
                    </div>
                  )}
                </div>
              )}

              {/* If VEHICLE OBJECT */}
              {selectedNode.type === 'OBJECT' && (
                <div className="space-y-3.5">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-0.5">Registration Number</span>
                    <span className="text-slate-300 font-mono font-bold text-sm bg-slate-900 border border-slate-800 px-2 py-0.5 rounded inline-block">{selectedNode.properties.reg_number}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-0.5">Vehicle Model</span>
                    <span className="text-slate-300 font-sans">{selectedNode.properties.make} {selectedNode.properties.model} ({selectedNode.properties.color})</span>
                  </div>
                </div>
              )}

              {/* If LOCATION */}
              {selectedNode.type === 'LOCATION' && (
                <div className="space-y-3.5">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-0.5">Geocoded Coordinates</span>
                    <span className="text-slate-300 font-mono">{selectedNode.properties.lat?.toFixed(5)}, {selectedNode.properties.lon?.toFixed(5)}</span>
                  </div>
                  {selectedNode.properties.h3_index && (
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase block mb-0.5">H3 Grid Hex Index</span>
                      <span className="text-slate-300 font-mono font-bold bg-slate-900 border border-slate-800 px-2 py-0.5 rounded inline-block">{selectedNode.properties.h3_index}</span>
                    </div>
                  )}
                </div>
              )}

              {/* If EVENT */}
              {selectedNode.type === 'EVENT' && (
                <div className="space-y-3.5">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-0.5">Incident Date</span>
                    <span className="text-slate-300 font-sans">{selectedNode.properties.date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-0.5">Statute Classifications</span>
                    <span className="text-blue-400 font-mono block mt-0.5 font-semibold">{selectedNode.properties.bns_sections?.join(', ')}</span>
                  </div>
                </div>
              )}

              {/* CrimeGAT link predictions supporting evidence */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-1.5 text-[#a78bfa] mb-2">
                  <Lock className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase">CrimeGAT Inference</span>
                </div>
                
                {/* Find edges linking to this selected node */}
                {mockEdges.filter(e => e.predicted && (e.source === selectedNode.id || e.target === selectedNode.id)).length > 0 ? (
                  <div className="space-y-2 bg-[#14182b] rounded-lg p-3 border border-purple-500/10">
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      AI Graph models predicted a high probability linking this suspect to crime rings based on shared behavioral locations:
                    </p>
                    <div className="space-y-1.5 pt-1 border-t border-slate-800">
                      {mockEdges.filter(e => e.predicted && (e.source === selectedNode.id || e.target === selectedNode.id)).map((edge, i) => {
                        const targetNode = mockNodes.find(n => n.id === (edge.source === selectedNode.id ? edge.target : edge.source));
                        return (
                          <div key={i} className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-200 font-medium">Link with {targetNode?.label}</span>
                            <span className="text-[#a78bfa] font-mono font-bold">P = {Math.round(edge.weight * 100)}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-500 leading-relaxed font-mono">
                    No predicted GAT links matching high risk thresholds. No criminal association anomalies flagged.
                  </p>
                )}
              </div>
            </div>

            {/* Action buttons footer */}
            <div className="pt-6 border-t border-slate-800/80 flex items-center gap-2">
              <button 
                onClick={() => handleExpandNode(selectedNode.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold font-sans transition-all shadow-lg shadow-blue-500/20"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{expandedNodes.includes(selectedNode.id) ? 'Collapse Hop' : 'Expand Network'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
