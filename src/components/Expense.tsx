import React from 'react'
import { ExpenseType } from '../contexts/ExpenseContext'
import { useContext } from 'react'
import { ExpenseContext } from '../contexts/ExpenseContext'



type ExpenseDetailsType={
    details:ExpenseType
}



const Expense = ({details}:ExpenseDetailsType) => {


    const expenseContext = useContext(ExpenseContext);
    //type guard to check potential false value
    if (!expenseContext) {
      return false; 
    }

    const {deleteExpense} = expenseContext


  

  return (
    <div className='expenses__expense'>
        <button onClick={()=>deleteExpense(details.id)} className='btn btn--red expenses__closeBtn'>X</button>
        <div className="expenses__expenseBody">
          <p>{details.title}</p>
          <p>{details.amount}</p>
        </div>     
    </div>
  )
}

export default Expense