import React, { ReactNode, createContext, useEffect, useRef, useState } from 'react'



export type ExpenseProviderProps={
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
    deleteExpense:(budgetIdArg: number) => void
}



export const ExpenseContext = createContext<ExpenseContextTypes | null>(null)


const ExpenseProvider: React.FC<ExpenseProviderProps> = ({children}) => {


   const [expenses, setExpenses] = useState<ExpenseType[]|null>(null);



      //To retrieve expense from local storage
      const getDataFromLocalStorage = () => {
        const data = localStorage.getItem('expenseData');
        return data ? JSON.parse(data) 
        : [];
      };
    
    
      const filterExpenses = (budgetIdArg:number)=>{
        const allExpenses: ExpenseType[] = getDataFromLocalStorage()
        return allExpenses.filter(expense=>expense.budgetId == budgetIdArg)
       }



       const deleteExpense = (expenseId:number)=>{

        const filteredExpenses = expenses?.filter(el=>el.id!=expenseId)
        if(filteredExpenses){
          setExpenses(filteredExpenses)
          localStorage.setItem('expenseData', JSON.stringify(filteredExpenses));

        }

       }




      useEffect(()=>{
      
       setExpenses(getDataFromLocalStorage())
      
      },[])



  return (

    <ExpenseContext.Provider value={{expenses, setExpenses, deleteExpense}}>
        {children}
    </ExpenseContext.Provider>
 
  )
}

export default ExpenseProvider