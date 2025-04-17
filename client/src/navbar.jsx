// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold drop-shadow">🏗️ EnKoat Portal</h1>
        <nav className="flex space-x-6 text-sm sm:text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-1 rounded-md transition duration-300 ${
                isActive
                  ? 'bg-white text-indigo-600 font-semibold shadow-md'
                  : 'hover:bg-white/20 hover:text-white'
              }`
            }
          >
            Submit Quote
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-3 py-1 rounded-md transition duration-300 ${
                isActive
                  ? 'bg-white text-indigo-600 font-semibold shadow-md'
                  : 'hover:bg-white/20 hover:text-white'
              }`
            }
          >
            Dashboard
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
