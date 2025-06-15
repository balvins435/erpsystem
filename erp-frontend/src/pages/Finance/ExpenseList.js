import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/finance/expenses/')
      .then(res => setExpenses(res.data))
      .catch(err => console.error('Error fetching expenses:', err));
  }, []);

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Expense Records</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="border p-2">Category</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Receipt</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp.id} className="text-center">
              <td className="border p-2">{exp.category}</td>
              <td className="border p-2">{exp.description}</td>
              <td className="border p-2">Ksh {exp.amount}</td>
              <td className="border p-2">{exp.date}</td>
              <td className="border p-2">
                {exp.uploaded_receipt ? (
                  <a href={exp.uploaded_receipt} target="_blank" rel="noreferrer" className="text-blue-500 underline">View</a>
                ) : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
