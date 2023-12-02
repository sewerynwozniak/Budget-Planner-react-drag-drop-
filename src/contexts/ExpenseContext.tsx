import React, { ReactNode, createContext, useEffect, useRef, useState } from 'react'



type ExpenseProviderProps={
    children: ReactNode;
  }

export type ExpenseType={
    id:number,
    title:string,
    amount:number
    budgetId:number
}

export type ExpenseContextTypes = {
    expenses: ExpenseType[] | null;
    setExpenses: React.Dispatch<React.SetStateAction<ExpenseType[] | null>>

}



     //To retrieve expense from local storage
     const getDataFromLocalStorage = () => {
      const data = localStorage.getItem('expenseData');
      return data ? JSON.parse(data) 
      : [];
       };


     export const filterExpenses = (budgetIdArg:number)=>{
      const allExpenses: ExpenseType[] = getDataFromLocalStorage()
      return allExpenses.filter(expense=>expense.budgetId == budgetIdArg)
     }




export const ExpenseContext = createContext<ExpenseContextTypes | null>(null)

const ExpenseProvider: React.FC<ExpenseProviderProps> = ({children}) => {


  // const demoExpenses= [
  //   {
  //     id:1,
  //     expense:'Gas',
  //     amount:100
  //   },
  //   {
  //     id:2,
  //     expense:'Bus tickets',
  //     amount:50
  //   }
  // ]

   const [expenses, setExpenses] = useState<ExpenseType[]|null>(null);




     


  return (

    <ExpenseContext.Provider value={{expenses, setExpenses}}>
        {children}
    </ExpenseContext.Provider>
 
  )
}

export default ExpenseProvider