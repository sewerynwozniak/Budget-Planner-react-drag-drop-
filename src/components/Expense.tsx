import React, { useEffect, useState } from 'react'
import { ExpenseType } from '../contexts/ExpenseContext'
import { useContext } from 'react'
import { ExpenseContext } from '../contexts/ExpenseContext'



type ExpenseDetailsType={
    details:ExpenseType
    index:number
    showExpense:boolean
}



const Expense = ({details, showExpense}:ExpenseDetailsType) => {



    const expenseContext = useContext(ExpenseContext);
    //type guard to check potential false value
    if (!expenseContext) {
      return false; 
    }

    const {deleteExpense, expenseIsDragged, draggedExpenseId} = expenseContext

    const [isDragged, setIsDragged] = useState(false)


    const handleOnDragStart =(e:React.DragEvent<HTMLDivElement>,index:number, )=>{
    
      setIsDragged(true)
      expenseIsDragged.current=true
      draggedExpenseId.current=details.id
      
  }
  
    useEffect(()=>{
      setIsDragged(false)
    },[details])

  return (
    <div data-expense='true' style={{outline:isDragged?'1px solid #b72929':'none'}} draggable className='expenses__expense'
      onDragStart={(e)=>handleOnDragStart(e,Number(e.currentTarget.getAttribute('data-index')))}
     >
        <button tabIndex={showExpense?0:-1} data-expense='true' onClick={()=>deleteExpense(details.id)} className='btn btn--red expenses__closeBtn'>
          X
        </button>
        <div data-expense='true' className="expenses__expenseBody">
          <p data-expense='true'>{details.title}</p>
          <p data-expense='true'>{details.amount}</p>
        </div>     
    </div>
  )
}

export default Expense