import React, { useContext, useEffect, useRef, useState } from 'react'
import { ExpenseContext } from '../contexts/ExpenseContext'
import { ExpenseType } from '../contexts/ExpenseContext'

type AddNewExpenseProps={
    modaExpenseOpen: boolean;
    setModalExpenseOpen:React.Dispatch<React.SetStateAction<boolean>>;
    budgetId:number
  }


const AddNewExpense = ({modaExpenseOpen, setModalExpenseOpen, budgetId}:AddNewExpenseProps) => {

 
    const [showForm, setShowForm] = useState(false)
    const [inputs, setInputs] = useState({expense:'',amount:0, budgetId:budgetId})



    const expenseContext = useContext(ExpenseContext);
    //type guard to check potential false value
 
    if (!expenseContext) {
        return false; 
    }

    const { setExpenses } = expenseContext;




    const toggleForm = ()=>{
        if(showForm){
             setShowForm(false)
        }else{
            setShowForm(true)
        }
    }


    
    //To retrieve data from local storage
    const getDataFromLocalStorage = () => {
        const data = localStorage.getItem('expenseData');
        return data ? JSON.parse(data) : [];
         };
   


    // To save data to local storage
    const saveDataToLocalStorage = (data:ExpenseType) => {
    
        const retrievedData = getDataFromLocalStorage();
             let combinedData = retrievedData
             combinedData.push(data)
            localStorage.setItem('expenseData', JSON.stringify(combinedData));

    };





    const submitBudget = (e: React.FormEvent<HTMLButtonElement>)=>{
        e.preventDefault()

        const newExpense = {
            id: Math.ceil(Math.random() * 10000),
            title: inputs.expense,
            amount: inputs.amount,
            budgetId: budgetId,
          };
      


        setExpenses(prev=>{
            if(prev==null){
                return [newExpense]
            }else{
                return [...prev, newExpense]
            }
        })
    
        saveDataToLocalStorage(newExpense)
        setInputs({expense:'',amount:0, budgetId:budgetId})
        setModalExpenseOpen(false)

    }




  return (

    <>
    
        <button data-belong='true' className='budgets__addNew btn  btn--blue' onClick={toggleForm}>Add expense</button>
        <form    
         className={`expenses__form ${!showForm?'expenses__hideForm':'expenses__showForm'}`}
         >
            <input 
                type="text" 
                name='expense' 
                onChange={(e)=>setInputs(prev=>({...prev, [e.target.name]:e.target.value}))} 
                placeholder='expense name'
                value={inputs.expense}
                tabIndex={showForm?0:-1}
            />
    
            <input 
                type="number" 
                onChange={(e)=>setInputs(prev=>({...prev, [e.target.name]:e.target.valueAsNumber}))}           
                name="amount" 
                placeholder='amount'
                value={inputs.amount}
                tabIndex={showForm?0:-1}
            />
            
    
            <button tabIndex={showForm?0:-1} className='btn btn--blue' onClick={submitBudget}>Add</button>
        </form>

    </>




  )
}

export default AddNewExpense