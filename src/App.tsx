import { useContext, useState } from 'react'
import './App.css'
import { BudgetContext } from './contexts/BudgetContext'




function App() {


  const budget = useContext(BudgetContext)

  console.log(budget?.categories)

  return (
    <>

    </>
  )
}

export default App
