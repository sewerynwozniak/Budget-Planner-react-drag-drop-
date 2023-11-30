import React, { useEffect, useRef, useState } from 'react'

type AddNewExpenseProps={
    modaExpenseOpen: boolean;
    setModalExpenseOpen:React.Dispatch<React.SetStateAction<boolean>>
  }

const AddNewExpense = ({modaExpenseOpen, setModalExpenseOpen}:AddNewExpenseProps) => {


    const dialogRef = useRef<HTMLDialogElement>(null)

   

    const [inputs, setInputs] = useState({budget:'',limit:0})


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


    const submitBudget = (e: React.FormEvent<HTMLButtonElement>)=>{
        // e.preventDefault()

        // const newBudget = {id:Math.ceil(Math.random()*10000),title:inputs.budget,limit:inputs.limit}
      

        // setBudgets(prev=>{
        //     if(prev==null){
        //         return [newBudget]
        //     }else{
        //         return [...prev, newBudget]
        //     }
        // })
    
        // saveDataToLocalStorage(newBudget)



        // setModalOpen(false)
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