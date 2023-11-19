import React, { useContext } from 'react'
import { BudgetContext, BudgetContextTypes } from '../contexts/BudgetContext'
import Budget from './Budget'


const Budgets = () => {

  const budgetContext = useContext(BudgetContext);
  //type guard to check potential false value
  if (!budgetContext) {
    return false; 
  }
  console.log('checking')

  const { budgets } = budgetContext;



  return (
    <div className='budgets__wrapper'>
        {budgets?.map((budget)=>(
             <Budget details={budget} />
        ))}

    </div>
  )
}

export default Budgets