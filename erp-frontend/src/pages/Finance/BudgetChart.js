// components/finance/BudgetChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BudgetChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [budgetsRes, expensesRes] = await Promise.all([
        axios.get('http://localhost:8000/api/finance/budgets/'),
        axios.get('http://localhost:8000/api/finance/expenses/')
      ]);

      const groupedExpenses = expensesRes.data.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + parseFloat(curr.amount);
        return acc;
      }, {});

      const chartData = budgetsRes.data.map(budget => ({
        department: budget.department,
        budget: parseFloat(budget.amount),
        actual: groupedExpenses[budget.department] || 0
      }));

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-[400px] mt-10">
      <h2 className="text-xl font-semibold mb-4">Budget vs Actual Expenses</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" name="Budget" />
          <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetChart;
