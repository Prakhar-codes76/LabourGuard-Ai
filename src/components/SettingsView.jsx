import React, { useState } from 'react';
import { Sliders, Shield, Database, Save, CheckCircle2, Lock, Cpu } from 'lucide-react';

export default function SettingsView() {
  const [ocrConfidence, setOcrConfidence] = useState(85);
  const [autoDispatchThreshold, setAutoDispatchThreshold] = useState(65);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white tracking-tight font-sans">System Configuration & Audit Logs</h2>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Engine parameters, OCR extraction sensitivity thresholds, and audit logging settings.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 p-3.5 rounded-lg flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Engine parameters updated and synced across inspection node clusters.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Form Controls */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <h3 className="text-sm font-bold text-white uppercase border-b border-slate-800 pb-3 flex items-center">
            <Cpu className="w-4 h-4 text-blue-400 mr-2" />
            AI Parsing Engine Parameters
          </h3>

          <form onSubmit={handleSave} className="space-y-5">
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-slate-300 font-semibold">Minimum OCR Confidence Threshold</label>
                <span className="text-blue-400 font-bold">{ocrConfidence}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="98"
                value={ocrConfidence}
                onChange={(e) => setOcrConfidence(e.target.value)}
                className="w-full accent-blue-500 bg-slate-950 rounded cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">
                Documents with OCR confidence below this percentage trigger manual inspector verification.
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-800">
              <div className="flex justify-between">
                <label className="text-slate-300 font-semibold">Automatic Field Inspector Dispatch Score Threshold</label>
                <span className="text-red-400 font-bold">&lt; {autoDispatchThreshold}% Score</span>
              </div>
              <input
                type="range"
                min="45"
                max="80"
                value={autoDispatchThreshold}
                onChange={(e) => setAutoDispatchThreshold(e.target.value)}
                className="w-full accent-red-500 bg-slate-950 rounded cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">
                Establishments scoring below this compliance mark are automatically queued for urgent field inspection.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-lg border border-blue-400/30 flex items-center space-x-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Parameters</span>
              </button>
            </div>

          </form>
        </div>

        {/* System Logs */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase border-b border-slate-800 pb-3 flex items-center">
            <Database className="w-4 h-4 text-cyan-400 mr-2" />
            Immutable System Audit Logs
          </h3>

          <div className="space-y-2 text-[10px] text-slate-300 font-mono">
            <div className="p-2.5 bg-slate-950 rounded border border-slate-800 space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>[2026-09-18 22:30:14 IST]</span>
                <span className="text-emerald-400">AUTH OK</span>
              </div>
              <div className="text-slate-200">Officer R. Sharma (LEO-IN-8841) logged in via TLS tunnel.</div>
            </div>

            <div className="p-2.5 bg-slate-950 rounded border border-slate-800 space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>[2026-09-18 22:15:02 IST]</span>
                <span className="text-amber-400 font-bold">OCR PARSE</span>
              </div>
              <div className="text-slate-200">DOC-8891 parsed with 3 missing mandatory clauses flagged.</div>
            </div>

            <div className="p-2.5 bg-slate-950 rounded border border-slate-800 space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>[2026-09-18 21:50:40 IST]</span>
                <span className="text-blue-400">SYNC GRID</span>
              </div>
              <div className="text-slate-200">Zone-4 Northern Industrial Belt heatmap re-indexed.</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
