import React, { useState, useContext } from 'react';
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalGontext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    //функции для доходов
    const addIncome = async (income) => {
        try {
          const response = await axios.post(`${BASE_URL}add-income`, income);
          if (response.status === 200) {
            console.log('Доход успешно добавлен');
            getIncomes();
          } else {
            console.log('Произошла ошибка при добавлении дохода');
          }
        } catch (error) {
          setError(error.response.data.message);
        }
      };
      

      const deleteIncome = async (id) => {
        try {
          const res = await axios.delete(`${BASE_URL}delete-income/${id}`);
          if (res.status === 200) {
            getIncomes();
          } else {
            setError("Произошла ошибка при удалении дохода");
          }
        } catch (error) {
          setError("Произошла ошибка при удалении дохода");
        }
      };

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data);
    }

    const totalIncome = () => {
        const totalIncomes = incomes.reduce((accumulator, income) => {
          return accumulator + income.amount;
        }, 0);
      
        return totalIncomes;
      };
      //функции для расходов
      const addExpense = async (expense) => {
        try {
            const res = await axios.post(`${BASE_URL}add-expense`, expense);
            if (res.status === 200) {
              console.log('Расход успешно добавлен');
              getExpenses();
            } else {
              console.log('Произошла ошибка при добавлении расхода');
            }
          } catch (error) {
            setError(error.response.data.message);
          }
        };

      const deleteExpense = async (id) => {
        try {
          const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
          if (res.status === 200) {
            getExpenses();
          } else {
            setError("Произошла ошибка при удалении расхода");
          }
        } catch (error) {
          setError("Произошла ошибка при удалении расхода");
        }
      };

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data);
    }

    const totalExpenses = () => {
        const totalExpense = expenses.reduce((accumulator, expense) => {
          return accumulator + expense.amount;
        }, 0);
      
        return totalExpense;
      };

      const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 4)
    }


    return (
        <GlobalGontext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalGontext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalGontext)
}