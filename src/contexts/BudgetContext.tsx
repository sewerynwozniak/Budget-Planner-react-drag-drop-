import React, { ReactNode, createContext, useEffect, useState } from 'react'

export type BudgetType={
    id:number,
    title:string,
    limit?:number
}


export type BudgetContextTypes = {
  budgets: BudgetType[] | null;
  setBudgets: React.Dispatch<React.SetStateAction<BudgetType[] | null>>
}






interface BudgetProviderProps {
  children: ReactNode;
}


export const BudgetContext = createContext<BudgetContextTypes |null>(null)

const BudgetProvider: React.FC<BudgetProviderProps> = ({children}) => {


  const [budgets, setBudgets] = useState<BudgetType[]|null>(null)

  useEffect(()=>{
          // To retrieve data from local storage
          const getDataFromLocalStorage = () => {
            const data = localStorage.getItem('budgetData');
            return data ? JSON.parse(data) : null;
          };
          const retrievedData = getDataFromLocalStorage();
          if(budgets==null){
            setBudgets(retrievedData)
          }else{
            setBudgets([...budgets, retrievedData])
          }
  },[])



    
  
  return (

    <BudgetContext.Provider value={{budgets, setBudgets}}>
        {children}
    </BudgetContext.Provider>
  )
}

export default BudgetProvider