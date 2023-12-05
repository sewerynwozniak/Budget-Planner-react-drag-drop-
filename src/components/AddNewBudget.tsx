import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { BudgetContext } from '../contexts/BudgetContext'
import { BudgetType } from '../contexts/BudgetContext'

const AddNewBudget = () => {

const dialogRef = useRef<HTMLDialogElement>(null)


const [modalOpen, setModalOpen] = useState(false)
const [addBudgetLimit, setAddBudgetLimit] = useState(false)
const [inputs, setInputs] = useState({budget:'',limit:0})


    const closeModalOnEscapeClick = (e:KeyboardEvent)=>{
        if (e.key === 'Escape') {
            e.preventDefault()
            setModalOpen(false)
          }
    }

    //handle closing dialog on escape keyDown
    useEffect(()=>{
     
        dialogRef.current?.addEventListener('keydown', closeModalOnEscapeClick);

        return () => {
          dialogRef.current?.removeEventListener('keydown', closeModalOnEscapeClick);
        };
        },[])

 

const budgetContext = useContext(BudgetContext);
//type guard to check potential false value
//console.log(budgetContext)
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



  

    // To save data to local storage
    const saveDataToLocalStorage = (data:BudgetType) => {
        
    const retrievedData = getDataFromLocalStorage();
         let combinedData = retrievedData
         combinedData.push(data)
        localStorage.setItem('budgetData', JSON.stringify(combinedData));
    };



    


    const submitBudget = (e: React.FormEvent<HTMLButtonElement>)=>{
        e.preventDefault()

        const newBudget = {id:Math.ceil(Math.random()*10000),title:inputs.budget,limit:inputs.limit}
      

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
            
            <button className='dialog__closeBtn btn btn--red' onClick={()=>setModalOpen(false)}>X</button>

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

        <button className='addNewBudget__btn btn btn--blue' onClick={openModal}>Add New Budget</button>
    </div>
  )
}

export default AddNewBudget