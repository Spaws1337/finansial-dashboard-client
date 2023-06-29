import React from 'react';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function Chart() {

  const { incomes, expenses } = useGlobalContext();

  const sortedIncomes = incomes.sort((a, b) => new Date(a.date) - new Date(b.date));
  const sortedExpenses = expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
  const allDates = [...sortedIncomes.map(inc => inc.date), ...sortedExpenses.map(exp => exp.date)];
  const uniqueDates = Array.from(new Set(allDates));
  const sortedUniqueDates = uniqueDates.sort((a, b) => new Date(a) - new Date(b));
  const incomeByDate = {};
  const expenseByDate = {};

  sortedIncomes.forEach((income) => {
    const date = dateFormat(income.date);
    if (incomeByDate[date]) {
      incomeByDate[date] += income.amount;
    } else {
      incomeByDate[date] = income.amount;
    }
  });

  sortedExpenses.forEach((expense) => {
    const date = dateFormat(expense.date);
    if (expenseByDate[date]) {
      expenseByDate[date] += expense.amount;
    } else {
      expenseByDate[date] = expense.amount;
    }
  });
  const incomeData = Object.keys(incomeByDate).map((date) => ({
    x: date,
    y: incomeByDate[date],
  }));
  
  const expenseData = Object.keys(expenseByDate).map((date) => ({
    x: date,
    y: expenseByDate[date],
  }));
  

  const data = {
    labels: sortedUniqueDates.map((date) => dateFormat(date)),
    datasets: [
      {
        label: 'Доходы',
        data: incomeData,
        backgroundColor: 'green',
        tension: 0.2,
        pointRadius: incomeData.map((income) => (income.y !== 0 ? 3 : 0)),
      },
      {
        label: 'Расходы',
        data: expenseData,
        backgroundColor: 'red',
        tension: 0.2,
        pointRadius: expenseData.map((expense) => (expense.y !== 0 ? 3 : 0)),
      },
    ],
  };
  

  const isSingleDataPoint = data.labels.length === 1;

  if (isSingleDataPoint) {
    data.labels.unshift('');
    data.datasets.forEach((dataset) => {
      dataset.data.unshift(null);
      dataset.pointRadius.unshift(0);
    });
  }

  return (
    <ChartStyled>
      {isSingleDataPoint ? (
        <p>Недостаточно данных для построения графика</p>
      ) : (
        <Line data={data} />
      )}
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
  p {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }
`;

export default Chart;