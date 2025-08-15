import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wheat, Bell, MessageCircle, User, Search, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AccountRing from '../UI/AccountRing';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Feed', href: '/feed', icon: Wheat },
    { name: 'Marketplace', href: '/marketplace', icon: Search },
    { name: 'Workplace', href: '/workplace', icon: User },
    { name: 'Messages', href: '/messages', icon: MessageCircle },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/feed" className="flex items-center space-x-2">
            <Wheat className="h-8 w-8 text-grain-600" />
            <span className="text-2xl font-bold text-grain-800">Grain</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-grain-600 bg-grain-50'
                      : 'text-gray-600 hover:text-grain-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-grain-600 hover:bg-gray-50 rounded-full">
              <Bell className="h-5 w-5" />
            </button>
            
            {user && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <AccountRing accountType={user.accountType} />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="text-sm text-gray-600 hover:text-grain-600"
                >
                  Logout
                </button>
              </div>
            )}

            <button className="md:hidden p-2 text-gray-600 hover:text-grain-600">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;