import React, {useContext} from "react";
import {useMutation, gql} from "@apollo/client";
import {AppContext} from "../context/context";

const ExpenseCard = ({myExpense, refetch}) => {
  const {data} = useContext(AppContext);
  const myExpenses = data.me.myExpenses;

  const DELETE_EXPENSE = gql`
    mutation Delete_expense {
      delete_expense {
        msg
        status
      }
    }
  `;
  return <div>ExpenseCard</div>;
};

export default ExpenseCard;
