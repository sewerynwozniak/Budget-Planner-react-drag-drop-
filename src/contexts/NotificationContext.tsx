import React, { ReactNode, createContext, useEffect, useState } from 'react'



export type NotificationContextTypes = {
    isVisible:boolean,
    setIsVisible:React.Dispatch<React.SetStateAction<boolean>>,
    notificationText:string,
    setNotificationText:React.Dispatch<React.SetStateAction<string>>
}

interface BudgetProviderProps {
    children: ReactNode;
  }



export const NotificationContext= createContext<NotificationContextTypes |null>(null)



const NotificationProvider : React.FC<BudgetProviderProps> = ({children}) => {

    const [isVisible, setIsVisible] = useState(false)
    const [notificationText, setNotificationText] = useState('')


    useEffect(()=>{

        let notificationTimer: number | undefined;

        if(isVisible){
            notificationTimer = window.setTimeout(() => {
                setIsVisible(false);
                setNotificationText('');
              }, 2000);
        }
      

        return ()=>{

            if (notificationTimer !== undefined) {
                window.clearTimeout(notificationTimer);
              }
        }
    },[isVisible])

  return (

    <NotificationContext.Provider value={{isVisible, setIsVisible, notificationText, setNotificationText}}>
        {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider