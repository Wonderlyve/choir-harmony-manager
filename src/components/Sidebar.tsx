
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Users, ChevronRight, Music, Church } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMembers } from '@/context/MemberContext';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  const { getParishes } = useMembers();
  
  const parishes = getParishes();

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  return (
    <div className={cn("w-64 bg-sidebar text-sidebar-foreground min-h-screen p-4 flex flex-col", className)}>
      <div className="flex items-center gap-2 mb-8 px-2">
        <Music size={28} className="text-white" />
        <h1 className="text-xl font-bold">Chorale Manager</h1>
      </div>

      <nav className="flex-1 space-y-1">
        <Link to="/dashboard">
          <Button 
            variant={isActiveRoute('/dashboard') ? "secondary" : "ghost"} 
            className={cn(
              "w-full justify-start mb-1",
              isActiveRoute('/dashboard') 
                ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                : "hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
            )}
          >
            <Home className="mr-2 h-4 w-4" />
            Tableau de bord
          </Button>
        </Link>

        <div className="pt-2 pb-1">
          <div className="px-3 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
            Chorales
          </div>
        </div>

        <Link to="/chorale/Homme">
          <Button 
            variant={isActiveRoute('/chorale/Homme') ? "secondary" : "ghost"} 
            className={cn(
              "w-full justify-start mb-1",
              isActiveRoute('/chorale/Homme') 
                ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                : "hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
            )}
          >
            <ChevronRight className="mr-2 h-4 w-4" />
            Chorale Hommes
          </Button>
        </Link>

        <Link to="/chorale/Femme">
          <Button 
            variant={isActiveRoute('/chorale/Femme') ? "secondary" : "ghost"} 
            className={cn(
              "w-full justify-start mb-1",
              isActiveRoute('/chorale/Femme') 
                ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                : "hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
            )}
          >
            <ChevronRight className="mr-2 h-4 w-4" />
            Chorale Femmes
          </Button>
        </Link>

        <div className="pt-4 pb-1">
          <div className="px-3 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
            Paroisses
          </div>
        </div>

        {parishes.map((parish) => (
          <Link key={parish.id} to={`/paroisse/${parish.name}`}>
            <Button 
              variant={isActiveRoute(`/paroisse/${parish.name}`) ? "secondary" : "ghost"} 
              className={cn(
                "w-full justify-start mb-1",
                isActiveRoute(`/paroisse/${parish.name}`) 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
              )}
            >
              <Church className="mr-2 h-4 w-4" />
              {parish.name}
              <span className="ml-auto bg-sidebar-primary/30 text-sidebar-foreground/90 px-1.5 py-0.5 rounded text-xs">
                {parish.memberCount}
              </span>
            </Button>
          </Link>
        ))}

        <div className="pt-4 pb-1">
          <div className="px-3 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
            Gestion
          </div>
        </div>

        <Link to="/membres">
          <Button 
            variant={isActiveRoute('/membres') ? "secondary" : "ghost"} 
            className={cn(
              "w-full justify-start",
              isActiveRoute('/membres') 
                ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                : "hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
            )}
          >
            <Users className="mr-2 h-4 w-4" />
            Tous les membres
          </Button>
        </Link>

      </nav>
    </div>
  );
};

export default Sidebar;
