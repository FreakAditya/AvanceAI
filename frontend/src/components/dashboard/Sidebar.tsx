import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  TrendingUp, 
  LayoutDashboard, 
  LineChart, 
  FileText, 
  BarChart3, 
  ChevronDown,
  FileStack
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

type SidebarItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  hasSubMenu?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  to, 
  icon, 
  label, 
  isActive, 
  hasSubMenu = false,
  isExpanded = false,
  onClick,
  children 
}) => {
  return (
    <div className="mb-1">
      <Link
        to={to}
        onClick={onClick}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
          isActive 
            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-100'
        }`}
      >
        <span className="flex-shrink-0">{icon}</span>
        <span className="flex-1">{label}</span>
        {hasSubMenu && (
          <ChevronDown 
            size={18} 
            className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          />
        )}
      </Link>
      
      {hasSubMenu && isExpanded && (
        <div className="ml-10 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [expandedMenu, setExpandedMenu] = useState<string | null>('paperTrading'); // Default expanded

  const toggleMenu = (menu: string) => {
    setExpandedMenu(prev => prev === menu ? null : menu);
  };

  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Handle click for items with submenus
  const handleParentClick = (e: React.MouseEvent, menu: string) => {
    e.preventDefault();
    toggleMenu(menu);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white dark:bg-dark-100 border-r border-gray-200 dark:border-gray-800">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <TrendingUp className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">InvestAI</span>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <SidebarItem
          to="/dashboard"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          isActive={location.pathname === '/dashboard'}
        />
        
        <SidebarItem
          to="/dashboard/paper-trading"
          icon={<FileStack size={20} />}
          label="Paper Trading"
          isActive={isActive('/dashboard/paper-trading')}
          hasSubMenu={true}
          isExpanded={expandedMenu === 'paperTrading'}
          onClick={(e) => handleParentClick(e, 'paperTrading')}
        >
          <Link
            to="/dashboard/paper-trading/positions"
            className={`block py-2 pl-3 rounded-md text-sm ${
              isActive('/dashboard/paper-trading/positions') 
                ? 'text-primary-600 dark:text-primary-400 font-medium' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Positions
          </Link>
          <Link
            to="/dashboard/paper-trading/orders"
            className={`block py-2 pl-3 rounded-md text-sm ${
              isActive('/dashboard/paper-trading/orders') 
                ? 'text-primary-600 dark:text-primary-400 font-medium' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Orders
          </Link>
          <Link
            to="/dashboard/paper-trading/basket-orders"
            className={`block py-2 pl-3 rounded-md text-sm ${
              isActive('/dashboard/paper-trading/basket-orders') 
                ? 'text-primary-600 dark:text-primary-400 font-medium' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Basket Orders
          </Link>
        </SidebarItem>
        
        <SidebarItem
          to="/dashboard/charts"
          icon={<LineChart size={20} />}
          label="Charts"
          isActive={isActive('/dashboard/charts')}
        />
        
        <SidebarItem
          to="/dashboard/strategy"
          icon={<BarChart3 size={20} />}
          label="Strategy"
          isActive={isActive('/dashboard/strategy')}
        />
        
        <SidebarItem
          to="/dashboard/reports"
          icon={<FileText size={20} />}
          label="Reports"
          isActive={isActive('/dashboard/reports')}
        />
      </nav>
      
      {/* User info at bottom */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button 
          onClick={handleLogout}
          className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300 rounded-md transition-colors"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;