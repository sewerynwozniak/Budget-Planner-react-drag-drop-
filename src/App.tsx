import { useContext, useState } from 'react'
import './App.css'
import { BudgetContext } from './contexts/BudgetContext'
import AddNewBudget from './components/AddNewBudget'




function App() {


  const budget = useContext(BudgetContext)

  console.log(budget?.categories)

  return (
    <>
        <AddNewBudget />
    </>
  )
}

export default App
