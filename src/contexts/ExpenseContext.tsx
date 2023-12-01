import React, { ReactNode, createContext, useEffect, useRef, useState } from 'react'



type ExpenseProviderProps={
    children: ReactNode;
  }

export type ExpenseType={
    id:number,
    title:string,
    amount:number
}

export type ExpenseContextTypes = {
    expenses: ExpenseType[] | null;
    setExpenses: React.Dispatch<React.SetStateAction<ExpenseType[] | null>>

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