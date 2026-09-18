import React, { useState, useEffect } from 'react';
import { Shield, Cpu, Activity, LogIn, LayoutDashboard, Home, AlertCircle, FileText, Lock, Database } from 'lucide-react';
import { apiClient } from '../services/apiClient';

export default function Navbar({ activeView, setActiveView, currentUser, setCurrentUser }) {
  const [health, setHealth] = useState({ api: 'operational', database: 'connected', ai_service: 'configured' });

  useEffect(() => {
    const fetchHealth = async () => {
      const status = await apiClient.checkHealth();
      setHealth(status);
    };
    fetchHealth();
    const interval = setInterval(fetchHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-50">
      {/* Top System Banner */}
      <div className="bg-slate-950 px-4 py-1 text-xs text-slate-400 flex flex-wrap justify-between items-center border-b border-slate-800/60 font-mono">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800/60 text-[11px]">
            <AlertCircle className="w-3 h-3 mr-1 text-amber-400" />
            HACKATHON PROTOTYPE
          </span>
          <span className="hidden md:inline text-slate-400">
            Intelligent Document & Risk-Based Labour Compliance System
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className={`w-2 h-2 rounded-full ${health.api === 'operational' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
            <span className="text-slate-300">FastAPI: {health.api}</span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center space-x-1">
            <Database className="w-3 h-3 text-slate-400" />
            <span className={health.database === 'connected' ? 'text-emerald-400' : 'text-amber-400'}>
              DB: {health.database}
            </span>
          </div>
          <span className="text-slate-600">•</span>
          <span className={health.ai_service === 'configured' ? 'text-cyan-400' : 'text-slate-400'}>
            AI: {health.ai_service}
          </span>
        </div>
      </div>


      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveView('landing')}>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 border border-blue-500/40 flex items-center justify-center shadow-inner group">
            <Shield className="w-6 h-6 text-blue-400 group-hover:scale-105 transition-transform" />
            <Cpu className="w-3 h-3 text-cyan-400 absolute bottom-2 right-2" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold tracking-tight text-white font-sans">LabourGuard <span className="text-blue-400">AI</span></span>
            </div>
            <p className="text-[11px] text-slate-400 leading-none">Labour Compliance & Inspection Intelligence Platform</p>
          </div>
        </div>

        {/* View Switcher Navigation */}
        <nav className="flex items-center space-x-2 bg-slate-950/70 p-1.5 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveView('landing')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeView === 'landing'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Platform Overview</span>
          </button>

          <button
            onClick={() => setActiveView('login')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeView === 'login'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Portal Login</span>
          </button>

          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeView === 'dashboard'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Command Center</span>
          </button>
        </nav>

        {/* Action / User Context */}
        <div className="hidden sm:flex items-center space-x-3">
          {activeView === 'dashboard' ? (
            <div className="flex items-center space-x-3 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full border border-blue-400/60 object-cover"
              />
              <div className="text-left leading-tight">
                <p className="text-xs font-semibold text-slate-200">{currentUser.name}</p>
                <p className="text-[10px] text-slate-400 font-mono">{currentUser.role}</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setActiveView('dashboard')}
              className="bg-blue-700 hover:bg-blue-600 text-white font-medium text-xs px-4 py-2 rounded-md shadow transition-colors flex items-center space-x-1.5"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Launch Command Center</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
