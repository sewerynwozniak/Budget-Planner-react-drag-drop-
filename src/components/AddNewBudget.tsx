import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

const AddNewBudget = () => {

const dialogRef = useRef<HTMLDialogElement>(null)


const [modalOpen, setModalOpen] = useState(false)


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
    <>
        <dialog ref={dialogRef}>
            
            <button onClick={()=>setModalOpen(false)}>X</button>

            <h3>Add budget</h3>

            <form action="">
                <input type="text" placeholder='budget name'/>
                
                <button onClick={submitBudget}>Add</button>
            </form>

        </dialog>

        <button onClick={openModal}>Add New Budget</button>
    </>
  )
}

export default AddNewBudget