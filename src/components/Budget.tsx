import React, { useContext, useRef, useState } from 'react'
import { BudgetType } from '../contexts/BudgetContext'
import { BudgetContext } from '../contexts/BudgetContext'

const Budget :React.FC<{ details: BudgetType, index:number }> = ({details, index}) => {


const [isHovered, setIsHovered] = useState(false)

  const budgetContext = useContext(BudgetContext);
  //type guard to check potential false value
  if (!budgetContext) {
    return false; 
  }
  
  const { budgets, setBudgets, draggedBudget, draggedOverBudget, dropBudget } = budgetContext;


  const deleteBudget = (id:number)=>{
    const filteredBudgets = budgets?.filter(budget=>budget.id!==id)

    if (budgets) {
      const filteredBudgets = budgets.filter(budget => budget.id !== id);
      setBudgets(filteredBudgets);
      deleteBudgetFromLocalStorage(filteredBudgets)
    }
  }



  const deleteBudgetFromLocalStorage = (filteredBudgets:BudgetType[])=>{
    localStorage.setItem('budgetData', JSON.stringify(filteredBudgets));
  }


  const handleOnEnter =(index:number,e:any )=>{



      setIsHovered(true)
    
    

  }
  const handleOnLeave =(e:any)=>{
    console.log(e.relatedTarget)
    if(!e.relatedTarget.getAttribute('data-belong')){
      setIsHovered(false)
    }

  }

  const handleOnDragEnd = ()=>{
    
    setIsHovered(false)
    dropBudget()
  }


  return (
    <div 
      style={{border: isHovered?'1px solid red':'none'}}
      className='budgets__budget'
      data-index={index}
      data-belong='true'
      draggable 
      onDragStart={(e:React.DragEvent<HTMLDivElement>)=>draggedBudget.current=( Number(e.currentTarget.getAttribute('data-index')))}
      //onDragEnter={(e:React.DragEvent<HTMLDivElement>)=>draggedOverBudget.current=( Number(e.currentTarget.getAttribute('data-index')))}
      onDragEnter={(e:React.DragEvent<HTMLDivElement>)=>handleOnEnter(Number(e.currentTarget.getAttribute('data-index')),e)}
      onDragLeave={handleOnLeave}
      onDragEnd={handleOnDragEnd}
      onDragOver={e=>e.preventDefault()}

    >
      <button data-belong='true' className='budgets__delete' onClick={()=>deleteBudget(details.id)}>X</button>
      <h3 data-belong='true'>{details?.title}</h3>

      <span>{details?.limit}</span>
      
    </div>
  )
}

export default Budget