import React from 'react';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement
);

function Chart() {
  const { incomes, expenses } = useGlobalContext();

  const mergedData = mergeDataByDate(incomes, expenses);

  const data = {
    labels: mergedData.map((entry) => dateFormat(entry.date)),
    datasets: [
      {
        label: 'Доходы',
        data: mergedData.map((entry) => entry.income !== 0 ? entry.income : null),
        backgroundColor: 'green',
        tension: 0.2,
      },
      {
        label: 'Расходы',
        data: mergedData.map((entry) => entry.expense !== 0 ? entry.expense : null),
        backgroundColor: 'red',
        tension: 0.2,
      },
    ],
  };
  

  const isSingleDataPoint = data.labels.length === 1;

  if (isSingleDataPoint) {
    data.labels.unshift('');
    data.datasets.forEach((dataset) => {
      dataset.data.unshift(null);
    });
  }
  const options = {
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
    spanGaps: true,
  };
  
  return (
    <ChartStyled>
      {isSingleDataPoint ? (
        <p>Недостаточно данных для построения графика</p>
      ) : (
        <Line data={data} options={options} />
      )}
    </ChartStyled>
  );
  
}

const ChartStyled = styled.div`
  background: #FCF6F9;
  border: 2px solid #FFFFFF;
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

// Вспомогательная функция для объединения данных по дате
function mergeDataByDate(incomes, expenses) {
  const combinedEntries = [...incomes, ...expenses];

  // Сортируем записи по дате в порядке возрастания
  combinedEntries.sort((a, b) => new Date(a.date) - new Date(b.date));

  const mergedData = [];

  combinedEntries.forEach((entry) => {
    const { date, amount } = entry;

    const existingEntry = mergedData.find((mergedEntry) => mergedEntry.date === date);

    if (existingEntry) {
      if (entry.type === 'income') {
        existingEntry.income += amount;
      } else if (entry.type === 'expense') {
        existingEntry.expense += amount;
      }
    } else {
      const newEntry = {
        date,
        income: entry.type === 'income' ? amount : 0,
        expense: entry.type === 'expense' ? amount : 0,
      };

      mergedData.push(newEntry);
    }
  });

  return mergedData;
}