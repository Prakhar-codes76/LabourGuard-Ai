import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import { mockUser } from './data/mockData';

export default function App() {
  const [activeView, setActiveView] = useState('landing'); // 'landing' | 'login' | 'dashboard'
  const [currentUser, setCurrentUser] = useState(mockUser);
  const [activeRole, setActiveRole] = useState(mockUser.role);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Header Navbar */}
      <Navbar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      {/* Main View Container */}
      <div className="flex-1">
        {activeView === 'landing' && (
          <LandingPage 
            onStartInspection={() => setActiveView('dashboard')}
            onExplorePlatform={() => setActiveView('dashboard')}
            setActiveView={setActiveView}
          />
        )}

        {activeView === 'login' && (
          <LoginPage 
            onLoginSuccess={() => setActiveView('dashboard')}
            activeRole={activeRole}
            setActiveRole={setActiveRole}
            setCurrentUser={setCurrentUser}
          />
        )}

        {activeView === 'dashboard' && (
          <Dashboard 
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            onLogout={() => setActiveView('login')}
          />
        )}
      </div>

    </div>
  );
}
