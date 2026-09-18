import React, { useState } from 'react';
import { Map, AlertTriangle, ShieldCheck, Factory, HardHat, Flame, Building2, ChevronRight, Filter } from 'lucide-react';
import { districtRiskHeatmap } from '../data/mockData';

export default function RiskMap() {
  const [selectedDistrict, setSelectedDistrict] = useState(districtRiskHeatmap[0]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Map className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">District Compliance & Risk Intelligence Map</h2>
          </div>
          <p className="text-xs text-slate-400">
            Geospatial risk indicators across registered industrial zones, textile belts, and chemical manufacturing corridors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left District Grid View */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 tech-grid-pattern-dark">
            
            <div className="flex justify-between items-center pb-3 border-b border-slate-800 font-mono text-xs">
              <span className="text-white font-bold flex items-center">
                <Factory className="w-4 h-4 text-cyan-400 mr-2" />
                INDUSTRIAL CLUSTER TELEMETRY GRID
              </span>
              <span className="text-emerald-400">6 ACTIVE REGIONS</span>
            </div>

            {/* Visual Grid representing Districts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {districtRiskHeatmap.map((item) => {
                const isSelected = selectedDistrict.district === item.district;
                const isHighRisk = item.avgScore < 75;
                const isMediumRisk = item.avgScore >= 75 && item.avgScore < 85;

                return (
                  <button
                    key={item.district}
                    onClick={() => setSelectedDistrict(item)}
                    className={`text-left p-4 rounded-xl border transition-all font-mono space-y-3 cursor-pointer ${
                      isSelected 
                        ? 'bg-slate-800 border-blue-500 shadow-lg ring-1 ring-blue-500' 
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] text-slate-400 block">{item.zone}</span>
                        <h4 className="text-xs font-bold text-white leading-tight mt-0.5">{item.district}</h4>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isHighRisk 
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : isMediumRisk
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}>
                        {item.avgScore}%
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 space-y-1">
                      <div className="flex justify-between">
                        <span>Establishments:</span>
                        <span className="text-slate-200 font-semibold">{item.establishments}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>High Risk Flagged:</span>
                        <span className={item.highRisk > 3 ? 'text-red-400 font-bold' : 'text-slate-300'}>
                          {item.highRisk} units
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${isHighRisk ? 'bg-red-500' : isMediumRisk ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${item.avgScore}%` }}
                      ></div>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* Right District Detail Panel */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
          
          <div className="flex justify-between items-center pb-3 border-b border-slate-800 font-mono text-xs">
            <span className="text-slate-300 font-bold flex items-center">
              <Building2 className="w-4 h-4 text-blue-400 mr-2" />
              DISTRICT PROFILE
            </span>
            <span className="text-slate-400">{selectedDistrict.zone}</span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <h3 className="text-base font-bold text-white">{selectedDistrict.district}</h3>
              <p className="text-slate-400 text-xs mt-0.5">Primary Sector: {selectedDistrict.primarySector}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-lg border border-slate-800">
              <div>
                <div className="text-[10px] text-slate-400">TOTAL ESTABLISHMENTS</div>
                <div className="text-slate-100 font-bold text-sm mt-0.5">{selectedDistrict.establishments}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">HIGH RISK UNITS</div>
                <div className="text-red-400 font-bold text-sm mt-0.5">{selectedDistrict.highRisk}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-slate-400 font-bold uppercase text-[10px]">Priority Field Inspection Queue:</div>
              <div className="space-y-2">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-slate-200">Apex Heavy Engineering</div>
                    <div className="text-[10px] text-slate-400">Muster roll overtime gap</div>
                  </div>
                  <span className="text-red-400 font-bold">Priority #1</span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-slate-200">Surat Dyeing Processing</div>
                    <div className="text-[10px] text-slate-400">Effluent discharge audit</div>
                  </div>
                  <span className="text-amber-400 font-bold">Priority #2</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => alert(`Inspection dispatch ticket assigned to ${selectedDistrict.district}`)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg border border-blue-400/30 shadow flex items-center justify-center space-x-2 cursor-pointer"
            >
              <HardHat className="w-4 h-4" />
              <span>Dispatch Inspector to Region</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
