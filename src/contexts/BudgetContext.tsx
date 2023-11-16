import React, { ReactNode, createContext, useState } from 'react'

export type CategoriesType={
    id:number,
    title:string,
    limit?:number
}


export type BudgetContextTypes = {
  categories: CategoriesType[] | null;
  setCategories: React.Dispatch<React.SetStateAction<CategoriesType[] | null>>
  toggle: boolean;
}



interface BudgetProviderProps {
  children: ReactNode;
}


export const BudgetContext = createContext<BudgetContextTypes |null>(null)

const BudgetProvider: React.FC<BudgetProviderProps> = ({children}) => {


    const [categories, setCategories] = useState<CategoriesType[]|null>([{id:1,title:'food',limit:1000},{id:2,title:'entertainment',limit:500}])
    const [toggle, setToggle] = useState(false)




  return (

    <BudgetContext.Provider value={{categories, setCategories, toggle}}>
        {children}
    </BudgetContext.Provider>
  )
}

export default BudgetProvider