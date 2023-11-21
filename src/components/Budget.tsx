import React, { useContext } from 'react'
import { BudgetType } from '../contexts/BudgetContext'
import { BudgetContext } from '../contexts/BudgetContext'

const Budget :React.FC<{ details: BudgetType }> = ({details}) => {



  const budgetContext = useContext(BudgetContext);
  //type guard to check potential false value
  if (!budgetContext) {
    return false; 
  }
  
  const { budgets, setBudgets } = budgetContext;


  const deleteBudget = (id:number)=>{
    const filteredBudgets = budgets?.filter(budget=>budget.id!==id)
    console.log(filteredBudgets)
    if (budgets) {
      const filteredBudgets = budgets.filter(budget => budget.id !== id);
      setBudgets(filteredBudgets);
      deleteBudgetFromLocalStorage(filteredBudgets)
    }
  }

  const deleteBudgetFromLocalStorage = (filteredBudgets:BudgetType[])=>{
  
    localStorage.setItem('budgetData', JSON.stringify(filteredBudgets));

  }




  return (
    <div className='budgets__budget'>
      <button className='budgets__delete' onClick={()=>deleteBudget(details.id)}>X</button>
      <h3>{details?.title}</h3>

      <span>{details?.limit}</span>
      
    </div>
  )
}

export default Budget