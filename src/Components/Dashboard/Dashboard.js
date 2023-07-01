import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import Chart from '../Chart/Chart';

function Dashboard() {

  function getMinValue(array) {
    const filteredArray = array.filter(value => value !== 0);
    return filteredArray.length > 0 ? Math.min(...filteredArray) : '0';
  }

  function getMaxValue(array) {
    const filteredArray = array ? array.filter(value => value !== 0) : [];
    return filteredArray.length > 0 ? Math.max(...filteredArray) : 0;
  }
  


  const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

  useEffect(() => {
      getIncomes()
      getExpenses()
  },[])

  const balanceColor = totalBalance() >= 0 ? 'var(--color-green)' : 'var(--color-red)';
  const incomeColor = 'var(--color-green)';
  const expenseColor = 'var(--color-red)';

  return (
    <DashboardStyled balanceColor={balanceColor} incomeColor={incomeColor} expenseColor={expenseColor}>
    <InnerLayout>
        <h1>Анализ бюджета</h1>
        <div className="stats-content">
            <div className="chart-content">
                <Chart />
                <div className="amount-content">
                    <div className="income">
                        <h2>Общий доход</h2>
                        <p>
                            {totalIncome()} ₽
                        </p>
                    </div>
                    <div className="expense">
                        <h2>Общие расходы</h2>
                        <p>
                           {totalExpenses()} ₽
                        </p>
                    </div>
                    <div className="balance">
                        <h2>Общий баланс</h2>
                        <p>
                            {totalBalance()} ₽
                        </p>
                    </div>
                </div>
            </div>
            <div className="history-content">
                <History />
                <h2 className="salary-title">Мин. <span>Доходы</span>Макс.</h2>
                <div className="salary-item">
                    <p>
                    {getMinValue(incomes.map(item => item.amount))} ₽
                    </p>
                    <p>
                      {getMaxValue(incomes.map(item => item.amount))} ₽
                    </p>
                </div>
                <h2 className="salary-title">Мин. <span>Расходы</span>Макс.</h2>
                <div className="salary-item">
                    <p>
                      {getMinValue(expenses.map(item => item.amount))} ₽
                    </p>
                    <p>
                      {getMaxValue(expenses.map(item => item.amount))} ₽
                    </p>
                </div>
            </div>
        </div>
    </InnerLayout>
</DashboardStyled>
)
}
const DashboardStyled = styled.div`
  .stats-content {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;

    .chart-content {
      grid-column: 1 / 4;
      height: 400px;

      .amount-content {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;
      }

      .income,
      .expense {
        grid-column: span 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .income {
        color: ${(props) => props.incomeColor};
      }

      .expense {
        color: ${(props) => props.expenseColor};
      }

      .income h2,
      .expense h2 {
        margin: 0;
        font-size: 2rem;
        font-weight: 600;
      }

      .income p,
      .expense p {
        font-size: 3.5rem;
        font-weight: 700;
        margin: 0;
      }
    }

    .income,
    .expense,
    .balance {
      background: #fcf6f9;
      border: 2px solid #ffffff;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      padding: 1rem;

      p {
        font-size: 3.5rem;
        font-weight: 700;
      }
    }

    .balance {
      grid-column: 2 / 4;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p {
        color: ${(props) => props.balanceColor};
        font-size: 3.5rem;
      }
    }
  }

  .history-content {
    grid-column: 4 / -1;

    h2 {
      margin: 1rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .salary-title {
      font-size: 1.2rem;

      span {
        font-size: 1.8rem;
      }
    }

    .salary-item {
      background: #fcf6f9;
      border: 2px solid #ffffff;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      padding: 1rem;
      border-radius: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        font-weight: 600;
        font-size: 1.6rem;
      }
    }
  }
  @media screen and (max-width: 1680px){
    .stats-content {
      .chart-content {
        .income p,
        .expense p,
        .balance p {
        font-size: 1.6rem;
      }
        .income h2,
        .expense h2,
        .balance h2 {
        font-size: 1.5rem;
      }
    }
  }
  .history-content{
    .salary-title {
      font-size: 1.2rem;

      span {
        font-size: 1.2rem;
      }
    }
  }
  }
`;

export default Dashboard;