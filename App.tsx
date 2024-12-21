import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseChart from './ExpenseChart';
import './App.css';

interface Entry {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

const App: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  const addEntry = (entry: Omit<Entry, 'id'>) => {
    setEntries([...entries, { id: Date.now(), ...entry }]);
  };

  const editEntry = (id: number, updatedEntry: Entry) => {
    setEntries(entries.map((entry) => (entry.id === id ? updatedEntry : entry)));
  };

  const deleteEntry = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const totalIncome = entries
    .filter((entry) => entry.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = entries
    .filter((entry) => entry.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div>
      <h1>Expense Tracker</h1>
      <p>Total Income: ${totalIncome.toFixed(2)}</p>
      <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
      <p>Balance: ${balance.toFixed(2)}</p>
      <ExpenseForm addEntry={addEntry} />
      <ExpenseList entries={entries} editEntry={editEntry} deleteEntry={deleteEntry} />
      <ExpenseChart entries={entries} />
    </div>
  );
};

export default App;
