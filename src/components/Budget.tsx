import React from 'react'
import { CategoriesType } from '../contexts/BudgetContext'

const Budget :React.FC<{ details: CategoriesType }> = ({details}) => {
  return (
    <div className='budgets__budget'>
      
      <h3>{details.title}</h3>

      <span>{details.limit}</span>
      
    </div>
  )
}

export default Budget