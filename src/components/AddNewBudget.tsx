import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { BudgetContext } from '../contexts/BudgetContext'
import { BudgetType } from '../contexts/BudgetContext'

const AddNewBudget = () => {

const dialogRef = useRef<HTMLDialogElement>(null)


const [modalOpen, setModalOpen] = useState(false)
const [addBudgetLimit, setAddBudgetLimit] = useState(false)
const [inputs, setInputs] = useState({budget:'',limit:0})



const budgetContext = useContext(BudgetContext);
//type guard to check potential false value
if (!budgetContext) {
  return false; 
}


const { setBudgets } = budgetContext;




    useEffect(() => {

        if(modalOpen){
            dialogRef.current?.showModal()
        }else{
            dialogRef.current?.close()
        }

    }, [modalOpen])


    const openModal = ()=>{
        setModalOpen(true)
    }



    //To retrieve data from local storage
    const getDataFromLocalStorage = () => {
     const data = localStorage.getItem('budgetData');
     return data ? JSON.parse(data) : [];
      };

    // Retrieve data from local storageconst 
    //const retrievedData = getDataFromLocalStorage();

  

    // To save data to local storage
    const saveDataToLocalStorage = (data:BudgetType) => {
        
    const retrievedData = getDataFromLocalStorage();
        console.log(retrievedData)
         let combinedData = retrievedData
         combinedData.push(data)
         console.log(combinedData)
        localStorage.setItem('budgetData', JSON.stringify(combinedData));
    };



    





    const submitBudget = (e: React.FormEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        console.log(inputs)

        const newBudget = {id:Math.random(),title:inputs.budget,limit:inputs.limit}
      
        setBudgets(prev=>{
            if(prev==null){
                return [newBudget]
            }else{
                return [...prev, newBudget]
            }
        })
    
        saveDataToLocalStorage(newBudget)



        setModalOpen(false)
    }






  return (
    <div className='addNewBudget__wrapper'>
        <dialog className='dialog' ref={dialogRef}>
            
            <button className='dialog__closeBtn btn' onClick={()=>setModalOpen(false)}>X</button>

            <h3>Add budget</h3>

            <form action="">
                <input 
                    type="text" 
                    name='budget' 
                    onChange={(e)=>setInputs(prev=>({...prev, [e.target.name]:e.target.value}))} 
                    placeholder='budget name'
                />

                <label htmlFor="addBudgetLimit">
                    add budget limit
                    <input 
                        type="checkbox" onChange={()=>setAddBudgetLimit(prev=>!prev)} name="" id="addBudgetLimit" />
                
                </label>
          
                {addBudgetLimit && (
                    <input 
                        type="number" 
                        onChange={(e)=>setInputs(prev=>({...prev, [e.target.name]:e.target.value}))} 
                        name="limit" 
                        id="" 
                    />
                )}

                <button className='btn' onClick={submitBudget}>Add</button>
            </form>

        </dialog>

        <button className='btn' onClick={openModal}>Add New Budget</button>
    </div>
  )
}

export default AddNewBudget