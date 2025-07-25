
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AuthButton from './AuthButton';

interface MobileNavigationProps {
  currentPath: string;
}

const MobileNavigation = ({ currentPath }: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="p-2">
          {isOpen ? (
            <X className="h-6 w-6 text-prep-burgundy" />
          ) : (
            <Menu className="h-6 w-6 text-prep-burgundy" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeMenu}></div>
          <div className="fixed top-0 right-0 h-full w-64 bg-prep-white shadow-lg">
            <div className="flex items-center justify-between p-6 border-b border-warm-gray-light">
              <span className="text-lg font-bold text-prep-burgundy">Menu</span>
              <button onClick={closeMenu}>
                <X className="h-6 w-6 text-prep-burgundy" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <Link 
                to="/" 
                className={`block text-lg ${currentPath === '/' ? 'text-prep-burgundy font-semibold' : 'text-prep-dark-gray'} hover:text-prep-burgundy transition-colors`}
                onClick={closeMenu}
              >
                HOME
              </Link>
              <Link 
                to="/schedule" 
                className={`block text-lg ${currentPath === '/schedule' ? 'text-prep-burgundy font-semibold' : 'text-prep-dark-gray'} hover:text-prep-burgundy transition-colors`}
                onClick={closeMenu}
              >
                SCHEDULE
              </Link>
              <Link 
                to="/apply" 
                className={`block text-lg ${currentPath === '/apply' ? 'text-prep-burgundy font-semibold' : 'text-prep-dark-gray'} hover:text-prep-burgundy transition-colors`}
                onClick={closeMenu}
              >
                APPLY NOW
              </Link>
              <Link 
                to="/contact" 
                className={`block text-lg ${currentPath === '/contact' ? 'text-prep-burgundy font-semibold' : 'text-prep-dark-gray'} hover:text-prep-burgundy transition-colors`}
                onClick={closeMenu}
              >
                CONTACT
              </Link>
              <div className="pt-4 border-t border-warm-gray-light">
                <AuthButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavigation;
