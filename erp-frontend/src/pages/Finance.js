import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import BudgetForm from './Finance/BudgetForm';
import ExpenseForm from './Finance/ExpenseForm';
import BudgetList from './Finance/BudgetList';
import ExpenseList from './Finance/ExpenseList';
import BudgetChart from './Finance/BudgetChart';
import ExpenseFilterExport from './Finance/ExpenseFilterExport';

export default function FinanceDashboard() {
  return (
    <div className="p-4 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-300">Finance Dashboard</h1>
      <div className="flex flex-wrap gap-4 mb-6">
        <NavLink to="budget-form" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">New Budget</NavLink>
        <NavLink to="expense-form" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">New Expense</NavLink>
        <NavLink to="budgets" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">View Budgets</NavLink>
        <NavLink to="expenses" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">View Expenses</NavLink>
        <NavLink to="budget-chart" className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">Budget Report</NavLink>
        <NavLink to="expense-export" className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">Export & Filter</NavLink>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <Routes>
          <Route path="budget-form" element={<BudgetForm />} />
          <Route path="expense-form" element={<ExpenseForm />} />
          <Route path="budgets" element={<BudgetList />} />
          <Route path="expenses" element={<ExpenseList />} />
          <Route path="budget-chart" element={<BudgetChart />} />
          <Route path="expense-export" element={<ExpenseFilterExport />} />
        </Routes>
      </div>
    </div>
  );
}
// This component serves as the main Finance dashboard, providing navigation to various finance-related forms and reports.