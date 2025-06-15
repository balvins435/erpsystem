import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    amount: '',
    date: '',
    uploaded_receipt: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'uploaded_receipt' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    for (let key in formData) {
      payload.append(key, formData[key]);
    }

    try {
      await axios.post('http://localhost:8000/api/finance/expenses/', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('✅ Expense recorded!');
      setFormData({ category: '', description: '', amount: '', date: '', uploaded_receipt: null });
    } catch {
      alert('❌ Failed to record expense.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold">Record Expense</h2>
      <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required className="w-full p-2 border rounded" />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded"></textarea>
      <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="file" name="uploaded_receipt" accept="image/*,application/pdf" onChange={handleChange} className="w-full p-2 border rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default ExpenseForm;
