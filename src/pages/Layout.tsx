
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { MemberProvider } from '@/context/MemberContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Layout: React.FC = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    // Close sidebar by default on mobile
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <MemberProvider>
      <div className="flex min-h-screen">
        {/* Mobile sidebar toggle button */}
        <div className="fixed z-30 top-4 left-4 md:hidden">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleSidebar}
            className="bg-background shadow-md border-border"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>

        {/* Sidebar with responsive behavior */}
        <div 
          className={`fixed md:static z-20 transition-all duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } ${isMobile ? "w-64" : ""}`}
        >
          <Sidebar className={`${isMobile ? "min-h-screen" : ""}`} />
        </div>

        {/* Overlay for mobile */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Content area */}
        <div className={`flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto transition-all duration-300 ${
          sidebarOpen && !isMobile ? 'ml-64' : '!ml-0 w-full'
        }`}>
          {/* Add top padding on mobile to account for the toggle button */}
          <div className={`${isMobile ? 'pt-10' : ''} w-full`}>
            <Outlet />
          </div>
        </div>
      </div>
    </MemberProvider>
  );
};

export default Layout;
