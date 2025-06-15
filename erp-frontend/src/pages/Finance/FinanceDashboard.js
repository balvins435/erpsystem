import React from 'react';
import { Link } from 'react-router-dom';

const FinanceDashboard = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Finance Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Link to="/finance/expenses" className="bg-blue-600 text-white p-4 rounded hover:bg-blue-700 text-center">
          Manage Expenses
        </Link>
        <Link to="/finance/incomes" className="bg-green-600 text-white p-4 rounded hover:bg-green-700 text-center">
          Manage Incomes
        </Link>
        <Link to="/finance/budgets" className="bg-purple-600 text-white p-4 rounded hover:bg-purple-700 text-center">
          Manage Budgets
        </Link>
        <Link to="/finance/payments" className="bg-yellow-600 text-white p-4 rounded hover:bg-yellow-700 text-center">
          Manage Payments
        </Link>
        <Link to="/finance/expenses/filter" className="bg-gray-700 text-white p-4 rounded hover:bg-gray-800 text-center">
          Filter & Export Expenses
        </Link>
      </div>
    </div>
  );
};

export default FinanceDashboard;
