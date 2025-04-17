import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import QuoteForm from './components/QuoteForm';
import Dashboard from './components/Dashboard';
import Navbar from './navbar';

// src/App.jsx
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white">
        <Navbar />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Routes>
            <Route path="/" element={<QuoteForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
