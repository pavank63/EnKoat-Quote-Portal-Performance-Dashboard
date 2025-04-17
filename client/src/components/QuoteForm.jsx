import React, { useState } from 'react';
import axios from 'axios';

export default function QuoteForm() {
  const [form, setForm] = useState({
    contractorName: '',
    company: '',
    roofSize: '',
    roofType: '',
    city: '',
    state: '',
    projectDate: ''
  });

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/quotes', form);
      alert('Submitted!');
      setForm({
        contractorName: '',
        company: '',
        roofSize: '',
        roofType: '',
        city: '',
        state: '',
        projectDate: ''
      });
    } catch {
      alert('Error');
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">Submit a Quote</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ['contractorName', 'Contractor Name', 'text'],
            ['company', 'Company', 'text'],
            ['roofSize', 'Roof Size (sqft)', 'number'],
            ['city', 'City', 'text'],
            ['state', 'State', 'text'],
            ['projectDate', 'Project Date', 'date']
          ].map(([name, label, type]) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Roof Type
            </label>
            <select
              name="roofType"
              value={form.roofType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select...</option>
              <option>Metal</option>
              <option>TPO</option>
              <option>Foam</option>
              <option>Asphalt</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
