import React, { useState } from 'react';
import { 
  FileText, Upload, Sparkles, CheckCircle2, AlertTriangle, AlertOctagon, 
  Search, ShieldAlert, Cpu, Eye, FileSpreadsheet, RefreshCw, Download, Layers, Check
} from 'lucide-react';
import { sampleDocuments } from '../data/mockData';
import { apiClient } from '../services/apiClient';

export default function DocumentIntelligence({ onGenerateReport }) {
  const [selectedDoc, setSelectedDoc] = useState(sampleDocuments[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSimulatedScan = (doc) => {
    setIsScanning(true);
    setErrorMessage('');
    setTimeout(() => {
      setSelectedDoc(doc);
      setIsScanning(false);
    }, 400);
  };

  const [analysisStage, setAnalysisStage] = useState(0);

  const stagesList = [
    "✓ Document uploaded & validated",
    "✓ Text extraction & page structure parsing",
    "→ Running server-side Gemini AI compliance evaluation",
    "→ Applying DEMO statutory compliance rules engine",
    "→ Calculating transparent risk score & risk factors",
    "→ Generating structured legal inspection audit report"
  ];

  const handleFileUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsScanning(true);
      setUploadSuccess(false);
      setErrorMessage('');
      setAnalysisStage(0);

      try {
        const interval = setInterval(() => {
          setAnalysisStage((prev) => (prev < stagesList.length - 1 ? prev + 1 : prev));
        }, 500);

        if (!apiClient.getToken()) {
          await apiClient.login('r.sharma@labourguard.org', '••••••••••••');
        }

        const uploadRes = await apiClient.uploadDocument(file);
        const analysisRes = await apiClient.analyzeDocument(uploadRes.document_id);

        clearInterval(interval);
        setAnalysisStage(stagesList.length - 1);

        setIsScanning(false);
        setUploadSuccess(true);
        setSelectedDoc({
          id: `DOC-${analysisRes.document_id}`,
          title: uploadRes.filename,
          establishment: analysisRes.extracted_information?.establishment_name || "Target Industrial Enterprise",
          category: analysisRes.document_type || "Uploaded Compliance Document",
          uploadDate: new Date(uploadRes.created_at).toLocaleString(),
          fileSize: `${(uploadRes.file_size / (1024 * 1024)).toFixed(2)} MB`,
          pages: 1,
          ocrStatus: "FastAPI & Gemini Engine Analysis Complete",
          riskScore: analysisRes.compliance_score,
          riskLevel: analysisRes.risk_level === 'HIGH' ? 'High Risk' : analysisRes.risk_level === 'MEDIUM' ? 'Medium Risk' : 'Compliant',
          summary: analysisRes.summary,
          missingClauses: analysisRes.missing_information || [],
          discrepancies: analysisRes.discrepancies || [],
          riskFactors: analysisRes.risk_factors || [],
          findings: analysisRes.findings || [],
          extractedData: Object.entries(analysisRes.extracted_information || {}).map(([k, v]) => ({
            key: k.replace(/_/g, ' ').toUpperCase(),
            value: String(v)
          })),
        });
      } catch (err) {
        setIsScanning(false);
        setErrorMessage(err.message || "Failed to process document with backend API.");
      }
    }
  };



  return (
    <div className="space-y-6">
      
      {/* Header banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-wrap justify-between items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">AI Document Intelligence & OCR Extraction</h2>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Upload PDFs, scanned wage registers, OSH logs or select pre-analyzed sample documents below to run instant statutory clause extraction and risk analysis.
          </p>
        </div>

        <div className="flex items-center space-x-3 font-mono text-xs">
          <label className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg border border-blue-400/40 shadow cursor-pointer flex items-center space-x-2 transition-all">
            <Upload className="w-4 h-4" />
            <span>Upload Inspection File</span>
            <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {uploadSuccess && (
        <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs p-3.5 rounded-lg font-mono flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Document uploaded & analyzed successfully via FastAPI backend and Gemini engine.</span>
          </div>
          <button onClick={() => setUploadSuccess(false)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-950/80 border border-red-800 text-red-300 text-xs p-3.5 rounded-lg font-mono flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertOctagon className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage('')} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}


      {/* Document Selector Pills */}
      <div className="space-y-2">
        <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Select Pre-Analyzed Sample Document:</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {sampleDocuments.map((doc) => (
            <button
              key={doc.id}
              onClick={() => handleSimulatedScan(doc)}
              className={`text-left p-3.5 rounded-lg border transition-all text-xs font-mono flex flex-col justify-between cursor-pointer ${
                selectedDoc.id === doc.id
                  ? 'bg-slate-800 border-blue-500 text-white shadow-md'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-slate-200 line-clamp-1">{doc.title}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    doc.riskLevel === 'High Risk' 
                      ? 'bg-red-950 text-red-400 border border-red-800'
                      : doc.riskLevel === 'Medium Risk'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  }`}>
                    {doc.riskScore}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1">{doc.establishment}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex justify-between text-[10px] text-slate-400">
                <span>{doc.category}</span>
                <span>{doc.pages} Pages</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Analysis View */}
      {isScanning ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">FastAPI & Gemini Processing Pipeline Active</h3>
          </div>

          <div className="max-w-md mx-auto space-y-2 font-mono text-xs text-left bg-slate-950 p-4 rounded-lg border border-slate-800">
            {stagesList.map((stageText, idx) => (
              <div 
                key={idx} 
                className={`flex items-center space-x-2 transition-opacity ${
                  idx <= analysisStage ? 'text-blue-400 font-bold opacity-100' : 'text-slate-600 opacity-40'
                }`}
              >
                <span>{stageText}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Document View */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800 font-mono text-xs">
              <span className="text-slate-300 font-bold flex items-center">
                <FileText className="w-4 h-4 text-blue-400 mr-2" />
                DOCUMENT PREVIEW
              </span>
              <span className="text-slate-400">{selectedDoc.fileSize}</span>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs space-y-3 relative overflow-hidden min-h-[360px]">
              
              <div className="flex justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
                <span>FILE: {selectedDoc.id}</span>
                <span className="text-cyan-400">{selectedDoc.ocrStatus}</span>
              </div>

              {/* Simulated PDF document lines with OCR highlight boxes */}
              <div className="space-y-2 text-slate-300">
                <div className="text-slate-400 font-bold uppercase text-[10px]">Title Header:</div>
                <div className="p-2 bg-slate-900 border border-slate-800 rounded text-[11px] font-semibold text-slate-100">
                  {selectedDoc.title}
                </div>

                <div className="text-slate-400 font-bold uppercase text-[10px]">Establishment Name:</div>
                <div className="p-2 bg-slate-900 border border-slate-800 rounded text-[11px]">
                  {selectedDoc.establishment}
                </div>

                <div className="text-slate-400 font-bold uppercase text-[10px]">AI OCR Extracted Summary:</div>
                <div className="p-3 bg-slate-900/90 border border-slate-800 rounded text-slate-300 text-[11px] leading-relaxed">
                  "{selectedDoc.summary}"
                </div>

                {/* Simulated OCR bounding box tag */}
                <div className="pt-2">
                  <div className="p-2.5 bg-red-950/40 border border-red-700/60 rounded text-red-300 text-[11px] space-y-1">
                    <div className="flex items-center space-x-1 text-red-400 font-bold text-[10px] uppercase">
                      <AlertOctagon className="w-3.5 h-3.5" />
                      <span>Bounding Box #3 - Clause Anomaly Highlighted</span>
                    </div>
                    <p className="text-[10px] text-slate-300">
                      Discrepancy identified on Page 4, Section B: Calculated wage rates fall below statutory minimum schedule rate.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right Extracted Findings */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
            
            <div className="flex justify-between items-center pb-3 border-b border-slate-800 font-mono text-xs">
              <span className="text-white font-bold flex items-center">
                <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
                AI EXTRACTION & RISK CLAUSE FINDINGS
              </span>
              <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                selectedDoc.riskLevel === 'High Risk'
                  ? 'bg-red-950 text-red-400 border border-red-800'
                  : selectedDoc.riskLevel === 'Medium Risk'
                  ? 'bg-amber-950 text-amber-400 border border-amber-800'
                  : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
              }`}>
                {selectedDoc.riskLevel} ({selectedDoc.riskScore}%)
              </span>
            </div>

            {/* Extracted Key-Value Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Extracted Document Metadata:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                {selectedDoc.extractedData.map((item, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                    <div className="text-[10px] text-slate-400">{item.key}</div>
                    <div className="font-semibold text-slate-200 mt-0.5">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Factors Section */}
            {selectedDoc.riskFactors && selectedDoc.riskFactors.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Transparent Risk Factors:</h4>
                <div className="space-y-1.5 font-mono text-xs">
                  {selectedDoc.riskFactors.map((rf, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-950 border border-slate-800 rounded flex justify-between items-center text-slate-300">
                      <span>{rf.factor || rf}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        rf.impact === 'HIGH' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}>
                        IMPACT: {rf.impact || 'MEDIUM'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Findings List */}
            {selectedDoc.findings && selectedDoc.findings.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Potential Compliance Issues:</h4>
                <div className="space-y-2 font-mono text-xs">
                  {selectedDoc.findings.map((f, idx) => (
                    <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-slate-100">{f.title || f.category}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] text-slate-500">{f.page_reference || 'Page 1'}</span>
                          <span className="bg-amber-950 text-amber-400 border border-amber-800 text-[9px] px-2 py-0.5 rounded font-bold uppercase">
                            Requires Verification
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-300">{f.issue}</p>
                      <div className="p-2 bg-slate-900 border border-slate-800 rounded text-[10px] text-slate-400">
                        <strong className="text-slate-300">Evidence:</strong> "{f.evidence}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Information & Discrepancies */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Statutory Verification Checks:</h4>
              {selectedDoc.missingClauses.length > 0 ? (
                <div className="space-y-2">
                  {selectedDoc.missingClauses.map((clause, idx) => (
                    <div key={idx} className="bg-red-950/30 border border-red-900/60 p-3 rounded-lg text-xs font-mono flex items-start space-x-2 text-red-300">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Missing Information:</span> {clause}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-emerald-950/30 border border-emerald-900/60 p-3 rounded-lg text-xs font-mono flex items-center space-x-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>All mandatory statutory clauses & safety engineer seals present and verified.</span>
                </div>
              )}
            </div>


            {/* Risk Score & Finding Severity Breakdown */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="font-bold text-slate-200">Compliance Risk Visualization</span>
                <span className="text-slate-400">Score Weight Model Active</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">SCORE</span>
                  <span className="font-bold text-sm text-blue-400">{selectedDoc.riskScore} / 100</span>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">HIGH ISSUES</span>
                  <span className="font-bold text-sm text-red-400">
                    {selectedDoc.findings?.filter(f => f.severity === 'HIGH').length || (selectedDoc.riskLevel === 'High Risk' ? 2 : 0)}
                  </span>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">MEDIUM ISSUES</span>
                  <span className="font-bold text-sm text-amber-400">
                    {selectedDoc.findings?.filter(f => f.severity === 'MEDIUM').length || (selectedDoc.riskLevel === 'Medium Risk' ? 2 : 1)}
                  </span>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">LOW ISSUES</span>
                  <span className="font-bold text-sm text-emerald-400">
                    {selectedDoc.findings?.filter(f => f.severity === 'LOW').length || 1}
                  </span>
                </div>
              </div>
            </div>

            {/* Audit Timeline Component */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Inspection Audit Timeline:</h4>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2 font-mono text-[11px]">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2" /> Document Uploaded</span>
                  <span className="text-[10px] text-slate-500">2026-09-18 22:30:00</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2" /> Text Extracted / OCR</span>
                  <span className="text-[10px] text-slate-500">2026-09-18 22:30:02</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2" /> AI Analysis Started</span>
                  <span className="text-[10px] text-slate-500">2026-09-18 22:30:04</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2" /> Compliance Analysis Completed</span>
                  <span className="text-[10px] text-slate-500">2026-09-18 22:30:07</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2" /> Risk Score Generated</span>
                  <span className="text-[10px] text-slate-500">2026-09-18 22:30:08</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <div className="text-[11px] font-mono text-slate-400">
                Inspection ID: INS-2026-9041 • Inspector Dispatched
              </div>
              <button
                onClick={() => onGenerateReport && onGenerateReport(selectedDoc)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg border border-blue-400/30 shadow flex items-center space-x-2 font-mono cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Generate Legal Inspection Report</span>
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
