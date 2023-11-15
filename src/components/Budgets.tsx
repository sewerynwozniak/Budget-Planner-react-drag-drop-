import React, { useContext } from 'react'
import { BudgetContext, BudgetContextTypes } from '../contexts/BudgetContext'
import Budget from './Budget'


const Budgets = () => {


  const budgetContext = useContext(BudgetContext);

  if (!budgetContext) {
    return null; 
  }

  const { categories, toggle } = budgetContext;



  return (
    <div className='budgets__wrapper'>
        {categories?.map((budget)=>(
             <Budget details={budget} />
        ))}

    </div>
  )
}

export default Budgets