import React, { useContext, useEffect, useRef, useState } from 'react'
import { BudgetType } from '../contexts/BudgetContext'
import { BudgetContext } from '../contexts/BudgetContext'
import AddNewExpense from './AddNewExpense'
import { ExpenseType, ExpenseContext } from '../contexts/ExpenseContext'
import Expense from './Expense'




const Budget:React.FC<{ details: BudgetType, index:number }> = ({details, index}) => {


const [isHovered, setIsHovered] = useState(false)
const [isDragged, setIsDragged] = useState(false)





useEffect(() => {
    setIsHovered(false);
}, [details]);


//budget context

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

      localStorage.setItem('budgetData', JSON.stringify(filteredBudgets));
    }
  }


  //expense context
  const expenseContext = useContext(ExpenseContext);
  //type guard to check potential false value

  if (!expenseContext) {
      return false; 
  }

  const { expenses, setExpenses } = expenseContext;




  const handleOnDragStart =(index:number, )=>{

    draggedBudget.current=index
    setIsDragged(true)
   
}


  const handleOnEnter =(index:number)=>{

      draggedOverBudget.current=index
      setIsHovered(true)
     
  }


  const handleOnLeave =(e:any)=>{

    if(!e.relatedTarget.getAttribute('data-belong')){
      setIsHovered(false)
    }

  }

  const handleOnDragEnd = ()=>{
  
    setIsHovered(false)
    setIsDragged(false)
    dropBudget()
  }


  const addExpense = (id:number)=>{ 
    setModalExpenseOpen(true)
  }


  const handleStyleOnBudget = {
    border: isHovered ? '1px solid red' : 'none',
    outline: isDragged ? '3px solid blue' : 'none',

  }

  //add new expense
  const [modaExpenseOpen, setModalExpenseOpen] = useState(false)

  
  const filterExpenses = (budgetIdArg:number)=>{
    const allExpenses: ExpenseType[]|null = expenses
    return allExpenses?.filter(expense=>expense.budgetId == budgetIdArg)
   }
  

  const generatExpense = ()=>{
    return filterExpenses(details.id)?.map(expense=>(

      <Expense key={expense.id} details={expense}/>

    ))
  }


  return (
    <div 
      style={handleStyleOnBudget}
      className='budgets__budget'
      data-index={index}
      data-belong='true'
      draggable 
      onDragStart={(e:React.DragEvent<HTMLDivElement>)=>handleOnDragStart( Number(e.currentTarget.getAttribute('data-index')))}
      onDragEnter={(e:React.DragEvent<HTMLDivElement>)=>handleOnEnter(Number(e.currentTarget.getAttribute('data-index')))}
      onDragLeave={handleOnLeave}
      onDragEnd={handleOnDragEnd}
      onDragOver={e=>e.preventDefault()}

    >
      <button data-belong='true' className='budgets__delete' onClick={()=>deleteBudget(details.id)}>X</button>
      <h3 data-belong='true'>{details?.title}</h3>

      <span data-belong='true'>limit: {details?.limit}</span>

      
      
      <AddNewExpense budgetId={details.id} modaExpenseOpen={modaExpenseOpen} setModalExpenseOpen={setModalExpenseOpen}/>
      <div className="expenses__wrapper">
        {generatExpense()}
      </div>
    </div>
  )
}

export default Budget