// src/components/features/auth/LoginMenu.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginMenu = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = (path: string) => {
    setShowDropdown(false);
    navigate(path);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="hover:text-gray-200 flex items-center space-x-1"
      >
        <span>Login</span>
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

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <button
            onClick={() => handleOptionClick('/login')}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            User Login
          </button>
          <button
            onClick={() => handleOptionClick('/admin-login')}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Admin Login
          </button>
        </div>
      )}
    </div>
  );
};