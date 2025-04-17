import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import QuoteForm from './components/QuoteForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <nav className="bg-blue-800 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">🏗️ EnKoat Portal</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Submit Quote</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<QuoteForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
