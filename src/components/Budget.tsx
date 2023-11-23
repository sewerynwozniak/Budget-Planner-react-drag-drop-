import React, { useContext, useRef, useState } from 'react'
import { BudgetType } from '../contexts/BudgetContext'
import { BudgetContext } from '../contexts/BudgetContext'

const Budget :React.FC<{ details: BudgetType, index:number }> = ({details, index}) => {




  const budgetContext = useContext(BudgetContext);
  //type guard to check potential false value
  if (!budgetContext) {
    return false; 
  }
  
  const { budgets, setBudgets, draggedBudget, draggedOverBudget, dropBudget } = budgetContext;


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
    <div 

      className='budgets__budget'
      data-index={index}
      draggable 
      onDragStart={(e:React.DragEvent<HTMLDivElement>)=>draggedBudget.current=( Number(e.currentTarget.getAttribute('data-index')))}
      onDragEnter={(e:React.DragEvent<HTMLDivElement>)=>draggedOverBudget.current=( Number(e.currentTarget.getAttribute('data-index')))}
      onDragEnd={dropBudget}
      onDragOver={e=>e.preventDefault()}

    >
      <button className='budgets__delete' onClick={()=>deleteBudget(details.id)}>X</button>
      <h3>{details?.title}</h3>

      <span>{details?.limit}</span>
      
    </div>
  )
}

export default Budget