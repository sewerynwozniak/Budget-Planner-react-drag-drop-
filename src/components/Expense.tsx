import React from 'react'
import { ExpenseType } from '../contexts/ExpenseContext'

type ExpenseDetailsType={
    details:ExpenseType
}


const Expense = ({details}:ExpenseDetailsType) => {


  return (
    <div className='expenses__expense' key={details.id}>
        <button className='btn btn--red expenses__closeBtn'>X</button>
        <div className="expenses__expenseBody">
          <p>{details.title}</p>
          <p>{details.amount}</p>
        </div>
      
    </div>
  )
}

export default Expense