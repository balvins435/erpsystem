// components/ExpenseFilterExport.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { exportToCSV } from '../../utils/csvExport'; // Adjust path if needed

const ExpenseFilterExport = () => {
  const [expenses, setExpenses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/api/finance/expenses/')
      .then(res => {
        const data = res.data || [];
        setExpenses(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load expenses:', err);
        alert('Failed to load expenses');
        setLoading(false);
      });
  }, []);

  const handleFilter = () => {
    let data = [...expenses];
    if (category) {
      data = data.filter(e => e.category?.toLowerCase().includes(category.toLowerCase()));
    }
    if (startDate) {
      data = data.filter(e => new Date(e.date) >= new Date(startDate));
    }
    if (endDate) {
      data = data.filter(e => new Date(e.date) <= new Date(endDate));
    }
    setFiltered(data);
  };

  const handleExport = () => {
    const headers = [
      { label: 'Category', key: 'category' },
      { label: 'Amount', key: 'amount' },
      { label: 'Date', key: 'date' },
      { label: 'Description', key: 'description' },
    ];

    const data = filtered.map(exp => ({
      category: exp.category || '',
      amount: exp.amount || '',
      date: exp.date || '',
      description: exp.description || '',
    }));

    exportToCSV('filtered_expenses', headers, data);
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Filter & Export Expenses</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded w-40 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded w-40 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded w-40 dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply Filter
        </button>

        {filtered.length > 0 ? (
          <button
            onClick={handleExport}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Export CSV ({filtered.length} records)
          </button>
        ) : (
          <button
            disabled
            className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
          >
            Export CSV (No data)
          </button>
        )}
      </div>

      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
          <tr>
            <th className="border p-2">Category</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map(exp => (
              <tr key={exp.id} className="text-gray-800 dark:text-white">
                <td className="border p-2">{exp.category || 'N/A'}</td>
                <td className="border p-2">{exp.amount || 0}</td>
                <td className="border p-2">{exp.date || 'N/A'}</td>
                <td className="border p-2">{exp.description || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border p-4 text-center text-gray-500">
                No expenses found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseFilterExport;
