import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

const AddNewBudget = () => {

const dialogRef = useRef<HTMLDialogElement>(null)


const [modalOpen, setModalOpen] = useState(false)
const [addBudgetLimit, setAddBudgetLimit] = useState(false)


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

    const submitBudget = (e: React.FormEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        setModalOpen(false)
    }


  return (
    <div className='addNewBudget__wrapper'>
        <dialog className='dialog' ref={dialogRef}>
            
            <button className='dialog__closeBtn btn' onClick={()=>setModalOpen(false)}>X</button>

            <h3>Add budget</h3>

            <form action="">
                <input type="text" placeholder='budget name'/>

                <label htmlFor="addBudgetLimit">
                    add budget limit
                    <input type="checkbox" onChange={()=>setAddBudgetLimit(prev=>!prev)} name="" id="addBudgetLimit" />
                
                </label>
          
                {addBudgetLimit && (
                    <input type="number" name="" id="" />
                )}

                <button className='btn' onClick={submitBudget}>Add</button>
            </form>

        </dialog>

        <button className='btn' onClick={openModal}>Add New Budget</button>
    </div>
  )
}

export default AddNewBudget