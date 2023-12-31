import React, { ReactNode, createContext, useEffect, useRef, useState } from 'react'

export type BudgetType={
    id:number,
    title:string,
    limit:number|null
}


export type BudgetContextTypes = {
  budgets: BudgetType[] | null;
  setBudgets: React.Dispatch<React.SetStateAction<BudgetType[] | null>>
  draggedBudget: React.MutableRefObject<number>
  draggedOverBudget: React.MutableRefObject<number>
  dropBudget: ()=>void
  budgetIsDragged:React.MutableRefObject<boolean>
  editableTitle:React.MutableRefObject<HTMLInputElement | null>
  editableLimit:React.MutableRefObject<HTMLInputElement | null>
  clickedOutside:boolean
  setClickedOutside:React.Dispatch<React.SetStateAction<boolean>>
}



interface BudgetProviderProps {
  children: ReactNode;
}


export const BudgetContext = createContext<BudgetContextTypes |null>(null)



const BudgetProvider: React.FC<BudgetProviderProps> = ({children}) => {


  const [budgets, setBudgets] = useState<BudgetType[]|null>(null)

  const draggedBudget = useRef(0)
  const draggedOverBudget = useRef(0)

  //state to discriminate dragging budget from
  const budgetIsDragged = useRef(false)
  
  
  const editableTitle = useRef<HTMLInputElement|null>(null)
  const editableLimit = useRef<HTMLInputElement|null>(null)
  const [clickedOutside, setClickedOutside] = useState(false)


  const dropBudget = ()=>{

    if(budgets){
      const temp = budgets[draggedBudget.current]
      const budgetClone = [...budgets]
      budgetClone[draggedBudget.current]=budgets[draggedOverBudget.current]
      budgetClone[draggedOverBudget.current]=temp
      setBudgets(budgetClone)
    }

  }


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

    <BudgetContext.Provider value={{budgets, setBudgets, draggedBudget, draggedOverBudget, dropBudget, budgetIsDragged, editableTitle,editableLimit, clickedOutside, setClickedOutside}}>
        {children}
    </BudgetContext.Provider>
  )
}

export default BudgetProvider