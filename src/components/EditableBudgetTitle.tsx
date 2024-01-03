import React, { useState, useRef, useEffect, useContext } from 'react';
import check from '../assets/check.png';
import cross from '../assets/cross.png';
import { BudgetContext } from '../contexts/BudgetContext';


type TitleType={
    id:number
    title:string
  
}




const EditableBudgetTitle = ({id,title}:TitleType) => {


    const [isEdited, setIsEdited] = useState(false)
    const [titleInput, setTitleInput] = useState(title)


    

    useEffect(()=>{
        editableTitle.current?.focus()
    },[isEdited])


 


    //context

    const budgetContext = useContext(BudgetContext);
    //type guard to check potential false value
    if (!budgetContext) {
      return false; 
    }
  
     const { budgets, setBudgets, editableTitle, clickedOutside } = budgetContext;



     useEffect(()=>{
        if(clickedOutside){
            setIsEdited(false)
        }
        
    },[clickedOutside])

    
     const changeTitle =(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()

        const changedBudget =budgets&&budgets.map(budget=>{
            if(budget.id==id){
                return {...budget, title:titleInput}
            }else{
                return budget
            }})

        setBudgets(changedBudget)
        localStorage.setItem('budgetData', JSON.stringify(changedBudget));
        setIsEdited(false)
     }



     const closeEditForm = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        setIsEdited(false)
     }



    return (
    <>
       {isEdited?(
            <form className='editableBudget__form' action="">
                <input onChange={e=>setTitleInput(e.target.value)} ref={editableTitle} type="text" value={titleInput} />
                
                <button onClick={changeTitle} type='submit'>
                    <img src={check} alt="" />
                </button>
                <button onClick={closeEditForm}>
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

