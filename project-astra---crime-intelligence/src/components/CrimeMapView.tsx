import React, { useState, useEffect, useRef } from 'react';
import { 
  Layers, 
  Compass, 
  Activity, 
  X, 
  HelpCircle, 
  BookOpen 
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Incident, PredictionHex } from '../types';
import { mockIncidents, mockPredictions, KARNATAKA_DISTRICTS, CRIME_CATEGORIES } from '../mockData';

interface CrimeMapViewProps {
  selectedDistrict: string | null;
  onSelectDistrict: (district: string | null) => void;
}

const DISTRICT_CENTERS: Record<string, [number, number]> = {
  "Bagalkot": [16.1813, 75.6958],
  "Ballari": [15.1394, 76.9214],
  "Belagavi": [15.8497, 74.4977],
  "Bengaluru Rural": [13.2500, 77.7000],
  "Bengaluru Urban": [12.9716, 77.5946],
  "Bidar": [17.9104, 77.5199],
  "Chamarajanagara": [11.9261, 76.9402],
  "Chikkaballapur": [13.4354, 77.7277],
  "Chikkamagaluru": [13.3161, 75.7720],
  "Chitradurga": [14.2251, 76.3980],
  "Dakshina Kannada": [12.8700, 75.0000],
  "Davangere": [14.4644, 75.9218],
  "Dharwad": [15.4589, 75.0078],
  "Gadag": [15.4323, 75.6315],
  "Hassan": [13.0072, 76.1026],
  "Haveri": [14.7954, 75.3995],
  "Kalaburagi": [17.3297, 76.8343],
  "Kodagu": [12.4244, 75.7382],
  "Kolar": [13.1368, 78.1292],
  "Koppal": [15.3468, 76.1554],
  "Mandya": [12.5218, 76.8951],
  "Mysuru": [12.2958, 76.6394],
  "Raichur": [16.2120, 77.3556],
  "Ramanagara": [12.7150, 77.2813],
  "Shivamogga": [13.9299, 75.5681],
  "Tumakuru": [13.3379, 77.1173],
  "Udupi": [13.3409, 74.7421],
  "Uttara Kannada": [14.8090, 74.5939],
  "Vijayapura": [16.8302, 75.7100],
  "Vijayanagara": [15.1500, 76.3500],
  "Yadgir": [16.7600, 77.1400]
};

export default function CrimeMapView({ selectedDistrict, onSelectDistrict }: CrimeMapViewProps) {
  const [selectedCrimeType, setSelectedCrimeType] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showPredictions, setShowPredictions] = useState(true);
  const [selectedHex, setSelectedHex] = useState<PredictionHex | null>(null);
  const [hoveredIncident, setHoveredIncident] = useState<Incident | null>(null);
  const [showLegend, setShowLegend] = useState(true);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const vectorLayersRef = useRef<L.LayerGroup | null>(null);

  const filteredIncidents = mockIncidents.filter((inc) => {
    if (selectedDistrict && inc.district !== selectedDistrict) return false;
    if (selectedCrimeType && inc.crime_type !== selectedCrimeType) return false;
    return true;
  });

  const filteredPredictions = mockPredictions.filter((hex) => {
    if (selectedDistrict && hex.district !== selectedDistrict) return false;
    return true;
  });

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [14.8, 76.2],
      zoom: 7,
      zoomControl: true,
      minZoom: 5,
      maxZoom: 14
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 18
    }).addTo(map);

    const layers = L.layerGroup().addTo(map);
    vectorLayersRef.current = layers;
    mapRef.current = map;

    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (selectedDistrict && DISTRICT_CENTERS[selectedDistrict]) {
      const center = DISTRICT_CENTERS[selectedDistrict];
      map.flyTo(center, 9.5, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    } else {
      map.flyTo([14.8, 76.2], 7, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }
  }, [selectedDistrict]);

  useEffect(() => {
    const map = mapRef.current;
    const layers = vectorLayersRef.current;
    if (!map || !layers) return;

    layers.clearLayers();

    if (showHeatmap) {
      filteredIncidents.forEach((inc) => {
        const color = inc.crime_type === 'Cybercrime' 
          ? '#a855f7'
          : inc.crime_type === 'Chain Snatching' || inc.crime_type === 'Murder'
          ? '#ea580c'
          : inc.crime_type === 'Theft'
          ? '#3b82f6'
          : '#f59e0b';

        const coreCircle = L.circle([inc.lat, inc.lon], {
          radius: 6000,
          fillColor: color,
          fillOpacity: 0.6,
          color: '#ffffff',
          weight: 1.5,
          opacity: 0.95
        });

        const intermediateHalo = L.circle([inc.lat, inc.lon], {
          radius: 18000,
          fillColor: color,
          fillOpacity: 0.25,
          color: color,
          weight: 1,
          opacity: 0.45
        });

        const outerGlowHalo = L.circle([inc.lat, inc.lon], {
          radius: 34000,
          fillColor: color,
          fillOpacity: 0.1,
          color: color,
          weight: 0.5,
          opacity: 0.2
        });

        const handleInteraction = () => {
          setHoveredIncident(inc);
        };

        [coreCircle, intermediateHalo, outerGlowHalo].forEach((layer) => {
          layer.on('mouseover', handleInteraction);
          layer.on('click', handleInteraction);
          layer.addTo(layers);
        });
      });
    }

    if (showPredictions) {
      filteredPredictions.forEach((pred) => {
        const color = pred.risk_score > 0.8
          ? '#ef4444'
          : pred.risk_score > 0.6
          ? '#f59e0b'
          : '#3b82f6';

        const isSelected = selectedHex?.id === pred.id;

        const predCircle = L.circle([pred.lat, pred.lon], {
          radius: 20000,
          fillColor: color,
          fillOpacity: isSelected ? 0.5 : 0.2,
          color: isSelected ? '#ffffff' : color,
          weight: isSelected ? 3 : 1.2,
          opacity: isSelected ? 1 : 0.6,
          dashArray: isSelected ? undefined : '5, 5'
        });

        predCircle.on('click', () => {
          setSelectedHex(isSelected ? null : pred);
        });

        predCircle.addTo(layers);
      });
    }
  }, [showHeatmap, showPredictions, filteredIncidents, filteredPredictions, selectedHex]);

  return (
    <div className="flex-1 bg-[#090b11] h-screen flex flex-col font-sans text-slate-300 relative overflow-hidden">
      
      {/* Top Map Filter Bar */}
      <div className="h-14 md:h-16 bg-[#0c0e17] border-b border-[#1e293b]/40 px-3 md:px-6 flex items-center justify-between gap-2 md:gap-4 shrink-0 z-10">
        <div className="flex items-center gap-2 md:gap-3 min-w-0 overflow-x-auto">
          {/* District Selector */}
          <div className="relative shrink-0">
            <select
              value={selectedDistrict || ''}
              onChange={(e) => onSelectDistrict(e.target.value || null)}
              className="bg-[#141a2e] text-slate-200 text-[10px] md:text-xs font-mono py-1.5 px-2 md:px-3 rounded-lg border border-[#1e293b]/60 focus:outline-none focus:border-blue-500 cursor-pointer min-w-[100px] md:min-w-[140px]"
            >
              <option value="">All Districts</option>
              {KARNATAKA_DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Crime Category Selector */}
          <div className="relative shrink-0">
            <select
              value={selectedCrimeType || ''}
              onChange={(e) => setSelectedCrimeType(e.target.value || null)}
              className="bg-[#141a2e] text-slate-200 text-[10px] md:text-xs font-mono py-1.5 px-2 md:px-3 rounded-lg border border-[#1e293b]/60 focus:outline-none focus:border-blue-500 cursor-pointer min-w-[100px] md:min-w-[140px]"
            >
              <option value="">All Types</option>
              {CRIME_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Layer Toggles & Total Count */}
        <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[10px] md:text-xs font-mono border transition-all cursor-pointer ${
              showHeatmap 
                ? 'bg-blue-600/15 border-blue-500/50 text-blue-400' 
                : 'bg-[#141a2e]/40 border-slate-800 text-slate-500 hover:text-slate-400'
            }`}
          >
            <Layers className="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span className="hidden sm:inline">Heatmap</span>
          </button>

          <button
            onClick={() => setShowPredictions(!showPredictions)}
            className={`flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[10px] md:text-xs font-mono border transition-all cursor-pointer ${
              showPredictions 
                ? 'bg-amber-600/15 border-amber-500/50 text-amber-400' 
                : 'bg-[#141a2e]/40 border-slate-800 text-slate-500 hover:text-slate-400'
            }`}
          >
            <Compass className="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span className="hidden sm:inline">Predictions</span>
          </button>

          <div className="text-[10px] md:text-xs text-slate-400 font-mono ml-1 md:ml-3 pl-1 md:pl-3 border-l border-slate-800">
            <span className="text-white font-bold">{filteredIncidents.length}</span>
          </div>
        </div>
      </div>

      {/* Main Map Body Container */}
      <div className="flex-1 relative flex">
        <div 
          ref={mapContainerRef} 
          id="crime-map" 
          className="flex-1 h-full w-full bg-[#07090f] relative z-0"
        />

        {/* Floating Hover Incident Card */}
        {hoveredIncident && (
          <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 p-3 md:p-4 bg-[#0c0e17]/95 backdrop-blur-md border border-slate-800 rounded-xl shadow-2xl z-20 w-64 md:w-80 font-sans">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[9px] md:text-[10px] font-mono text-blue-400 font-bold tracking-wider uppercase">
                {hoveredIncident.crime_type}
              </span>
              <span className="text-[9px] md:text-[10px] font-mono text-slate-500">
                {hoveredIncident.fir_id}
              </span>
            </div>
            <h4 className="text-xs md:text-sm font-bold text-white mb-1">
              {hoveredIncident.police_station}
            </h4>
            <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">
              {hoveredIncident.fir_narrative.slice(0, 110)}...
            </p>
            <div className="flex items-center justify-between text-[9px] md:text-[10px] text-slate-500 border-t border-slate-800/60 pt-2 font-mono">
              <span>Date: {hoveredIncident.fir_date}</span>
              <span className="text-emerald-400">Severity: {hoveredIncident.severity_score}</span>
            </div>
          </div>
        )}

        {/* Map Legend */}
        {showLegend && (
          <div className="absolute bottom-3 right-3 md:bottom-6 md:right-6 p-3 md:p-4 bg-[#0c0e17]/95 backdrop-blur-md border border-[#1e293b]/60 rounded-xl shadow-2xl z-20 w-36 md:w-44 font-sans">
            <div className="flex items-center justify-between mb-2 md:mb-3 pb-1 border-b border-slate-850">
              <span className="text-[9px] md:text-[10px] font-bold text-slate-400 font-mono tracking-wider uppercase">
                Legend
              </span>
              <button 
                onClick={() => setShowLegend(false)}
                className="text-slate-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-1.5 md:space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-blue-500 rounded-full border border-white/20 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                <span className="text-[10px] md:text-xs text-slate-300 font-medium">Low Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-amber-500 rounded-full border border-white/20 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                <span className="text-[10px] md:text-xs text-slate-300 font-medium">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-red-500 rounded-full border border-white/20 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <span className="text-[10px] md:text-xs text-slate-300 font-medium">High Risk</span>
              </div>
            </div>
          </div>
        )}

        {/* Selected Prediction Side Drawer - Overlay on mobile */}
        {selectedHex && (
          <>
            <div 
              className="md:hidden fixed inset-0 bg-black/60 z-30"
              onClick={() => setSelectedHex(null)}
            />
            <div className="fixed md:relative right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[#0c0e17] border-l border-[#1e293b]/50 h-full overflow-y-auto p-4 md:p-6 flex flex-col z-40 shadow-2xl relative">
              <button 
                onClick={() => setSelectedHex(null)}
                className="absolute top-3 right-3 md:top-4 md:right-4 text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-md transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-4 md:mb-6">
                <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                  <Compass className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="text-[9px] md:text-[10px] font-mono tracking-wider font-bold uppercase">STGCN Prediction</span>
                </div>
                <h3 className="text-sm md:text-base font-bold text-white font-sans truncate">
                  Cell: {selectedHex.h3_index}
                </h3>
                <p className="text-[10px] md:text-xs text-slate-500 font-mono">{selectedHex.district} Region</p>
              </div>

              {/* Risk Score Dial Card */}
              <div className="bg-[#121624] border border-[#1e293b]/40 rounded-xl p-3 md:p-4 mb-4 md:mb-6 text-center">
                <span className="text-[9px] md:text-[10px] text-slate-400 font-mono block">SPATIOTEMPORAL RISK SCORE</span>
                <span className="text-3xl md:text-4xl font-extrabold text-white font-mono block mt-1">
                  {Math.round(selectedHex.risk_score * 100)}%
                </span>
                <span className="text-[9px] md:text-[10px] text-emerald-400 font-mono mt-2 block">
                  Model Confidence: {selectedHex.confidence * 100}%
                </span>
              </div>

              {/* SHAP Waterfall */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3 md:mb-4 pb-1 border-b border-slate-800">
                  <span className="text-[10px] md:text-xs font-bold text-white">XAI: SHAP Contribution</span>
                  <HelpCircle className="w-3 h-3 md:w-3.5 md:h-3.5 text-slate-500 cursor-help" title="SHAP values show positive or negative influence of factors." />
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[10px] md:text-[11px] mb-1 font-sans">
                      <span className="text-slate-300 font-medium">Recent Crime Density</span>
                      <span className="text-red-400 font-mono">+{selectedHex.shap_values.recent_crime_density * 100}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${selectedHex.shap_values.recent_crime_density * 100}%` }}
                        className="h-full bg-red-500" 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[10px] md:text-[11px] mb-1 font-sans">
                      <span className="text-slate-300 font-medium">Temporal: Day of Week</span>
                      <span className="text-red-400 font-mono">+{selectedHex.shap_values.day_of_week * 100}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${selectedHex.shap_values.day_of_week * 100}%` }}
                        className="h-full bg-red-400" 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[10px] md:text-[11px] mb-1 font-sans">
                      <span className="text-slate-300 font-medium">Temporal: Hour of Day</span>
                      <span className="text-red-400 font-mono">+{selectedHex.shap_values.hour_of_day * 100}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${selectedHex.shap_values.hour_of_day * 100}%` }}
                        className="h-full bg-red-400/80" 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[10px] md:text-[11px] mb-1 font-sans">
                      <span className="text-slate-300 font-medium">Socioeconomic Index</span>
                      <span className="text-red-400 font-mono">+{selectedHex.shap_values.socioeconomic_index * 100}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${selectedHex.shap_values.socioeconomic_index * 100}%` }}
                        className="h-full bg-red-300/60" 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[10px] md:text-[11px] mb-1 font-sans">
                      <span className="text-slate-300 font-medium">Population Density</span>
                      <span className="text-red-400 font-mono">+{selectedHex.shap_values.population_density * 100}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${selectedHex.shap_values.population_density * 100}%` }}
                        className="h-full bg-red-300/40" 
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 md:mt-8 p-3 md:p-3.5 bg-[#141a2e] rounded-lg border border-[#1e293b]/40 text-[10px] md:text-[11px] text-slate-400 leading-relaxed font-sans">
                  <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400 mb-1.5" />
                  <span className="font-bold text-slate-200 block mb-1">STGCN Defensibility Log</span>
                  The primary risk driver is the <strong className="text-white">Recent Crime Density</strong> factor.
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
