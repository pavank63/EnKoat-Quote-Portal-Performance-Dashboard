import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import QuoteForm from './components/QuoteForm';
import Dashboard from './components/Dashboard';

// src/App.jsx
export default function App() {
  return (
    <Router>
      <header className="sticky top-0 z-50 bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <h1 className="text-2xl font-bold tracking-tight">🏗️ EnKoat Portal</h1>
          <nav className="flex space-x-6 text-sm font-medium ml-auto">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'underline underline-offset-4 text-white' : 'hover:underline text-white'
              }
            >
              Submit Quote
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? 'underline underline-offset-4 text-white' : 'hover:underline text-white'
              }
            >
              Dashboard
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Routes>
          <Route path="/" element={<QuoteForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </Router>
  );
}
