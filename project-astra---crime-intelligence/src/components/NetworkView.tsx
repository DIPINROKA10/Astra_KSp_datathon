import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Share2, 
  Search, 
  User, 
  MapPin, 
  Car, 
  FileText, 
  ArrowUpRight, 
  Lock, 
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronUp
} from 'lucide-react';
import { POLENode, POLEEdge } from '../types';
import { mockNodes, mockEdges } from '../mockData';

export default function NetworkView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedNode, setSelectedNode] = useState<POLENode | null>(mockNodes[0]);
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ w: 800, h: 600 });

  const filteredNodes = mockNodes.filter((node) => {
    const matchesSearch = node.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (node.properties.name && node.properties.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (node.properties.aliases && node.properties.aliases.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesType = selectedType === 'ALL' || node.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleExpandNode = (nodeId: string) => {
    setExpandedNodes(prev => prev.includes(nodeId) ? prev.filter(id => id !== nodeId) : [...prev, nodeId]);
  };

  const nodeStyles = {
    PERSON: { bg: 'bg-blue-600/15 text-blue-400 border-blue-500/50', icon: User },
    LOCATION: { bg: 'bg-emerald-600/15 text-emerald-400 border-emerald-500/50', icon: MapPin },
    OBJECT: { bg: 'bg-slate-700/20 text-slate-400 border-slate-600/40', icon: Car },
    EVENT: { bg: 'bg-amber-600/15 text-amber-400 border-amber-500/50', icon: FileText }
  };

  // Measure canvas container
  useEffect(() => {
    if (!canvasRef.current) return;
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setCanvasSize({ w: width, h: height });
    });
    ro.observe(canvasRef.current);
    return () => ro.disconnect();
  }, []);

  // Compute node positions relative to container
  const getNodePosition = useCallback((nodeId: string) => {
    const idx = mockNodes.findIndex(n => n.id === nodeId);
    if (idx === -1) return { x: 0, y: 0 };
    const angle = (idx / mockNodes.length) * 2 * Math.PI - Math.PI / 2;
    const minDim = Math.min(canvasSize.w, canvasSize.h);
    const radius = (minDim * 0.35) * scale;
    return {
      x: canvasSize.w / 2 + Math.cos(angle) * radius,
      y: canvasSize.h / 2 + Math.sin(angle) * radius
    };
  }, [canvasSize, scale]);

  // Touch drag support
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, offsetX: 0, offsetY: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('[data-node]')) return;
    dragRef.current = { dragging: true, startX: e.clientX, startY: e.clientY, offsetX: offset.x, offsetY: offset.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setOffset({ x: dragRef.current.offsetX + dx, y: dragRef.current.offsetY + dy });
  };

  const handlePointerUp = () => {
    dragRef.current.dragging = false;
  };

  // Zoom via buttons
  const zoomIn = () => setScale(s => Math.min(s + 0.15, 2.5));
  const zoomOut = () => setScale(s => Math.max(s - 0.15, 0.4));
  const resetView = () => { setScale(1); setOffset({ x: 0, y: 0 }); };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.08 : 0.08;
    setScale(s => Math.min(Math.max(s + delta, 0.4), 2.5));
  };

  const handleNodeClick = (node: POLENode) => {
    setSelectedNode(node);
    setShowMobileDetails(true);
  };

  const closeMobileDetails = () => {
    setShowMobileDetails(false);
    setSelectedNode(null);
  };

  return (
    <div className="flex-1 bg-[#090b11] h-screen flex flex-col font-sans text-slate-300 overflow-hidden relative">
      
      {/* Header */}
      <div className="h-14 md:h-16 bg-[#0c0e17] border-b border-[#1e293b]/40 px-3 md:px-6 flex items-center justify-between gap-3 shrink-0 z-10">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400 shrink-0" />
            <h1 className="text-sm md:text-base font-bold text-white font-sans">POLE Network</h1>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">|</span>
          <p className="text-[10px] md:text-xs text-slate-500 font-mono hidden sm:block truncate">CrimeGAT Link Association Graph</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#141a2e] text-slate-200 text-xs py-1.5 pl-8 pr-3 rounded-lg border border-[#1e293b]/60 focus:outline-none focus:border-blue-500 font-sans w-32 md:w-52"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Graph canvas */}
        <div 
          ref={canvasRef}
          className="flex-1 bg-[#07090e] relative overflow-hidden touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
        >
          {/* Category filter pills */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 md:top-4 flex items-center gap-0.5 md:gap-1 bg-[#0c0e17] p-0.5 md:p-1 rounded-lg border border-[#1e293b]/50 z-10">
            {['ALL', 'PERSON', 'LOCATION', 'OBJECT', 'EVENT'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-1.5 md:px-3 py-0.5 md:py-1 text-[8px] md:text-[10px] font-mono rounded-md font-bold uppercase transition-all whitespace-nowrap ${
                  selectedType === t
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
                }`}
              >
                {t === 'ALL' ? 'All' : t}
              </button>
            ))}
          </div>

          {/* Zoom controls - bottom right on mobile */}
          <div className="absolute bottom-3 right-3 md:bottom-6 md:right-6 flex flex-col items-center gap-1 bg-[#0c0e17] border border-slate-800 rounded-lg z-10 shadow-md p-1">
            <button onClick={zoomIn} className="p-1.5 md:p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
              <ZoomIn className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
            <span className="text-[8px] font-mono text-slate-500">{Math.round(scale * 100)}%</span>
            <button onClick={zoomOut} className="p-1.5 md:p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
              <ZoomOut className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
            <div className="w-4 h-px bg-slate-800" />
            <button onClick={resetView} className="p-1.5 md:p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
              <RotateCcw className="w-3 h-3 md:w-3.5 md:h-3.5" />
            </button>
          </div>

          {/* Legend - bottom left */}
          <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 p-2.5 md:p-3 bg-[#0c0e17] border border-slate-800 rounded-lg shadow-xl z-10 font-sans">
            <span className="text-[7px] md:text-[9px] font-bold text-slate-400 font-mono tracking-wider uppercase block mb-1.5">Legend</span>
            <div className="space-y-1 text-[9px] md:text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-slate-500 inline-block" />
                <span className="text-slate-400 font-mono">Confirmed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 border-t-2 border-dashed border-[#a78bfa] inline-block" />
                <span className="text-[#a78bfa] font-mono font-semibold">CrimeGAT</span>
              </div>
            </div>
          </div>

          {/* Transformed graph content */}
          <div 
            className="absolute inset-0 transition-transform duration-100"
            style={{ 
              transform: `translate(${offset.x}px, ${offset.y}px)`,
              transformOrigin: 'center center'
            }}
          >
            {/* Grid background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
              <div className="w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>

            {/* SVG edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e293b" />
                </marker>
                <marker id="arrow-predicted" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#8b5cf6" opacity="0.6" />
                </marker>
              </defs>

              {mockEdges.map((edge) => {
                const sourceNode = mockNodes.find(n => n.id === edge.source);
                const targetNode = mockNodes.find(n => n.id === edge.target);
                if (!sourceNode || !targetNode) return null;
                if (filteredNodes.length < mockNodes.length) {
                  if (!filteredNodes.find(n => n.id === edge.source) || !filteredNodes.find(n => n.id === edge.target)) return null;
                }

                const start = getNodePosition(edge.source);
                const end = getNodePosition(edge.target);

                return (
                  <g key={edge.id} className="opacity-70">
                    <line
                      x1={start.x} y1={start.y} x2={end.x} y2={end.y}
                      stroke={edge.predicted ? '#a78bfa' : '#334155'}
                      strokeWidth={edge.predicted ? 2 : 1.5}
                      strokeDasharray={edge.predicted ? "5,5" : "none"}
                      markerEnd={edge.predicted ? "url(#arrow-predicted)" : "url(#arrow)"}
                    />
                    {edge.predicted && (
                      <g>
                        <rect
                          x={(start.x + end.x) / 2 - 22}
                          y={(start.y + end.y) / 2 - 9}
                          width="44" height="18" rx="4"
                          fill="#0c0e17" stroke="#a78bfa" strokeWidth="1"
                        />
                        <text
                          x={(start.x + end.x) / 2}
                          y={(start.y + end.y) / 2 + 4}
                          fill="#a78bfa" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle"
                        >
                          {Math.round(edge.weight * 100)}%
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Nodes */}
            {filteredNodes.map((node) => {
              const pos = getNodePosition(node.id);
              const style = nodeStyles[node.type];
              const Icon = style.icon;
              const isSelected = selectedNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  data-node
                  onPointerDown={(e) => { e.stopPropagation(); }}
                  onClick={(e) => { e.stopPropagation(); handleNodeClick(node); }}
                  style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-all duration-200 ${
                    isSelected ? 'scale-110' : 'active:scale-95'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className={`p-2 md:p-2.5 rounded-xl border-2 shadow-xl ${style.bg} ${
                      isSelected ? 'ring-3 md:ring-4 ring-blue-500/30 border-blue-400' : ''
                    }`}>
                      <Icon className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <span className="mt-1 px-1.5 py-0.5 rounded-md bg-[#0a0d14]/90 border border-slate-800 text-[7px] md:text-[10px] font-semibold text-slate-300 font-sans tracking-tight max-w-[70px] md:max-w-[110px] truncate">
                      {node.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Drag hint on mobile */}
          <div className="absolute top-12 md:hidden left-1/2 -translate-x-1/2 text-[8px] text-slate-600 font-mono z-10 pointer-events-none">
            drag to pan • pinch to zoom
          </div>
        </div>

        {/* Desktop: Node detail side panel */}
        {selectedNode && !showMobileDetails && (
          <div className="hidden md:flex w-80 bg-[#0c0e17] border-l border-[#1e293b]/50 h-full overflow-y-auto p-6 flex-col shrink-0 shadow-2xl">
            <NodeDetailPanel 
              node={selectedNode} 
              onClose={() => setSelectedNode(null)} 
              onExpand={handleExpandNode}
              expandedNodes={expandedNodes}
              nodeStyles={nodeStyles}
              showClose={false}
            />
          </div>
        )}

        {/* Mobile: Bottom sheet detail panel */}
        {selectedNode && showMobileDetails && (
          <>
            <div 
              className="md:hidden fixed inset-0 bg-black/50 z-30"
              onClick={closeMobileDetails}
            />
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0e17] border-t border-[#1e293b]/50 rounded-t-2xl max-h-[70vh] flex flex-col shadow-2xl animate-slide-up">
              {/* Drag handle */}
              <div className="flex justify-center pt-2 pb-1 cursor-pointer" onClick={closeMobileDetails}>
                <div className="w-10 h-1 bg-slate-600 rounded-full" />
              </div>
              <div className="overflow-y-auto flex-1 p-4 pt-2">
                <NodeDetailPanel 
                  node={selectedNode} 
                  onClose={closeMobileDetails} 
                  onExpand={handleExpandNode}
                  expandedNodes={expandedNodes}
                  nodeStyles={nodeStyles}
                  showClose={true}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function NodeDetailPanel({ 
  node, onClose, onExpand, expandedNodes, nodeStyles, showClose 
}: { 
  node: POLENode;
  onClose: () => void;
  onExpand: (id: string) => void;
  expandedNodes: string[];
  nodeStyles: any;
  showClose: boolean;
}) {
  return (
    <>
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded-full uppercase ${nodeStyles[node.type].bg}`}>
            {node.type}
          </span>
          <span className="text-[10px] font-mono text-slate-500">DEG: {node.degree}</span>
        </div>
        {showClose && (
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="mb-3">
        <h3 className="text-sm md:text-base font-bold text-white leading-tight">{node.label}</h3>
        {node.properties.aliases && node.properties.aliases.length > 0 && (
          <p className="text-[10px] md:text-xs text-slate-500 font-mono mt-1">
            Aliases: {node.properties.aliases.join(', ')}
          </p>
        )}
      </div>

      <div className="flex-1 space-y-3 text-[10px] md:text-xs">
        {node.type === 'PERSON' && (
          <div className="space-y-3">
            {node.properties.offender_score !== undefined && (
              <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-3 text-center">
                <span className="text-[9px] font-mono text-red-400 block tracking-wider uppercase font-bold mb-0.5">Offender Score</span>
                <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">
                  {Math.round(node.properties.offender_score * 100)}%
                </span>
              </div>
            )}
            {node.properties.address && (
              <div>
                <span className="text-[9px] font-mono text-slate-500 uppercase block mb-0.5">Residence</span>
                <span className="text-slate-300 leading-relaxed font-sans">{node.properties.address}</span>
              </div>
            )}
            {node.properties.district && (
              <div>
                <span className="text-[9px] font-mono text-slate-500 uppercase block mb-0.5">District</span>
                <span className="text-slate-300 font-sans">{node.properties.district}</span>
              </div>
            )}
          </div>
        )}

        {node.type === 'OBJECT' && (
          <div className="space-y-3">
            <div>
              <span className="text-[9px] font-mono text-slate-500 uppercase block mb-0.5">Registration</span>
              <span className="text-slate-300 font-mono font-bold text-xs bg-slate-900 border border-slate-800 px-2 py-0.5 rounded inline-block">{node.properties.reg_number}</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-slate-500 uppercase block mb-0.5">Vehicle</span>
              <span className="text-slate-300 font-sans">{node.properties.make} {node.properties.model} ({node.properties.color})</span>
            </div>
          </div>
        )}

        {node.type === 'LOCATION' && (
          <div className="space-y-3">
            <div>
              <span className="text-[9px] font-mono text-slate-500 uppercase block mb-0.5">Coordinates</span>
              <span className="text-slate-300 font-mono text-[10px]">{node.properties.lat?.toFixed(5)}, {node.properties.lon?.toFixed(5)}</span>
            </div>
            {node.properties.h3_index && (
              <div>
                <span className="text-[9px] font-mono text-slate-500 uppercase block mb-0.5">H3 Index</span>
                <span className="text-slate-300 font-mono font-bold bg-slate-900 border border-slate-800 px-2 py-0.5 rounded inline-block text-[10px]">{node.properties.h3_index}</span>
              </div>
            )}
          </div>
        )}

        {node.type === 'EVENT' && (
          <div className="space-y-3">
            <div>
              <span className="text-[9px] font-mono text-slate-500 uppercase block mb-0.5">Date</span>
              <span className="text-slate-300 font-sans">{node.properties.date}</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-slate-500 uppercase block mb-0.5">BNS Sections</span>
              <span className="text-blue-400 font-mono block font-semibold">{node.properties.bns_sections?.join(', ')}</span>
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 text-[#a78bfa] mb-2">
            <Lock className="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span className="text-[9px] font-mono font-bold tracking-wider uppercase">CrimeGAT Inference</span>
          </div>
          
          {mockEdges.filter(e => e.predicted && (e.source === node.id || e.target === node.id)).length > 0 ? (
            <div className="space-y-2 bg-[#14182b] rounded-lg p-3 border border-purple-500/10">
              <p className="text-[10px] text-slate-400 leading-relaxed">
                AI predicted high probability links:
              </p>
              <div className="space-y-1.5 pt-1 border-t border-slate-800">
                {mockEdges.filter(e => e.predicted && (e.source === node.id || e.target === node.id)).map((edge, i) => {
                  const targetNode = mockNodes.find(n => n.id === (edge.source === node.id ? edge.target : edge.source));
                  return (
                    <div key={i} className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-200 font-medium truncate mr-2">→ {targetNode?.label}</span>
                      <span className="text-[#a78bfa] font-mono font-bold shrink-0">{Math.round(edge.weight * 100)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-[9px] text-slate-500 leading-relaxed font-mono">
              No high-risk GAT links detected.
            </p>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800/80 mt-4">
        <button 
          onClick={() => onExpand(node.id)}
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold font-sans transition-all shadow-lg shadow-blue-500/20"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>{expandedNodes.includes(node.id) ? 'Collapse' : 'Expand Network'}</span>
        </button>
      </div>
    </>
  );
}
