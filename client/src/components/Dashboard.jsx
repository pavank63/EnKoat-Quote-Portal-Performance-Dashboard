import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Tooltip, XAxis, YAxis, Legend, ResponsiveContainer
} from 'recharts';
import EnergyHeatmap from './EnergyHeatmap';

const Dashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [filters, setFilters] = useState({ state: '', roofType: '' });
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5000/api/quotes');
      setQuotes(res.data);
      setFilteredQuotes(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const { state, roofType } = filters;
    const filtered = quotes.filter(q =>
      (!state || q.state === state) &&
      (!roofType || q.roofType === roofType)
    );
    setFilteredQuotes(filtered);
  }, [filters, quotes]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const uniqueStates = [...new Set(quotes.map(q => q.state))];
  const uniqueTypes = [...new Set(quotes.map(q => q.roofType))];

  // === 📊 Prepare Data ===
  const projectsByState = Object.entries(
    filteredQuotes.reduce((acc, q) => {
      acc[q.state] = (acc[q.state] || 0) + 1;
      return acc;
    }, {})
  ).map(([state, count]) => ({ state, count }));

  const avgRoofByType = Object.entries(
    filteredQuotes.reduce((acc, q) => {
      if (!acc[q.roofType]) acc[q.roofType] = { total: 0, count: 0 };
      acc[q.roofType].total += q.roofSize;
      acc[q.roofType].count += 1;
      return acc;
    }, {})
  ).map(([roofType, { total, count }]) => ({ roofType, avg: total / count }));

  const monthlyTrend = filteredQuotes.reduce((acc, q) => {
    const month = new Date(q.projectDate).toISOString().slice(0, 7);
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
  const monthlyTrendData = Object.entries(monthlyTrend).map(([month, count]) => ({ month, count }));

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 text-center mb-10">📊 Project Performance Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Filters: Can filter by State, Rooftype*/}
          <div className="bg-white p-4 mb-6 rounded-lg shadow flex flex-col md:flex-row gap-4 justify-center items-center">
            <div>
              <label className="mr-2 font-medium text-gray-700">State:</label>
              <select
                name="state"
                value={filters.state}
                onChange={handleFilterChange}
                className="px-3 py-1 border rounded"
              >
                <option value="">All</option>
                {uniqueStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mr-2 font-medium text-gray-700">Roof Type:</label>
              <select
                name="roofType"
                value={filters.roofType}
                onChange={handleFilterChange}
                className="px-3 py-1 border rounded"
              >
                <option value="">All</option>
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bar Chart: Projects by State */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Projects by State</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectsByState}>
                <XAxis dataKey="state" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart: Avg Roof Size by Roof Type */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Avg Roof Size by Roof Type</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={avgRoofByType}
                  dataKey="avg"
                  nameKey="roofType"
                  outerRadius={100}
                  label
                >
                  {avgRoofByType.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart: Monthly Trend */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300 col-span-1 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Monthly Trend of Submissions</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrendData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
