
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { MemberProvider } from '@/context/MemberContext';

const Layout: React.FC = () => {
  return (
    <MemberProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </MemberProvider>
  );
};

export default Layout;
