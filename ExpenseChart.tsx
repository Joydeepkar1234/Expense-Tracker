import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

interface Entry {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

interface ExpenseChartProps {
  entries: Entry[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ entries }) => {
  const monthlyData = Array(12).fill(0);

  entries.forEach((entry) => {
    const month = new Date().getMonth(); 
    if (entry.type === 'expense') monthlyData[month] += entry.amount;
  });

  const data = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ],
    datasets: [
      {
        label: 'Expenses',
        data: monthlyData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return <Bar data={data} />;
};

export default ExpenseChart;
