import React, {useContext, useState} from "react";
import ExpenseCard from "../components/ExpenseCard";
import {AppContext} from "../context/context";

const Expenses = () => {
  const {data, refetch} = useContext(AppContext);
  const myExpenses = data.me.myExpenses;

  console.log(myExpenses);
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <p className='text-black font-bold text-3xl my-4'>My Expenses</p>
      {!myExpenses.length ? (
        <p>You have no expenses yet!</p>
      ) : (
        myExpenses.map((myExpense) => {
          return <ExpenseCard myExpense={myExpense} refetch={refetch} />;
        })
      )}
    </div>
  );
};

export default Expenses;
