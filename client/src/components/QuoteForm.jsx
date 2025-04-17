import React, { useState } from 'react';
import axios from 'axios';

const QuoteForm = () => {
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
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/quotes', form);
      alert('Quote submitted successfully!');
      setForm({
        contractorName: '',
        company: '',
        roofSize: '',
        roofType: '',
        city: '',
        state: '',
        projectDate: ''
      });
    } catch (err) {
      console.error(err);
      alert('Error submitting quote');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-3xl space-y-6">
        <h2 className="text-3xl font-extrabold text-blue-800 text-center mb-4">📄 Roofing Quote Submission</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'contractorName', label: 'Contractor Name' },
            { name: 'company', label: 'Company' },
            { name: 'roofSize', label: 'Roof Size (sq ft)', type: 'number' },
            { name: 'city', label: 'Project City' },
            { name: 'state', label: 'Project State' },
            { name: 'projectDate', label: 'Project Date', type: 'date' }
          ].map(({ name, label, type = 'text' }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                id={name}
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label htmlFor="roofType" className="block text-sm font-medium text-gray-700 mb-1">Roof Type</label>
            <select
              name="roofType"
              value={form.roofType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Roof Type</option>
              <option value="Metal">Metal</option>
              <option value="TPO">TPO</option>
              <option value="Foam">Foam</option>
              <option value="Asphalt">Asphalt</option>
            </select>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            🚀 Submit Quote
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuoteForm;
