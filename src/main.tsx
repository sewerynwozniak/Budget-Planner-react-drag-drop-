import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../src/scss/main.scss'
import BudgetProvider from './contexts/BudgetContext.tsx'
import ExpenseProvider from './contexts/ExpenseContext.tsx'
import NotificationProvider from './contexts/NotificationContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <NotificationProvider>
      <BudgetProvider>
        <ExpenseProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
        </ExpenseProvider>
      </BudgetProvider>
    </NotificationProvider>
)
