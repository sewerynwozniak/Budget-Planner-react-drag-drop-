import React, { useContext, useEffect } from 'react'
import { BudgetContext, BudgetContextTypes } from '../contexts/BudgetContext'
import Budget from './Budget'





const Budgets = () => {

  const budgetContext = useContext(BudgetContext);
  //type guard to check potential false value
  if (!budgetContext) {
    return false; 
  }
 

  const { budgets, editableTitle } = budgetContext;

  const displayBudgets = ()=>{
   return budgets? budgets?.map((budget, index)=>(
      <Budget key={budget.id} index={index} details={budget} />
  )):null
  }


  useEffect(() => {
 
    const handleOutsideClick = (e: MouseEvent) => {
        //console.log(editableTitle.current)
  
      const targetElement = e.target as HTMLElement;
      if (
        targetElement &&
        editableTitle.current &&
        !editableTitle.current.contains(targetElement)           
      ) {
        console.log('Clicked outside');
        
      } 
    };


    document.addEventListener('click', handleOutsideClick);
    
  
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };


  });


  return (
    <div className='budgets__wrapper'>
        {displayBudgets()}
    </div>
  )
}

export default Budgets