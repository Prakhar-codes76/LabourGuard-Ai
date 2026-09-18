import React, { useState } from 'react';
import { 
  ClipboardList, Search, Filter, AlertTriangle, ShieldCheck, 
  MapPin, Calendar, User, ChevronRight, Eye, FileText, CheckCircle2, X
} from 'lucide-react';
import { recentInspections } from '../data/mockData';

export default function InspectionsList({ onSelectInspection }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [selectedInspectionModal, setSelectedInspectionModal] = useState(null);

  const filteredInspections = recentInspections.filter((item) => {
    const matchesSearch = item.establishment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'All' || item.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6">
      
      {/* Header bar */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ClipboardList className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Establishment Field Inspections Registry</h2>
          </div>
          <p className="text-xs text-slate-400">
            Real-time compliance monitoring records across target industrial corridors, factories, and construction sites.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 font-mono text-xs">
          {['All', 'High Risk', 'Medium Risk', 'Compliant'].map((filter) => (
            <button
              key={filter}
              onClick={() => setRiskFilter(filter)}
              className={`px-3 py-1.5 rounded-md border transition-all cursor-pointer ${
                riskFilter === filter
                  ? 'bg-blue-600 border-blue-500 text-white font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search establishment, ID or district..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>

        <div className="text-xs font-mono text-slate-400 flex items-center space-x-4">
          <span>Showing <strong className="text-white">{filteredInspections.length}</strong> inspections</span>
        </div>

      </div>

      {/* Main Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Inspection ID</th>
                <th className="py-3.5 px-4 font-semibold">Establishment</th>
                <th className="py-3.5 px-4 font-semibold">Audit Type / Act</th>
                <th className="py-3.5 px-4 font-semibold">District</th>
                <th className="py-3.5 px-4 font-semibold">Date</th>
                <th className="py-3.5 px-4 font-semibold">Score</th>
                <th className="py-3.5 px-4 font-semibold">Risk Level</th>
                <th className="py-3.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800 text-slate-200">
              {filteredInspections.length > 0 ? (
                filteredInspections.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-800/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-blue-400">{row.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-100">{row.establishment}</td>
                    <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate">{row.type}</td>
                    <td className="py-3.5 px-4 text-slate-300">{row.district}</td>
                    <td className="py-3.5 px-4 text-slate-400">{row.date}</td>
                    <td className="py-3.5 px-4 font-bold">
                      <span className={
                        row.complianceScore < 65 
                          ? 'text-red-400' 
                          : row.complianceScore < 85 
                          ? 'text-amber-400' 
                          : 'text-emerald-400'
                      }>
                        {row.complianceScore}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.riskLevel === 'High Risk'
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : row.riskLevel === 'Medium Risk'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}>
                        {row.riskLevel}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedInspectionModal(row)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] px-3 py-1.5 rounded border border-slate-700 font-mono inline-flex items-center space-x-1 cursor-pointer transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-blue-400" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 font-mono text-xs">
                    No inspection records found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* INSPECTION DETAIL MODAL */}
      {selectedInspectionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 max-w-2xl w-full rounded-xl overflow-hidden shadow-2xl space-y-4">
            
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center font-mono">
              <div className="flex items-center space-x-2 text-xs">
                <ClipboardList className="w-4 h-4 text-blue-400" />
                <span className="text-white font-bold">{selectedInspectionModal.id}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300">{selectedInspectionModal.establishment}</span>
              </div>
              <button 
                onClick={() => setSelectedInspectionModal(null)} 
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 font-mono text-xs">
              
              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div>
                  <div className="text-[10px] text-slate-400">SECTOR TYPE</div>
                  <div className="text-slate-200 font-semibold mt-0.5">{selectedInspectionModal.sector}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">DISTRICT REGION</div>
                  <div className="text-slate-200 font-semibold mt-0.5">{selectedInspectionModal.district}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">INSPECTOR IN CHARGE</div>
                  <div className="text-slate-200 font-semibold mt-0.5">{selectedInspectionModal.inspector}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">COMPLIANCE SCORE</div>
                  <div className={`font-bold text-sm mt-0.5 ${
                    selectedInspectionModal.complianceScore < 65 ? 'text-red-400' : 'text-amber-400'
                  }`}>
                    {selectedInspectionModal.complianceScore}% ({selectedInspectionModal.riskLevel})
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-slate-400 font-bold uppercase text-[10px]">Identified Anomalies & Non-Compliance Findings:</div>
                {selectedInspectionModal.anomalies.length > 0 ? (
                  <div className="space-y-1.5">
                    {selectedInspectionModal.anomalies.map((anom, idx) => (
                      <div key={idx} className="p-2.5 bg-red-950/40 border border-red-900/60 rounded text-red-300 flex items-center space-x-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span>{anom}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-2.5 bg-emerald-950/40 border border-emerald-900/60 rounded text-emerald-300 flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>No statutory anomalies found during field inspection.</span>
                  </div>
                )}
              </div>

            </div>

            <div className="bg-slate-950 p-4 border-t border-slate-800 flex justify-end space-x-3 font-mono text-xs">
              <button
                onClick={() => setSelectedInspectionModal(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
