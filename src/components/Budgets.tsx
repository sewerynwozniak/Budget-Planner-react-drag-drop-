import React, { useContext, useEffect } from 'react'
import { BudgetContext, BudgetContextTypes } from '../contexts/BudgetContext'
import Budget from './Budget'




const Budgets = () => {

  const budgetContext = useContext(BudgetContext);
  //type guard to check potential false value
  if (!budgetContext) {
    return false; 
  }
 

  const { budgets, editableTitle, setClickedOutside } = budgetContext;

  const displayBudgets = ()=>{
   return budgets? budgets?.map((budget, index)=>(
      <Budget key={budget.id} index={index} details={budget} />
  )):null
  }



  useEffect(() => {
 
    const handleOutsideClick = (e: MouseEvent) => {
        
      const targetElement = e.target as HTMLElement;
      if (
        targetElement &&
        editableTitle.current &&
        !editableTitle.current.contains(targetElement)           
      ) {
        //if clicked outside Editable component
        setClickedOutside(true)   

      } 
    };


    document.addEventListener('click', handleOutsideClick);
    
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      setClickedOutside(false)
    };



  });



  return (
    <div className='budgets__wrapper'>
        {displayBudgets()}
        <div className='demo'>Hello</div>
    </div>
  )
}

export default Budgets