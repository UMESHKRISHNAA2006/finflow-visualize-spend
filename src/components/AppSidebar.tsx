
import React from 'react';
import { Home, Receipt, Plane, CheckSquare, Settings, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AppSidebar = () => {
  return (
    <div className="h-screen w-64 bg-sidebar fixed left-0 top-0 flex flex-col animate-slide-in">
      <div className="p-6 flex items-center justify-center">
        <div className="rounded-full w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center overflow-hidden">
          <img 
            src="/lovable-uploads/278d2282-7efe-477a-b8f2-e8041fdab25a.png" 
            alt="User Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="text-center text-sidebar-foreground mb-6">
        <p className="font-medium">Janice Chandler</p>
      </div>
      
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          <NavItem to="/" icon={<Home size={18} />} label="Home" active />
          <NavItem to="/expenses" icon={<Receipt size={18} />} label="Expenses" />
          <NavItem to="/trips" icon={<Plane size={18} />} label="Trips" />
          <NavItem to="/approvals" icon={<CheckSquare size={18} />} label="Approvals" />
          <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" />
          <NavItem to="/support" icon={<HelpCircle size={18} />} label="Support" />
        </ul>
      </nav>
      
      <div className="p-4 mt-auto">
        <div className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-4 flex items-center justify-center">
          <span className="text-gradient font-bold text-lg">EXPENSIO</span>
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem = ({ to, icon, label, active }: NavItemProps) => {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all-200 hover:bg-sidebar-accent ${
          active ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground'
        }`}
      >
        <span className="text-lg">{icon}</span>
        <span className="font-medium">{label}</span>
      </Link>
    </li>
  );
};

export default AppSidebar;
