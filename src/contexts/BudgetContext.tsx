import React, { ReactNode, createContext, useState } from 'react'

type CategoriesType={
    id:number,
    title:string
}[]


type BudgetContextTypes = {
  categories: CategoriesType | null;
}


interface BudgetProviderProps {
  children: ReactNode;
}


export const BudgetContext = createContext<BudgetContextTypes |null>(null)

const BudgetProvider: React.FC<BudgetProviderProps>  = ({children}) => {


    const [categories, setCategories] = useState<CategoriesType|null>([{id:1,title:'food'}])

   

  return (

    <BudgetContext.Provider value={{categories}}>
        {children}
    </BudgetContext.Provider>
  )
}

export default BudgetProvider