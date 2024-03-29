import React, { useContext, useEffect, useRef, useState } from 'react'
import { BudgetType } from '../contexts/BudgetContext'
import { BudgetContext } from '../contexts/BudgetContext'
import AddNewExpense from './AddNewExpense'
import { ExpenseType, ExpenseContext } from '../contexts/ExpenseContext'
import Expense from './Expense'
import ExpensesBar from './ExpensesBar'
import EditableBudgetTitle from './EditableBudgetTitle'
import EditableBudgetLimit from './EditableBudgetLimit'




const Budget:React.FC<{ details: BudgetType, index:number }> = ({details, index}) => {


const [isHovered, setIsHovered] = useState(false)
const [isDragged, setIsDragged] = useState(false)

const [showExpense, setShowExpense] = useState(true)
const [isExpenseHovered, setIsExpenseHovered] = useState(false)

const [showForm, setShowForm] = useState(false)

useEffect(() => {
    setIsHovered(false);
}, [details]);


//budget context

  const budgetContext = useContext(BudgetContext);
  //type guard to check potential false value
  if (!budgetContext) {
    return false; 
  }
  
  const { budgets, setBudgets, draggedBudget, draggedOverBudget, dropBudget, budgetIsDragged } = budgetContext;


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

  const { expenses, setExpenses, expenseIsDragged, draggedExpenseId } = expenseContext;






  const handleBudgetOnDragStart =(e:React.DragEvent<HTMLDivElement>,index:number, )=>{
    
    const target = e.target as HTMLDivElement; 

    if(target.getAttribute('data-budget')){
      budgetIsDragged.current = true
     
      draggedBudget.current=index
      setIsDragged(true)
    }
 
  }



  const handleBudgetOnEnter =(e:React.DragEvent<HTMLDivElement>,index:number)=>{
    
    if(budgetIsDragged.current){
      draggedOverBudget.current=index
      setIsHovered(true)
    }
     
  }





  const handleOnBudgetLeave =(e:React.MouseEvent)=>{
    const relatedTarget = e.relatedTarget as HTMLElement;

    if(!relatedTarget.getAttribute('data-budget')){
      setIsHovered(false)
    }
  }



  const handleOnBudgetDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
  
    if (target.getAttribute('data-budget')) {
      budgetIsDragged.current = false;
      setIsHovered(false);
      setIsDragged(false);
      dropBudget();
    }
  };


  //expenses

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
  


   const sumBudgetExpenses = filterExpenses(details.id)?.reduce((prev, cur)=>prev+cur.amount,0)||0



  const generatExpense = ()=>{
    return filterExpenses(details.id)?.map(expense=>(

      <Expense key={expense.id} details={expense} index={index} showExpense={showExpense}/>

    ))
  }


  const handleExpenseOnEnter =(e:React.DragEvent<HTMLDivElement>,index:number)=>{
    
    if(expenseIsDragged.current){
      draggedOverBudget.current=details.id
      setIsExpenseHovered(true)
    }
    
  }



  const handleOnExpenseDragEnd =()=>{

   
    const changedExpenses = expenses&& expenses.map(el => {
      if (el.id === draggedExpenseId.current) {    
        return {...el, budgetId:draggedOverBudget.current};
      }
      return el;
    });
    let orderedExpensesd
    //move changes expense to the end of the array
    if(changedExpenses){
      orderedExpensesd = [...changedExpenses.filter(el=>el.id==draggedExpenseId.current), ...changedExpenses.filter(el=>el.id!=draggedExpenseId.current) ] 
    }
       
    

    if(orderedExpensesd){
      setExpenses(orderedExpensesd)
      localStorage.setItem('expenseData', JSON.stringify(orderedExpensesd));

    }
 

  }



    const handleOnExpenseLeave =(e:React.MouseEvent)=>{
      const target = e.relatedTarget as HTMLDivElement;
      if(!target.getAttribute('data-expense')){  
        setIsExpenseHovered(false)
      }
        
    }



    useEffect(()=>{
      setIsExpenseHovered(false)
    },[expenses])


  const expenseWrapperStyle={
    outline: isExpenseHovered ? '1px solid red' : 'none',
    maxHeight:showExpense?'100vh':'0',
    padding:showExpense?'10px':'0px',
    border:showExpense?'1px solid #4177c3':'1px solid transparent',
    overflow:showExpense?'auto':'hidden'
  }


  return (
    <div 
      style={handleStyleOnBudget}
      className='budgets__budget'
      data-index={index}
      data-budget='true'
      draggable={true}
      
      onDragStart={(e)=>handleBudgetOnDragStart(e,Number(e.currentTarget.getAttribute('data-index')))}
      onDragEnter={(e)=>handleBudgetOnEnter(e,Number(e.currentTarget.getAttribute('data-index')))}
      onDragLeave={handleOnBudgetLeave}
      onDragEnd={handleOnBudgetDragEnd}
      onDragOver={e=>e.preventDefault()}

    >
      <button data-budget='true' className='budgets__delete' onClick={()=>deleteBudget(details.id)}>X</button>


        <EditableBudgetTitle id={details?.id} title={details?.title} />



      <span data-budget='true'>limit: 
        <EditableBudgetLimit id={details?.id} limit={details?.limit}/>
      </span>

      {details.limit?<ExpensesBar currentExpenses={sumBudgetExpenses} limitExpenses={details.limit}/>:''}
      
      <p>summed expenses: {sumBudgetExpenses}</p>
      
      <div className="budgets__btnsWrapper">
        <button data-belong='true' className='budgets__addNew btn  btn--blue' onClick={e=>setShowForm(prev=>!prev)}>
          {showForm?'Hide':'Show'} expense form
        </button>     
        <button data-belong='true' className='budgets__addNew btn  btn--blue' onClick={()=>setShowExpense(prev=>!prev)}>
          {showExpense?'Hide':'Show'} expenses
        </button>
      </div>

      <AddNewExpense showForm={showForm} budgetId={details.id} modaExpenseOpen={modaExpenseOpen} setModalExpenseOpen={setModalExpenseOpen}/>

      <div className="expenses__wrapper"
        data-expense='true'
        style={expenseWrapperStyle}
        onDragEnter={(e)=>handleExpenseOnEnter(e,Number(e.currentTarget.getAttribute('data-index')))}
        onDragEnd={handleOnExpenseDragEnd}
        onDragOver={e=>e.preventDefault()}
        onDragLeave={handleOnExpenseLeave}
      >
        {generatExpense()}
      </div>
      
    </div>
  )
}

export default Budget