import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { RealtimeProvider } from '../context/RealtimeContext';
import { SettingsProvider } from '../context/SettingsContext';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SettingsProvider>
    <RealtimeProvider>
    <div className="flex min-h-screen bg-surface-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-surface-900 to-surface-900">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-h-screen flex-1 flex-col lg:ml-0">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
    </div>
    </RealtimeProvider>
    </SettingsProvider>
  );
};
