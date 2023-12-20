import React, { useState, useRef, useEffect, useContext } from 'react';
import check from '../assets/check.png';
import cross from '../assets/cross.png';
import BudgetContext from '../contexts/BudgetContext';


type TitleType={
    title:string
    setIsClicked:React.Dispatch<React.SetStateAction<boolean>>
}




const EditableBudgetTitle = ({title, setIsClicked}:TitleType) => {


    const [isEdited, setIsEdited] = useState(false)
    const [titleInput, setTitleInput] = useState(title)


    const editableTitle = useRef<HTMLInputElement|null>(null)

    useEffect(()=>{

        editableTitle.current?.focus()

    },[isEdited])


    //context




    return (
    <>
       {isEdited?(
            <form className='editableBudget__form' action="">
                <input onChange={e=>setTitleInput(e.target.value)} ref={editableTitle} type="text" value={titleInput} />
                
                <button>
                    <img src={check} alt="" />
                </button>
                <button onClick={()=>setIsEdited(false)}>
                    <img src={cross} alt="" />
                </button>
            </form>
       ):(
        <h3 onDoubleClick={()=>setIsEdited(true)} className='budgets__title' data-budget='true'>{title}</h3>

       )}


    </>
 
        
  )
}

export default EditableBudgetTitle

