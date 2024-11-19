// src/components/layout/Header.tsx
import { Link } from 'react-router-dom';

import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { LoginMenu } from '../../features/auth/LoginMenu';


export const Header = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setShowLogoutDropdown(false);
  };

  // Admin specific navigation
  if (user?.role === 'admin') {
    return (
      <header className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/admin/dashboard" className="text-2xl font-bold">
              OnMart Admin
            </Link>

            <nav className="flex items-center space-x-8">
              <Link to="/admin/dashboard" className="hover:text-gray-200">
                Admin Dashboard
              </Link>
              <div className="relative">
                <button
                  onClick={() => setShowLogoutDropdown(!showLogoutDropdown)}
                  className="hover:text-gray-200 flex items-center space-x-1"
                >
                  <span>{user.name}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {showLogoutDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  // Regular user navigation
  return (
    <header className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            OnMart
          </Link>

          <nav className="flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
            {user ? (
              <>
                <Link to="/orders" className="hover:text-gray-200">
                  Orders
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setShowLogoutDropdown(!showLogoutDropdown)}
                    className="hover:text-gray-200 flex items-center space-x-1"
                  >
                    <span>{user.name}</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {showLogoutDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                <Link to="/cart" className="relative hover:text-gray-200">
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </>
            ) : (
              <LoginMenu />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};