import React from 'react';
import { FileSpreadsheet, Printer, Download, CheckCircle2, Shield, AlertOctagon, Hash } from 'lucide-react';
import { sampleDocuments } from '../data/mockData';

export default function InspectionReports({ activeDoc }) {
  const doc = activeDoc || sampleDocuments[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header bar no-print */}
      <div className="no-print bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <FileSpreadsheet className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Structured Labour Inspection Audit Report</h2>
          </div>
          <p className="text-xs text-slate-400">
            Formally formatted compliance audit record ready for digital export or official file print.
          </p>
        </div>

        <div className="flex items-center space-x-3 font-mono text-xs">
          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2.5 rounded-lg border border-blue-400/30 flex items-center space-x-2 cursor-pointer transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Audit Report</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE AUDIT REPORT CONTAINER */}
      <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-2xl border border-slate-300 font-sans max-w-4xl mx-auto space-y-6">
        
        {/* Report Top Seal Header */}
        <div className="border-b-2 border-slate-900 pb-6 flex justify-between items-start">
          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-500 tracking-wider uppercase font-semibold">
              HACKATHON PROTOTYPE • LABOUR COMPLIANCE INSPECTION SYSTEM
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 uppercase">
              Labour Inspection Audit Findings Record
            </h1>
            <p className="text-xs text-slate-600 font-mono">
              Generated under LabourGuard AI Audit Engine • Document Hash Verification Active
            </p>
          </div>

          <div className="text-right font-mono text-xs space-y-1">
            <div className="font-bold text-slate-900">REPORT NO: AUD-2026-8891</div>
            <div className="text-slate-600">DATE: 2026-09-18</div>
            <div className="inline-block bg-slate-100 text-slate-800 border border-slate-300 px-2 py-0.5 rounded text-[10px]">
              DIGITALLY SIGNED
            </div>
          </div>
        </div>

        {/* Mandatory Verification Disclaimer */}
        <div className="bg-amber-50 border border-amber-300 text-amber-900 p-3 rounded text-xs font-mono">
          <strong>Mandatory Notice:</strong> AI-generated analysis. Findings require human verification and should not be treated as a final legal determination.
        </div>

        {/* Target Establishment Meta */}
        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded border border-slate-200 font-mono text-xs">
          <div>
            <span className="text-slate-500 text-[10px] uppercase block font-semibold">Target Establishment:</span>
            <span className="font-bold text-slate-900 text-sm">{doc.establishment}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase block font-semibold">Analyzed File Name:</span>
            <span className="font-semibold text-slate-800">{doc.title}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase block font-semibold">Inspection Category:</span>
            <span className="text-slate-800">{doc.category}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase block font-semibold">Calculated Risk Index:</span>
            <span className={`font-bold ${doc.riskScore < 65 ? 'text-red-700' : 'text-amber-700'}`}>
              {doc.riskScore}% ({doc.riskLevel})
            </span>
          </div>
        </div>

        {/* AI Extracted Findings Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
            1. Executive Compliance Summary:
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">
            "{doc.summary}"
          </p>
        </div>

        {/* Extracted Key-Values */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
            2. Verified Data Fields:
          </h3>
          <table className="w-full text-left text-xs font-mono border border-slate-300">
            <thead className="bg-slate-100 text-slate-700 uppercase border-b border-slate-300 text-[10px]">
              <tr>
                <th className="p-2 border-r border-slate-300">Field Parameter</th>
                <th className="p-2">Extracted Value / Statutory Finding</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {doc.extractedData.map((item, idx) => (
                <tr key={idx}>
                  <td className="p-2 font-semibold border-r border-slate-300">{item.key}</td>
                  <td className="p-2">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Missing Requirements */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
            3. Mandatory Non-Compliance & Missing Clauses:
          </h3>
          {doc.missingClauses.length > 0 ? (
            <div className="space-y-1.5 font-mono text-xs">
              {doc.missingClauses.map((clause, idx) => (
                <div key={idx} className="p-2.5 bg-red-50 text-red-900 border border-red-200 rounded font-semibold flex items-center space-x-2">
                  <AlertOctagon className="w-4 h-4 text-red-700 shrink-0" />
                  <span>{clause}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-2.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded text-xs font-mono">
              No statutory non-compliance missing clauses detected.
            </div>
          )}
        </div>

        {/* Signature & Seal Block */}
        <div className="pt-8 border-t-2 border-slate-900 grid grid-cols-2 gap-8 font-mono text-xs">
          <div className="space-y-8">
            <div>
              <div className="text-[10px] text-slate-500 uppercase">Cryptographic Audit Stamp:</div>
              <div className="text-[10px] text-slate-800 font-bold tracking-tight">
                SHA256: 8f92a10b47e29c01fa28499281e847c001928471b
              </div>
            </div>
            <div className="text-[10px] text-slate-500">
              Generated via LabourGuard AI Engine v2.4.0
            </div>
          </div>

          <div className="text-right space-y-6">
            <div className="inline-block border-b-2 border-slate-900 w-48 text-center pb-1 font-bold text-slate-900">
              Rajesh V. Sharma
            </div>
            <div className="text-[10px] text-slate-600">
              Senior Labour Enforcement Officer<br />
              Zone-4 Northern Industrial Corridor
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
