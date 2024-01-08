import React, { useContext } from 'react'
import {NotificationContext} from '../contexts/NotificationContext';

const Notification = () => {


// notification context

const notificationContext = useContext(NotificationContext);
//type guard to check potential false value
if (!notificationContext) {
  return false; 
}

 const { isVisible, setIsVisible,notificationText, setNotificationText } = notificationContext;



  return (
    <div className={`notification ${isVisible? 'notification--visible':''}`}>{notificationText}</div>
  )
}

export default Notification