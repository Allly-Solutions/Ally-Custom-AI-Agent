import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30 p-4">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Content Box */}
        <div className="flex flex-col flex-1 ml-4 bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
