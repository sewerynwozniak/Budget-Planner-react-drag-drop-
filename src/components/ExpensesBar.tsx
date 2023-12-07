import React from 'react'


type ExpensesBarType={
    currentExpenses:number,
    limitExpenses:number
}

const ExpensesBar = ({currentExpenses, limitExpenses}:ExpensesBarType) => {


    const percentageOfExpenses = (currentExpenses/limitExpenses)*100

    let expensesBarStyling={

        width:`${percentageOfExpenses}%`,
        backgroundColor:'#aaaaaa'
   
    }


  return (
    <div className="expensesBar__wrapper">
        <div style={expensesBarStyling} className="expensesBar"></div>
    </div>
  )
}

export default ExpensesBar