import React, { useContext, useEffect, useState } from 'react'
import check from '../assets/check.png';
import cross from '../assets/cross.png';
import {BudgetContext} from '../contexts/BudgetContext';
import {NotificationContext} from '../contexts/NotificationContext';

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


    // notification context

    const notificationContext = useContext(NotificationContext);
    //type guard to check potential false value
    if (!notificationContext) {
      return false; 
    }
    
     const { isVisible, setIsVisible,notificationText, setNotificationText } = notificationContext;




    const changeLimit =(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        
        if((limitInput??0)<=0){
            setIsVisible(true)
            setNotificationText('Limit must be above 0')   
            return
        }

         const changedLimit =budgets&& budgets.map(budget=>{
       
           if(budget.id==id){
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
                    value={limitInput? limitInput:''} 
                />
                
                <button onClick={changeLimit} type='submit'>
                    <img src={check} alt="" />
                </button>
                <button onClick={closeEditForm}>
                    <img src={cross} alt="" />
                </button>
            </form>
        ):(
            <p className='editableBudgetLimit__p'  onDoubleClick={()=>setIsEdited(true)} onKeyUp={handleOnKeyUp} tabIndex={0}>
                {limit?limit:'Add limit'}
            </p>
        )

        }
    </>
  )

}

export default EditableBudgetLimit


