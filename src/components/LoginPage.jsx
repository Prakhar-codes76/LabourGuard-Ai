import React, { useState } from 'react';
import { 
  Shield, Lock, Mail, Key, CheckSquare, Square, AlertCircle, 
  ArrowRight, UserCheck, Cpu, HardHat, Building2, Eye, EyeOff, CheckCircle2
} from 'lucide-react';
import { rolePresets } from '../data/mockData';
import { apiClient } from '../services/apiClient';

export default function LoginPage({ onLoginSuccess, activeRole, setActiveRole, setCurrentUser }) {
  const [name, setName] = useState('Rajesh V. Sharma');
  const [email, setEmail] = useState('r.sharma@labourguard.org');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRolePresetSelect = (preset) => {
    setName(preset.name);
    setEmail(preset.email);
    setPassword('••••••••••••');
    setActiveRole(preset.role);
    setCurrentUser({
      name: preset.name,
      title: preset.role,
      district: preset.district,
      role: preset.role,
      badgeId: preset.badge,
      email: preset.email,
      avatar: preset.role === 'Field Inspector' 
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        : preset.role === 'District Administrator'
        ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (isRegistering) {
        const res = await apiClient.register(name, email, password, activeRole === 'District Administrator' ? 'admin' : activeRole === 'Field Inspector' ? 'inspector' : 'employer');
        setSuccessMsg('Officer account registered successfully. Logging in...');
        if (res.user) {
          setCurrentUser(prev => ({ ...prev, name: res.user.name, email: res.user.email, role: res.user.role }));
        }
      } else {
        const res = await apiClient.login(email, password);
        setSuccessMsg('Authenticated securely with FastAPI server. Redirecting to Command Center...');
        if (res.user) {
          setCurrentUser(prev => ({ ...prev, name: res.user.name, email: res.user.email, role: res.user.role }));
        }
      }
      setTimeout(() => {
        setLoading(false);
        onLoginSuccess();
      }, 700);
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Authentication error. Please check server connection.');
    }
  };


  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        
        {/* LEFT SIDE: BRANDING & FIELD INSPECTION VISUAL */}
        <div className="lg:col-span-5 relative p-8 sm:p-10 flex flex-col justify-between bg-slate-950 border-r border-slate-800 text-white tech-grid-pattern-dark">
          
          {/* Visual Background image overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
            <img 
              src="/digital_compliance_banner.jpg" 
              alt="Compliance portal backdrop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-900/60 border border-blue-500/50 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight font-sans">LabourGuard <span className="text-blue-400">AI</span></h1>
                <p className="text-[11px] text-slate-400 font-mono">Labour Compliance Platform</p>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1 rounded text-xs font-mono">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Hackathon Prototype Portal</span>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Secure access portal for authorized field inspectors, compliance officers, and public enforcement administrators.
            </p>

            {/* Quick Role Tester Buttons */}
            <div className="pt-2 space-y-2">
              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Quick Preset Switcher for Demo:</p>
              <div className="space-y-1.5">
                {rolePresets.map((preset) => (
                  <button
                    key={preset.role}
                    type="button"
                    onClick={() => handleRolePresetSelect(preset)}
                    className={`w-full text-left p-2.5 rounded border text-xs font-mono flex items-center justify-between transition-all ${
                      email === preset.email 
                        ? 'bg-blue-950/90 border-blue-500 text-blue-300' 
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {preset.role === 'Field Inspector' && <HardHat className="w-3.5 h-3.5 text-amber-400" />}
                      {preset.role === 'Compliance Officer' && <UserCheck className="w-3.5 h-3.5 text-blue-400" />}
                      {preset.role === 'District Administrator' && <Building2 className="w-3.5 h-3.5 text-purple-400" />}
                      <span>{preset.role}</span>
                    </div>
                    <span className="text-[10px] opacity-75">{preset.badge}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Security Protocol:</span>
              <span className="text-emerald-400">TLS 1.3 Tunnel</span>
            </div>
            <div className="flex justify-between">
              <span>Rate Limiter:</span>
              <span className="text-slate-300">Active (5 req/s)</span>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE: SECURE LOGIN FORM */}
        <div className="lg:col-span-7 p-8 sm:p-10 bg-slate-900 flex flex-col justify-between text-slate-100">
          
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {isRegistering ? 'Create Inspector Account' : 'Portal Sign In'}
              </h2>
              <p className="text-xs text-slate-400">
                {isRegistering 
                  ? 'Request credential provisioning for field inspection & compliance access.' 
                  : 'Enter your registered officer credentials to access the inspection command center.'}
              </p>
            </div>

            {errorMsg && (
              <div className="bg-red-950/80 border border-red-800 text-red-300 text-xs p-3 rounded font-mono flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs p-3 rounded font-mono flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>Official Email Address</span>
                  <span className="text-[10px] text-slate-400 font-mono">*.labourguard.org</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="officer.name@labourguard.org"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-md text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-slate-300">Password</label>
                  {!isRegistering && (
                    <button 
                      type="button" 
                      onClick={() => alert('Password reset tokens can be requested via your District Admin.')}
                      className="text-xs text-blue-400 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Key className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-md text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Checkbox Remember me */}
              {!isRegistering && (
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setRememberMe(!rememberMe)}
                    className="flex items-center space-x-2 text-xs text-slate-300 hover:text-white cursor-pointer"
                  >
                    {rememberMe ? (
                      <CheckSquare className="w-4 h-4 text-blue-500" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600" />
                    )}
                    <span>Remember officer session on this workstation</span>
                  </button>
                </div>
              )}

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-md shadow-md transition-all flex items-center justify-center space-x-2 text-xs font-mono uppercase tracking-wider cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isRegistering ? 'Submit Credential Request' : 'Login to Command Center'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </form>

            {/* Create account toggle */}
            <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
              {isRegistering ? (
                <span>
                  Already have officer credentials?{' '}
                  <button 
                    onClick={() => setIsRegistering(false)} 
                    className="text-blue-400 hover:underline font-semibold cursor-pointer"
                  >
                    Sign In
                  </button>
                </span>
              ) : (
                <span>
                  Need new officer access?{' '}
                  <button 
                    onClick={() => setIsRegistering(true)} 
                    className="text-blue-400 hover:underline font-semibold cursor-pointer"
                  >
                    Create account
                  </button>
                </span>
              )}
            </div>

          </div>

          <div className="pt-6 text-[10px] text-slate-500 font-mono text-center">
            LabourGuard AI • Security System Indicator • Protected Environment
          </div>

        </div>

      </div>

    </div>
  );
}
