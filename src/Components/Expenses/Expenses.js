import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import ExpenseForm from '../Expenses/ExpenseForm'
import IncomeItems from '../IncomeItem/IncomeItems';



function Expenses() {
  const {expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Мои расходы</h1>
        <h2 className='total-expense'>Общие расходы: <span>{totalExpenses()} ₽</span> </h2>
        <div className='expense-content'>
          <div className='form-container'>
              <ExpenseForm />
          </div>
          <div className='expenses'>
            {expenses.map((expense) => {
              const {id, title, amount, date, category, description, type} = expense;
              return <IncomeItems 
                  key={id}
                  id={id}
                  title={title}
                  amount={amount}
                  description={description}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-red)"
                  deleteItem={deleteExpense}
              />
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  )
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-expense{
      display: flex;
      justify-content: center;
      align-items: center;
      background: #FCF6F9;
      border: 2px solid #FFFFFF;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      padding: 1rem;
      margin: 1rem 0;
      font-size: 2rem;
      gap: .5rem;
      span{
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--color-red);
      }
    }
    .expense-content{
      display: flex;
      gap: 2rem;
      .expenses{
        flex: 1;
      }
    }

`;

export default Expenses