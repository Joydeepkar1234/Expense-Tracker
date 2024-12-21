import React from 'react';

interface Entry {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

interface ExpenseListProps {
  entries: Entry[];
  editEntry: (id: number, updatedEntry: Entry) => void;
  deleteEntry: (id: number) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ entries, editEntry, deleteEntry }) => {
  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.id}>
          <span>
            {entry.description} - ${entry.amount.toFixed(2)} ({entry.type})
          </span>
          <button onClick={() => deleteEntry(entry.id)}>Delete</button>
          <button
            onClick={() =>
              editEntry(entry.id, {
                ...entry,
                description: prompt('New description', entry.description) || entry.description,
                amount: parseFloat(prompt('New amount', String(entry.amount)) || String(entry.amount)),
              })
            }
          >
            Edit
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
