import React, { useContext } from 'react'
import { BudgetContext, BudgetContextTypes } from '../contexts/BudgetContext'
import Budget from './Budget'


const Budgets = () => {

  const budgetContext = useContext(BudgetContext);
  //type guard to check potential false value
  if (!budgetContext) {
    return false; 
  }
 

  const { budgets } = budgetContext;

  const displayBudgets = ()=>{
   return budgets? budgets?.map((budget, index)=>(
      <Budget index={index} details={budget} />
  )):null
  }


  return (
    <div className='budgets__wrapper'>
        {displayBudgets()}
    </div>
  )
}

export default Budgets