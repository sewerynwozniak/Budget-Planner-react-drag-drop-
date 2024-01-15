import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { BudgetContext } from '../contexts/BudgetContext'
import { BudgetType } from '../contexts/BudgetContext'
import { NotificationContext } from '../contexts/NotificationContext'

const AddNewBudget = () => {

const dialogRef = useRef<HTMLDialogElement>(null)



const [modalOpen, setModalOpen] = useState(false)
const [addBudgetLimit, setAddBudgetLimit] = useState(false)
const [inputs, setInputs] = useState({budget:'',limit:0})

const checkboxRef = useRef<HTMLInputElement>(null);
const inputRef = useRef<HTMLInputElement>(null);

    const closeModalOnEscapeClick = (e:KeyboardEvent)=>{
        if (e.key === 'Escape') {
            e.preventDefault()
            setModalOpen(false)
          }
    }

    //handle closing dialog on escape keyDown
    useEffect(()=>{
     
        document.addEventListener('keydown', closeModalOnEscapeClick);
       

        return () => {
            document.removeEventListener('keydown', closeModalOnEscapeClick);
        };
     },[])

 
// budget context

const budgetContext = useContext(BudgetContext);
//type guard to check potential false value
if (!budgetContext) {
  return false; 
}

const { setBudgets } = budgetContext;




// notification context

const notificationContext = useContext(NotificationContext);
//type guard to check potential false value
if (!notificationContext) {
  return false; 
}

 const { setIsVisible, setNotificationText } = notificationContext;



    useEffect(() => {

        if(modalOpen){
            dialogRef.current?.showModal()
            inputRef.current?.focus()
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



    const checkIsInputEmpty =()=>{
        if(inputs.budget==''){
            return true
        }else{
            return false
        }
    }
    


    const submitBudget = (e: React.FormEvent<HTMLButtonElement>)=>{
    
        e.preventDefault()

        if(inputs.budget==''){
            setIsVisible(true)
            setNotificationText('Fill all inputs')    
            return
        }

        if (checkboxRef.current !== null) {
            if(checkboxRef.current.checked && inputs.limit<=0){
                setIsVisible(true)
                setNotificationText('Limit must be above 0')    
                return
            }
        }
       
            

        const newBudget = {id:Math.ceil(Math.random()*10000),title:inputs.budget,limit:inputs.limit}
      

        setBudgets(prev=>{
            if(prev==null){
                return [newBudget]
            }else{
                return [...prev, newBudget]
            }
        })
    
        saveDataToLocalStorage(newBudget)

    
        if (checkboxRef.current !== null) {
            checkboxRef.current.checked=false;
          }
        setInputs({budget:'',limit:0})
        setModalOpen(false)
    }






  return (
    <div className='addNewBudget__wrapper'>
        <div  className={modalOpen?'dialog__customBackdrop':''}></div>
        <dialog className='dialog' ref={dialogRef}>
            
            <button className='dialog__closeBtn btn btn--red' onClick={()=>setModalOpen(false)}>X</button>

            <h3>Add budget</h3>

            <form>
                <input 
                    type="text"                    
                    name='budget' 
                    onChange={(e)=>setInputs(prev=>({...prev, [e.target.name]:e.target.value}))} 
                    value={inputs.budget}
                    placeholder='budget name'
                    ref={inputRef}
                    required
                />

                <label htmlFor="addBudgetLimit">
                    add budget limit
                    <input 
                        type="checkbox" ref={checkboxRef} onChange={()=>setAddBudgetLimit(prev=>!prev)} name="" id="addBudgetLimit" />
                
                </label>
          
                {addBudgetLimit && (
                    <input 
                        type="number" 
                        onChange={(e)=>setInputs(prev=>({...prev, [e.target.name]:e.target.value}))} 
                        value={inputs.limit}
                        name="limit" 
                        id="" 
                    />
                )}

                <button className='addNewBudget__submit btn btn--blue' onClick={submitBudget}>Add</button>
      
            </form>

        </dialog>

        <button className='addNewBudget__btn btn btn--blue' onClick={openModal}>Add New Budget</button>
    </div>
  )
}

export default AddNewBudget