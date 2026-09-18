import React from 'react';
import { Scale, CheckCircle2, FileText, AlertCircle, Bookmark } from 'lucide-react';
import { statutoryActsList } from '../data/mockData';

export default function ComplianceMatrix() {
  return (
    <div className="space-y-6">
      
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Statutory Labour Acts Regulatory Matrix</h2>
          </div>
          <p className="text-xs text-slate-400">
            Rulesets and verification checkpoints enforced by LabourGuard AI document intelligence parser.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statutoryActsList.map((act) => (
          <div key={act.code} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 hover:border-slate-700 transition-all font-mono text-xs">
            
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-blue-400 font-bold">{act.code}</span>
                <h3 className="text-sm font-bold text-white mt-0.5">{act.name}</h3>
              </div>
              <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800 text-slate-300 text-[10px]">
                {act.activeInspectionsCount} Active Rules
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              {act.description}
            </p>

            <div className="space-y-2 pt-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Key Mandatory Checkpoints:</span>
              <div className="space-y-1.5">
                {act.keyCheckpoints.map((cp, idx) => (
                  <div key={idx} className="bg-slate-950 p-2.5 rounded border border-slate-800/80 flex items-center space-x-2 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{cp}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
