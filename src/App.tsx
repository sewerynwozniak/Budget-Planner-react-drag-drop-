import { useContext, useState } from 'react'
import { BudgetContext } from './contexts/BudgetContext'
import AddNewBudget from './components/AddNewBudget'
import Budgets from './components/Budgets'




function App() {




  return (
    <>
        <AddNewBudget />
        <Budgets />
    </>
  )
}

export default App
