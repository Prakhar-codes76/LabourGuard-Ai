import React, { useState } from 'react';
import { 
  LayoutDashboard, ClipboardList, FileText, Scale, Map, 
  FileSpreadsheet, BarChart3, Sliders, Bell, Search, Shield, 
  UserCheck, AlertTriangle, FileCheck, ShieldCheck, ChevronRight,
  TrendingUp, PieChart, Layers, HardHat, LogOut, CheckCircle2, User, X
} from 'lucide-react';
import { 
  mockUser, rolePresets, metricCards, recentInspections, 
  systemNotifications 
} from '../data/mockData';

import DocumentIntelligence from './DocumentIntelligence';
import InspectionsList from './InspectionsList';
import RiskMap from './RiskMap';
import ComplianceMatrix from './ComplianceMatrix';
import InspectionReports from './InspectionReports';
import AnalyticsView from './AnalyticsView';
import SettingsView from './SettingsView';

import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart as RePieChart, Pie, Cell, BarChart, Bar 
} from 'recharts';
import { 
  complianceTrendData, riskDistributionData, 
  inspectionActivityData, findingCategoriesData 
} from '../data/mockData';

export default function Dashboard({ currentUser, setCurrentUser, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeDocForReport, setActiveDocForReport] = useState(null);
  const [selectedInspectionDetail, setSelectedInspectionDetail] = useState(null);

  const sidebarNavItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inspections', label: 'Inspections', icon: ClipboardList },
    { id: 'documents', label: 'Documents (AI OCR)', icon: FileText },
    { id: 'compliance', label: 'Compliance', icon: Scale },
    { id: 'risk', label: 'Risk Intelligence', icon: Map },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Sliders },
  ];

  const handleGenerateReportForDoc = (doc) => {
    setActiveDocForReport(doc);
    setActiveTab('reports');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'documents':
        return <DocumentIntelligence onGenerateReport={handleGenerateReportForDoc} />;
      case 'inspections':
        return <InspectionsList onSelectInspection={(item) => setSelectedInspectionDetail(item)} />;
      case 'compliance':
        return <ComplianceMatrix />;
      case 'risk':
        return <RiskMap />;
      case 'reports':
        return <InspectionReports activeDoc={activeDocForReport} />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      case 'overview':
      default:
        return renderOverviewTab();
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      
      {/* Top Welcome Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-wrap justify-between items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-950 text-blue-400 border border-blue-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
              COMMAND CENTER
            </span>
            <span className="text-slate-500 font-mono text-xs">•</span>
            <span className="text-slate-300 font-mono text-xs">{currentUser.district}</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Welcome back, {currentUser.name}
          </h2>
          <p className="text-xs text-slate-400">
            Role: <strong className="text-slate-200">{currentUser.role}</strong> ({currentUser.badgeId}) • All regional monitoring systems active.
          </p>
        </div>

        <div className="flex items-center space-x-3 font-mono text-xs">
          <button
            onClick={() => setActiveTab('documents')}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2.5 rounded-lg border border-blue-400/30 flex items-center space-x-2 shadow cursor-pointer transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Analyze New Document</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card, idx) => {
          const IconComp = card.icon === 'FileCheck' ? FileCheck
            : card.icon === 'ClipboardList' ? ClipboardList
            : card.icon === 'ShieldCheck' ? ShieldCheck
            : AlertTriangle;

          return (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3 hover:border-slate-700 transition-all">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono text-slate-400 font-semibold">{card.title}</span>
                <div className={`p-2 rounded-lg ${
                  card.icon === 'AlertTriangle' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-slate-950 text-blue-400 border border-slate-800'
                }`}>
                  <IconComp className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="text-2xl font-extrabold text-white font-mono">{card.value}</div>
                <div className={`text-[11px] font-mono mt-1 ${card.positive ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {card.change}
                </div>
              </div>

              <p className="text-[10px] text-slate-400 font-sans border-t border-slate-800/80 pt-2">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Charts Grid (4 Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Compliance Trend */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 font-mono text-xs">
            <span className="text-white font-bold flex items-center">
              <TrendingUp className="w-4 h-4 text-blue-400 mr-2" />
              COMPLIANCE SCORE TREND
            </span>
            <span className="text-emerald-400">+3.1% Improvement</span>
          </div>
          <div className="h-56 w-full text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complianceTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis domain={[60, 100]} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} name="Compliance %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Risk Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 font-mono text-xs">
            <span className="text-white font-bold flex items-center">
              <PieChart className="w-4 h-4 text-amber-400 mr-2" />
              RISK LEVEL DISTRIBUTION
            </span>
            <span className="text-slate-400">1,482 Units</span>
          </div>
          <div className="h-56 w-full text-xs font-mono flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Weekly Inspection Activity */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 font-mono text-xs">
            <span className="text-white font-bold flex items-center">
              <ClipboardList className="w-4 h-4 text-cyan-400 mr-2" />
              WEEKLY FIELD INSPECTIONS
            </span>
            <span className="text-slate-400">Completed vs Flagged</span>
          </div>
          <div className="h-56 w-full text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inspectionActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
                <Bar dataKey="flagged" fill="#ef4444" name="Anomalies Flagged" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Finding Categories */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 font-mono text-xs">
            <span className="text-white font-bold flex items-center">
              <Layers className="w-4 h-4 text-purple-400 mr-2" />
              TOP STATUTORY FINDING CATEGORIES
            </span>
            <span className="text-slate-400">Violations Flagged</span>
          </div>
          <div className="h-56 w-full text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={findingCategoriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="category" type="category" width={150} stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Bar dataKey="count" fill="#8b5cf6" name="Violations" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* RECENT INSPECTIONS TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 shadow-xl">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 font-mono text-xs">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Recent Field Inspections</h3>
            <p className="text-slate-400 text-xs mt-0.5">Automated document parsing results and field officer audit updates.</p>
          </div>
          <button 
            onClick={() => setActiveTab('inspections')} 
            className="text-blue-400 hover:underline font-bold flex items-center space-x-1 cursor-pointer"
          >
            <span>View All Registry</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Inspection ID</th>
                <th className="py-3 px-4 font-semibold">Establishment</th>
                <th className="py-3 px-4 font-semibold">Document Type / Act</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Compliance Score</th>
                <th className="py-3 px-4 font-semibold">Risk Level</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {recentInspections.map((row) => (
                <tr key={row.id} className="hover:bg-slate-800/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-blue-400">{row.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-100">{row.establishment}</td>
                  <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate">{row.type}</td>
                  <td className="py-3.5 px-4 text-slate-400">{row.date}</td>
                  <td className="py-3.5 px-4 font-bold">
                    <span className={
                      row.complianceScore < 65 ? 'text-red-400' : row.complianceScore < 85 ? 'text-amber-400' : 'text-emerald-400'
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
                  <td className="py-3.5 px-4 text-slate-300">{row.status}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedInspectionDetail(row)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] px-3 py-1 rounded border border-slate-700 cursor-pointer font-mono"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );

  return (
    <div className="bg-slate-950 min-h-[calc(100vh-4rem)] text-slate-100 font-sans flex">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 shrink-0 flex flex-col justify-between hidden md:flex">
        <div className="p-4 space-y-4">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-3 pt-2">
            Command Center Navigation
          </div>

          <nav className="space-y-1 font-mono text-xs">
            {sidebarNavItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer font-medium ${
                    isActive 
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-950' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-4 border-t border-slate-800 font-mono text-xs space-y-2">
          <div className="flex items-center space-x-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-8 h-8 rounded-full border border-blue-500 object-cover" 
            />
            <div className="truncate">
              <p className="font-bold text-slate-200 truncate">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{currentUser.role}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full text-left px-3 py-1.5 text-[11px] text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Top Operational Bar */}
        <div className="flex flex-wrap justify-between items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
          
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              {sidebarNavItems.find(i => i.id === activeTab)?.label}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            
            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 text-slate-300 hover:text-white relative cursor-pointer"
              >
                <Bell className="w-4 h-4 text-slate-300" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 p-4 space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-bold text-white">System Notifications</span>
                    <button onClick={() => setNotificationsOpen(false)} className="text-slate-500 hover:text-white">✕</button>
                  </div>
                  <div className="space-y-2">
                    {systemNotifications.map((notif) => (
                      <div key={notif.id} className="p-2.5 bg-slate-950 rounded border border-slate-800 space-y-1">
                        <div className="font-bold text-slate-200">{notif.title}</div>
                        <p className="text-[11px] text-slate-400">{notif.message}</p>
                        <div className="text-[9px] text-slate-500 text-right">{notif.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Role Switcher Header Selector */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 text-xs font-mono text-slate-200 flex items-center space-x-2 cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Switch Role ({currentUser.role.split(' ')[0]})</span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 p-3 space-y-2 font-mono text-xs">
                  <div className="text-[10px] text-slate-400 uppercase font-bold px-2">Active Officer Role Preset:</div>
                  {rolePresets.map((preset) => (
                    <button
                      key={preset.role}
                      onClick={() => {
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
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left p-2 rounded hover:bg-slate-800 flex justify-between text-slate-300 hover:text-white"
                    >
                      <span>{preset.role}</span>
                      <span className="text-[10px] text-slate-500">{preset.badge}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

        {/* RENDER ACTIVE TAB */}
        {renderTabContent()}

      </main>

      {/* INSPECTION DETAIL MODAL OVERVIEW */}
      {selectedInspectionDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 max-w-xl w-full rounded-xl overflow-hidden shadow-2xl space-y-4">
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center font-mono">
              <span className="text-white font-bold text-xs">{selectedInspectionDetail.id} - Inspection Detail</span>
              <button onClick={() => setSelectedInspectionDetail(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="p-6 space-y-4 font-mono text-xs text-slate-300">
              <div>
                <span className="text-slate-400 block text-[10px]">ESTABLISHMENT</span>
                <span className="text-white font-bold text-sm">{selectedInspectionDetail.establishment}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 bg-slate-950 p-3 rounded border border-slate-800">
                <div>
                  <span className="text-slate-500 text-[10px] block">COMPLIANCE SCORE</span>
                  <span className="font-bold text-amber-400">{selectedInspectionDetail.complianceScore}%</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">RISK LEVEL</span>
                  <span className="font-bold text-red-400">{selectedInspectionDetail.riskLevel}</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-950 p-4 border-t border-slate-800 flex justify-end">
              <button 
                onClick={() => setSelectedInspectionDetail(null)} 
                className="px-4 py-2 bg-slate-800 text-xs font-mono text-slate-300 hover:text-white rounded border border-slate-700"
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
