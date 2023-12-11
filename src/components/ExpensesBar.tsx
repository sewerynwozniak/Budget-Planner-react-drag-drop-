import React from 'react'


type ExpensesBarType={
    currentExpenses:number,
    limitExpenses:number
}

const ExpensesBar = ({currentExpenses, limitExpenses}:ExpensesBarType) => {


    const percentageOfExpenses = Math.min((currentExpenses/limitExpenses)*100, 100)

    let expensesBarStyling={

        width:`${percentageOfExpenses}%`,
        backgroundColor:'#aaa'
   
    }


  return (
    <div className="expensesBar__wrapper">
        <div style={expensesBarStyling} className="expensesBar"></div>
    </div>
  )
}

export default ExpensesBar