import React, { useContext, useEffect, useRef, useState } from 'react'
import { ExpenseContext } from '../contexts/ExpenseContext'
import { ExpenseType } from '../contexts/ExpenseContext'

type AddNewExpenseProps={
    modaExpenseOpen: boolean;
    setModalExpenseOpen:React.Dispatch<React.SetStateAction<boolean>>
  }

const AddNewExpense = ({modaExpenseOpen, setModalExpenseOpen}:AddNewExpenseProps) => {


    const dialogRef = useRef<HTMLDialogElement>(null)

    const [inputs, setInputs] = useState({expense:'',amount:0})



    const expenseContext = useContext(ExpenseContext);
    //type guard to check potential false value
 
    if (!expenseContext) {
        return false; 
    }

    const { setExpenses } = expenseContext;


    const closeModalOnEscapeClick = (e:KeyboardEvent)=>{
        if (e.key === 'Escape') {
            e.preventDefault()
            setModalExpenseOpen(false)
          }
    }


    //handle closing dialog on escape keyDown
    useEffect(()=>{
     
        dialogRef.current?.addEventListener('keydown', closeModalOnEscapeClick);
        return () => {
          dialogRef.current?.removeEventListener('keydown', closeModalOnEscapeClick);
        };
    },[])


    useEffect(() => {
        if(modaExpenseOpen){
            dialogRef.current?.showModal()
        }else{
            dialogRef.current?.close()
        }

    }, [modaExpenseOpen])


    const openModal = ()=>{
        setModalExpenseOpen(true)
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

        const newExpense= {id:Math.ceil(Math.random()*10000),title:inputs.expense,amount:inputs.amount}
      

        setExpenses(prev=>{
            if(prev==null){
                return [newExpense]
            }else{
                return [...prev, newExpense]
            }
        })
    
        saveDataToLocalStorage(newExpense)



        setModalExpenseOpen(false)
    }






  return (

    <dialog className='dialog' ref={dialogRef}>
            
    <button className='dialog__closeBtn btn' onClick={()=>setModalExpenseOpen(false)}>X</button>

    <h3>Add new expense</h3>

        <form action="">
            <input 
                type="text" 
                name='budget' 
                onChange={(e)=>setInputs(prev=>({...prev, [e.target.name]:e.target.value}))} 
                placeholder='expense name'
            />
    

           
                <input 
                    type="number" 
                    onChange={(e)=>setInputs(prev=>({...prev, [e.target.name]:e.target.value}))} 
                    name="limit" 
                    id="" 
                    placeholder='cost'
                />
            
    
            <button className='btn' onClick={submitBudget}>Add</button>
        </form>

    </dialog>
  


  )
}

export default AddNewExpense