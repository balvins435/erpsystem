import React, { useState } from 'react';
import axios from 'axios';

const BudgetForm = () => {
  const [formData, setFormData] = useState({
    department: '',
    amount: '',
    year: '',
    approved: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/finance/budgets/', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('✅ Budget submitted successfully!');
      setFormData({ department: '', amount: '', year: '', approved: false });
    } catch {
      alert('❌ Failed to submit budget.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold">Submit Budget</h2>
      <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="number" name="year" placeholder="Year" value={formData.year} onChange={handleChange} required className="w-full p-2 border rounded" />
      <label className="flex items-center space-x-2">
        <input type="checkbox" name="approved" checked={formData.approved} onChange={handleChange} />
        <span>Approved</span>
      </label>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default BudgetForm;
