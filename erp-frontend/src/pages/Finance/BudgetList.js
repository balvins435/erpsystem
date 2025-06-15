import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BudgetList = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/finance/budgets/')
      .then(res => setBudgets(res.data))
      .catch(err => console.error('Error fetching budgets:', err));
  }, []);

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Budget Records</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="border p-2">Department</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">Approved</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map(budget => (
            <tr key={budget.id} className="text-center">
              <td className="border p-2">{budget.department}</td>
              <td className="border p-2">Ksh {budget.amount}</td>
              <td className="border p-2">{budget.year}</td>
              <td className="border p-2">{budget.approved ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetList;
