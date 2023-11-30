import React, { ReactNode, createContext, useEffect, useRef, useState } from 'react'



type ExpenseProviderProps={
    children: ReactNode;
  }

type ExpenseType={
    id:number,
    title:string,
    amount:number
}

export type ExpenseContextTypes = {
    expenses: ExpenseType[] | null;
    setExpenses: React.Dispatch<React.SetStateAction<ExpenseType[] | null>>

}



const ExpenseContext = createContext<ExpenseContextTypes | null>(null)

const ExpenseProvider: React.FC<ExpenseProviderProps> = ({children}) => {


   const [expenses, setExpenses] = useState<ExpenseType[]|null>(null);


  return (

    <ExpenseContext.Provider value={{expenses, setExpenses}}>
        {children}
    </ExpenseContext.Provider>
 
  )
}

export default ExpenseProvider