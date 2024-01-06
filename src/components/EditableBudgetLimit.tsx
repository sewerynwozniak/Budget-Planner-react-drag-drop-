import React, { useContext, useEffect, useState } from 'react'
import check from '../assets/check.png';
import cross from '../assets/cross.png';
import {BudgetContext} from '../contexts/BudgetContext';

type LimitType={
    id:number,
    limit:number|null
}

const EditableBudgetLimit = ({id, limit}:LimitType) => {


    const [isEdited, setIsEdited] = useState(false)
    const [limitInput, setLimitInput] = useState<number|null>(null)


        //context

        const budgetContext = useContext(BudgetContext);
        //type guard to check potential false value
        if (!budgetContext) {
          return false; 
        }

    const { editableLimit, budgets, setBudgets } = budgetContext;


    const changeLimit =(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        console.log(budgets)
        console.log(limitInput)
         const changedLimit =budgets&& budgets.map(budget=>{
       
           if(budget.id==id){
            console.log(budget)
            return {...budget, limit:limitInput}
           }else{
            return budget
           }    
        } )

      
        setBudgets(changedLimit)
        localStorage.setItem('budgetData', JSON.stringify(changedLimit));
        setIsEdited(false)

     }

    const closeEditForm = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        setIsEdited(false)
     }


     const handleOnKeyUp = (e:React.KeyboardEvent<HTMLHeadingElement>)=>{
        const key = e.code
        if(key=='Enter'){
            setIsEdited(true)
        }
     }

     
     useEffect(()=>{
        setLimitInput(limit)
     },[limit])

     useEffect(()=>{
        editableLimit.current?.focus()
     },[isEdited])


   
    


  return (
    <>
        {isEdited?(
            <form className='editableBudgetLimit__form'>
                <input 
                    onChange={e=>setLimitInput(parseInt(e.target.value))} 
                    ref={editableLimit}
                    type="number" 
                    value={limitInput?limitInput:0} 
                />
                
                <button onClick={changeLimit} type='submit'>
                    <img src={check} alt="" />
                </button>
                <button onClick={closeEditForm}>
                    <img src={cross} alt="" />
                </button>
            </form>
        ):(
            <p className='editableBudgetLimit__p'  onDoubleClick={()=>setIsEdited(true)} onKeyUp={handleOnKeyUp} tabIndex={0}>{limit}</p>
        )

        }
    </>
  )

}

export default EditableBudgetLimit