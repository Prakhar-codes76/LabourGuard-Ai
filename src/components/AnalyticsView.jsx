import React from 'react';
import { BarChart3, TrendingUp, PieChart, Layers, Filter } from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart as RePieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { 
  complianceTrendData, riskDistributionData, 
  inspectionActivityData, findingCategoriesData 
} from '../data/mockData';

export default function AnalyticsView() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Compliance & Risk Analytics Intelligence</h2>
            <span className="bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded ml-2">
              DEMO ANALYTICS
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Statistical monitoring of compliance drift, statutory finding frequencies, and field inspector throughput.
          </p>
        </div>
      </div>

      {/* Grid of 4 Technical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Compliance Trend */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 font-mono text-xs">
            <span className="text-white font-bold flex items-center">
              <TrendingUp className="w-4 h-4 text-emerald-400 mr-2" />
              1. COMPLIANCE TREND (MONTHLY %)
            </span>
            <span className="text-slate-400">Target: 85.0%</span>
          </div>
          <div className="h-64 w-full text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complianceTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis domain={[60, 100]} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} name="Avg Compliance Score (%)" />
                <Line type="monotone" dataKey="target" stroke="#10b981" strokeDasharray="5 5" name="Target Benchmark (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Risk Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 font-mono text-xs">
            <span className="text-white font-bold flex items-center">
              <PieChart className="w-4 h-4 text-amber-400 mr-2" />
              2. RISK DISTRIBUTION BREAKDOWN
            </span>
            <span className="text-slate-400">1,482 Units</span>
          </div>
          <div className="h-64 w-full text-xs font-mono flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
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

        {/* Chart 3: Inspection Activity */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 font-mono text-xs">
            <span className="text-white font-bold flex items-center">
              <BarChart3 className="w-4 h-4 text-cyan-400 mr-2" />
              3. WEEKLY INSPECTION ACTIVITY & DISPATCH
            </span>
            <span className="text-slate-400">Completed vs Flagged</span>
          </div>
          <div className="h-64 w-full text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inspectionActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Bar dataKey="completed" fill="#3b82f6" name="Completed Field Inspections" />
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
              4. STATUTORY FINDING CATEGORIES
            </span>
            <span className="text-slate-400">Frequency Count</span>
          </div>
          <div className="h-64 w-full text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={findingCategoriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="category" type="category" width={160} stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Bar dataKey="count" fill="#8b5cf6" name="Violations Flagged" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
