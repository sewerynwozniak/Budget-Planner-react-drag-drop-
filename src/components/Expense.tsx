import React, { useState } from 'react'
import { ExpenseType } from '../contexts/ExpenseContext'
import { useContext } from 'react'
import { ExpenseContext } from '../contexts/ExpenseContext'



type ExpenseDetailsType={
    details:ExpenseType
    index:number
}



const Expense = ({details, index}:ExpenseDetailsType) => {



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
  


  return (
    <div style={{outline:isDragged?'1px solid #4e2c2c':'none'}} draggable className='expenses__expense'
      onDragStart={(e)=>handleOnDragStart(e,Number(e.currentTarget.getAttribute('data-index')))}
     >
        <button onClick={()=>deleteExpense(details.id)} className='btn btn--red expenses__closeBtn'>X</button>
        <div className="expenses__expenseBody">
          <p>{details.title}</p>
          <p>{details.amount}</p>
        </div>     
    </div>
  )
}

export default Expense