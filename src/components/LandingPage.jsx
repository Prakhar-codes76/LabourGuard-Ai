import React, { useState } from 'react';
import { 
  ShieldCheck, FileSearch, AlertOctagon, FileText, Globe, 
  CheckCircle2, Lock, KeyRound, Database, FileSpreadsheet,
  ArrowRight, Activity, HardHat, Cpu, BarChart3, Building2,
  Sliders, Layers, Terminal, Sparkles, ChevronRight, Eye
} from 'lucide-react';

export default function LandingPage({ onStartInspection, onExplorePlatform, setActiveView }) {
  const [activeTab, setActiveTab] = useState('docAI');

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-blue-600 selection:text-white">
      {/* HACKATHON PROTOTYPE NOTICE BANNER */}
      <div className="bg-slate-900 border-b border-slate-800 py-2.5 px-4 text-center text-xs text-slate-300 flex items-center justify-center space-x-2 font-mono">
        <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">
          Hackathon Prototype
        </span>
        <span>
          LabourGuard AI is an independent technical demonstrator for labour compliance & document risk analysis. Not affiliated with any official government ministry.
        </span>
      </div>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 border-b border-slate-800 tech-grid-pattern-dark">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 bg-slate-900/90 border border-slate-700/80 px-3.5 py-1.5 rounded-full text-xs font-mono text-cyan-400">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>INSPECTION TECH ENGINE v2.4</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400">OCR & RISK MATRIX ENABLED</span>
              </div>

              <div className="space-y-3">
                <div className="inline-block bg-blue-950/80 text-blue-300 text-xs font-semibold px-2.5 py-1 rounded border border-blue-800/80 uppercase tracking-widest font-mono">
                  LabourGuard AI
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                  AI-Powered Labour Compliance Inspection & Risk Analysis
                </h1>
              </div>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Intelligent document analysis and risk-based compliance insights for modern labour inspection. Transform paper-heavy audit trails into structured, verifiable risk intelligence.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  onClick={onStartInspection}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3.5 rounded-lg shadow-lg shadow-blue-900/40 border border-blue-400/30 transition-all flex items-center space-x-2 group cursor-pointer"
                >
                  <HardHat className="w-4 h-4 text-blue-200" />
                  <span>Start Inspection</span>
                  <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('features-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold px-6 py-3.5 rounded-lg border border-slate-700 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-slate-400" />
                  <span>Explore Platform</span>
                </button>
              </div>

              {/* Technical Indicator Badges */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-left font-mono">
                <div>
                  <div className="text-xs text-slate-400">OCR ACCURACY</div>
                  <div className="text-lg font-bold text-white">99.4%</div>
                  <div className="text-[10px] text-slate-400">Multi-lingual layout recognition</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">STATUTORY ACTS</div>
                  <div className="text-lg font-bold text-cyan-400">14 Acts Covered</div>
                  <div className="text-[10px] text-slate-400">Factories, Wages & OSH Code</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">INSPECTION SPEED</div>
                  <div className="text-lg font-bold text-emerald-400">&lt; 3 Seconds</div>
                  <div className="text-[10px] text-slate-400">Per 20-page document batch</div>
                </div>
              </div>

            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 border border-slate-700/80 rounded-xl overflow-hidden shadow-2xl relative group">
                
                {/* Header bar of visual preview */}
                <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex justify-between items-center text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    <span className="text-slate-400 ml-2 font-semibold">FIELD TELEMETRY MONITORS</span>
                  </div>
                  <span className="text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60 text-[10px]">
                    LIVE SYNC
                  </span>
                </div>

                {/* Hero Image Container */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-950">
                  <img
                    src="/field_inspection_hero.jpg"
                    alt="Labour Field Inspection System"
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  
                  {/* Radar Scanning animation overlay */}
                  <div className="animate-radar-scan"></div>

                  {/* Overlaid Live Inspection Badge */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur border border-slate-700 p-3 rounded-lg text-xs space-y-2">
                    <div className="flex justify-between items-center font-mono">
                      <span className="text-slate-300 font-semibold flex items-center">
                        <Activity className="w-3.5 h-3.5 text-blue-400 mr-1.5" />
                        PUNE INDUSTRIAL SECTOR-4
                      </span>
                      <span className="text-amber-400 bg-amber-950/90 border border-amber-800 px-2 py-0.5 rounded text-[10px]">
                        SCORE: 58.5 / 100
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-[58.5%]"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>Anomalies: 3 High Risk Clauses</span>
                      <span>Muster Roll & PPE Gaps</span>
                    </div>
                  </div>
                </div>

                {/* Footer specs of visual card */}
                <div className="bg-slate-950 p-4 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>OCR Integrity: Verified</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Audit Trail Logged</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section id="features-section" className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-950 text-blue-300 border border-blue-800 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              <span>Technical Capabilities</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Engineered for Modern Labour Compliance & Enforcement
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Built to equip compliance officers and inspectors with verifiable AI tools for document parsing, statutory risk scoring, and field reports.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-slate-950 border border-slate-800 hover:border-blue-500/50 rounded-xl p-6 transition-all space-y-4 hover:shadow-xl hover:shadow-blue-950/30 group">
              <div className="w-12 h-12 rounded-lg bg-blue-900/30 border border-blue-700/40 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <FileSearch className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                AI Document Intelligence
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Analyze PDFs, scanned documents, and images. Automatically parse wage registers, attendance muster rolls, safety certifications, and contractor agreements.
              </p>
              <div className="pt-2 flex items-center text-xs text-blue-400 font-mono space-x-1">
                <span>Multi-format Parsing</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-950 border border-slate-800 hover:border-amber-500/50 rounded-xl p-6 transition-all space-y-4 hover:shadow-xl hover:shadow-amber-950/30 group">
              <div className="w-12 h-12 rounded-lg bg-amber-900/30 border border-amber-700/40 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                Compliance Analysis
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Identify potential missing information, wage rate discrepancies, unrecorded overtime hours, and mandatory safety equipment gaps under statutory acts.
              </p>
              <div className="pt-2 flex items-center text-xs text-amber-400 font-mono space-x-1">
                <span>Statutory Acts Check</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-950 border border-slate-800 hover:border-red-500/50 rounded-xl p-6 transition-all space-y-4 hover:shadow-xl hover:shadow-red-950/30 group">
              <div className="w-12 h-12 rounded-lg bg-red-900/30 border border-red-700/40 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                Risk Intelligence
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Generate transparent risk levels and compliance scores (0-100%). Prioritize inspection dispatches based on objective document risk anomalies.
              </p>
              <div className="pt-2 flex items-center text-xs text-red-400 font-mono space-x-1">
                <span>District Risk Heatmap</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-6 transition-all space-y-4 hover:shadow-xl hover:shadow-emerald-950/30 group">
              <div className="w-12 h-12 rounded-lg bg-emerald-900/30 border border-emerald-700/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                Inspection Reports
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Generate structured, audit-ready inspection reports from analyzed documents. Format findings into official legal templates ready for review.
              </p>
              <div className="pt-2 flex items-center text-xs text-emerald-400 font-mono space-x-1">
                <span>Printable Audit PDF</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-6 transition-all space-y-4 hover:shadow-xl hover:shadow-cyan-950/30 group">
              <div className="w-12 h-12 rounded-lg bg-cyan-900/30 border border-cyan-700/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                Multilingual & Accessible
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Designed to support multilingual document parsing and low-tech field access channels for on-site inspectors working in remote industrial belts.
              </p>
              <div className="pt-2 flex items-center text-xs text-cyan-400 font-mono space-x-1">
                <span>Field Device Ready</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Feature 6 - Infrastructure Integration */}
            <div className="bg-slate-950 border border-slate-800 hover:border-purple-500/50 rounded-xl p-6 transition-all space-y-4 hover:shadow-xl hover:shadow-purple-950/30 group">
              <div className="w-12 h-12 rounded-lg bg-purple-900/30 border border-purple-700/40 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                Public Infrastructure Hub
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Seamlessly connects district compliance registries, environmental health monitoring sensors, and factory inspection databases into one unified command panel.
              </p>
              <div className="pt-2 flex items-center text-xs text-purple-400 font-mono space-x-1">
                <span>Unified Inspector Portal</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECURITY & ARCHITECTURE SECTION */}
      <section className="py-20 bg-slate-950 border-b border-slate-800 tech-grid-pattern-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-700 px-3 py-1 rounded-full text-xs font-mono text-slate-300">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>ENTERPRISE ARCHITECTURE</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Built for High Reliability & Responsible Data Handling
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Designed with standard enterprise security guidelines, cryptographic hash verifications, and audit logging to ensure transparent document verification without making unverified claims.
              </p>
              
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center space-x-2 text-slate-300 bg-slate-900 p-2.5 rounded border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No unverified "100% security" claims — realistic defense in depth</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300 bg-slate-900 p-2.5 rounded border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Granular role-based access for inspectors vs admins</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-lg space-y-2">
                <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-sm font-mono">
                  <Database className="w-4 h-4" />
                  <span>Secure Document Processing</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Documents are processed in memory with isolated sandboxing and automatic sanitization before OCR evaluation.
                </p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-lg space-y-2">
                <div className="flex items-center space-x-2 text-blue-400 font-semibold text-sm font-mono">
                  <KeyRound className="w-4 h-4" />
                  <span>Protected API Architecture</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Stateless REST endpoints with token authentication and rate-limiting safeguards against unauthorized access.
                </p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-lg space-y-2">
                <div className="flex items-center space-x-2 text-amber-400 font-semibold text-sm font-mono">
                  <Sliders className="w-4 h-4" />
                  <span>Role-Based Access</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Strict separation of permissions between Field Inspectors, Compliance Officers, and District Administrators.
                </p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-lg space-y-2">
                <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-sm font-mono">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Audit-Friendly Records</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Every extraction anomaly is linked to an immutable SHA-256 hash log for audit transparency.
                </p>
              </div>

              <div className="sm:col-span-2 bg-slate-900/90 border border-slate-800 p-5 rounded-lg space-y-2">
                <div className="flex items-center space-x-2 text-purple-400 font-semibold text-sm font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Privacy-Aware Design</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Personal Identifiable Information (PII) masking options ensure worker identity protection while preserving statutory compliance auditing accuracy.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="py-16 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center px-4 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to inspect documents with LabourGuard AI?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Experience the full command-center environment, analyze sample statutory wage registers, or test multi-role compliance workflows.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={onStartInspection}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all text-xs font-mono flex items-center space-x-2 cursor-pointer"
            >
              <HardHat className="w-4 h-4" />
              <span>Launch Command Center</span>
            </button>
            <button
              onClick={() => setActiveView('login')}
              className="bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold px-6 py-3 rounded-lg border border-slate-700 transition-all text-xs font-mono flex items-center space-x-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Portal Login</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-10 border-t border-slate-800 text-slate-400 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-4">
          <div className="space-y-1">
            <p className="text-slate-200 font-bold font-sans text-sm">LabourGuard AI</p>
            <p className="text-slate-400">Hackathon Prototype • Technical Demonstrator for Labour Compliance Inspection</p>
          </div>
          <div className="flex items-center space-x-4">
            <span>System Status: Operational</span>
            <span>•</span>
            <span>OCR Engine v3.4</span>
            <span>•</span>
            <button onClick={() => setActiveView('login')} className="text-blue-400 hover:underline">
              Portal Sign In
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
