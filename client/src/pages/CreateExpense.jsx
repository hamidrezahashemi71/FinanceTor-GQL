import React, {useState} from "react";
import {useMutation, gql} from "@apollo/client";

const CreateExpense = () => {
  const [expenseInfo, setExpenseInfo] = useState({
    amount: {
      value: "",
      msg: "",
    },
    tags: {
      value: "",
      msg: "",
    },
    geo: {
      lat: "35.73825",
      lon: "56.73825",
    },
    date: {
      value: "",
      msg: "",
    },
    MunicipalityZone: {
      value: "",
      msg: "",
    },
    Neighbourhood: {
      value: "",
      msg: "",
    },
    FormattedAddress: {
      value: "",
      msg: "",
    },
    Place: {
      value: "",
      msg: "",
    },
  });

  const CREATE_EXPENSE = gql`
    mutation Mutation($data: ExpenseInfo!) {
      create_expense(data: $data) {
        status
        msg
      }
    }
  `;
  const [CreateExpense] = useMutation(CREATE_EXPENSE);

  const createExpense = async () => {
    try {
      const x = await CreateExpense({
        variables: {
          date: {
            amount: expenseInfo.amount.value,
            tags: expenseInfo.tags.value,
            geo: expenseInfo.geo.value,
            date: expenseInfo.date.value,
            address: {
              MunicipalityZone: expenseInfo.MunicipalityZone.value,
              Neighbourhood: expenseInfo.Neighbourhood.value,
              FormattedAddress: expenseInfo.FormattedAddress.value,
              Place: expenseInfo.Place.value,
            },
          },
        },
      });
      console.log(x);
    } catch (error) {}
  };

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <p className='text-black font-bold text-3xl my-4'>My Expenses</p>
      <input
        type='text'
        className={`${
          expenseInfo.amount.msg ? "border-red-600" : "border-gray-200"
        } border-[1px] block  w-full p-3 rounded outline-none`}
        placeholder='Amount'
        value={expenseInfo.amount.value}
        onChange={(e) =>
          setExpenseInfo({
            ...expenseInfo,
            amount: {value: e.target.value.trimStart(), msg: ""},
          })
        }
      />
      <p className='mb-4 p-0 text-red-600 text-xs font-semibold'>
        {expenseInfo.amount.msg}
      </p>
      <input
        type='text'
        className={`${
          expenseInfo.tags.msg ? "border-red-600" : "border-gray-200"
        } border-[1px] block  w-full p-3 rounded outline-none`}
        placeholder='Tags'
        value={expenseInfo.tags.value}
        onChange={(e) =>
          setExpenseInfo({
            ...expenseInfo,
            tags: {value: e.target.value.trimStart(), msg: ""},
          })
        }
      />
      <p className='mb-4 p-0 text-red-600 text-xs font-semibold'>
        {expenseInfo.tags.msg}
      </p>
      <input
        type='text'
        className={`${
          expenseInfo.date.msg ? "border-red-600" : "border-gray-200"
        } border-[1px] block  w-full p-3 rounded outline-none`}
        placeholder='Amount'
        value={expenseInfo.date.value}
        onChange={(e) =>
          setExpenseInfo({
            ...expenseInfo,
            date: {value: e.target.value.trimStart(), msg: ""},
          })
        }
      />
      <p className='mb-4 p-0 text-red-600 text-xs font-semibold'>
        {expenseInfo.date.msg}
      </p>
      <input
        type='text'
        className={`${
          expenseInfo.MunicipalityZone.msg
            ? "border-red-600"
            : "border-gray-200"
        } border-[1px] block  w-full p-3 rounded outline-none`}
        placeholder='Amount'
        value={expenseInfo.MunicipalityZone.value}
        onChange={(e) =>
          setExpenseInfo({
            ...expenseInfo,
            MunicipalityZone: {value: e.target.value.trimStart(), msg: ""},
          })
        }
      />
      <p className='mb-4 p-0 text-red-600 text-xs font-semibold'>
        {expenseInfo.MunicipalityZone.msg}
      </p>
      <input
        type='text'
        className={`${
          expenseInfo.Neighbourhood.msg ? "border-red-600" : "border-gray-200"
        } border-[1px] block  w-full p-3 rounded outline-none`}
        placeholder='Amount'
        value={expenseInfo.Neighbourhood.value}
        onChange={(e) =>
          setExpenseInfo({
            ...expenseInfo,
            Neighbourhood: {value: e.target.value.trimStart(), msg: ""},
          })
        }
      />
      <p className='mb-4 p-0 text-red-600 text-xs font-semibold'>
        {expenseInfo.Neighbourhood.msg}
      </p>
      <input
        type='text'
        className={`${
          expenseInfo.FormattedAddress.msg
            ? "border-red-600"
            : "border-gray-200"
        } border-[1px] block  w-full p-3 rounded outline-none`}
        placeholder='Amount'
        value={expenseInfo.FormattedAddress.value}
        onChange={(e) =>
          setExpenseInfo({
            ...expenseInfo,
            FormattedAddress: {value: e.target.value.trimStart(), msg: ""},
          })
        }
      />
      <p className='mb-4 p-0 text-red-600 text-xs font-semibold'>
        {expenseInfo.FormattedAddress.msg}
      </p>
      <input
        type='text'
        className={`${
          expenseInfo.Place.msg ? "border-red-600" : "border-gray-200"
        } border-[1px] block  w-full p-3 rounded outline-none`}
        placeholder='Amount'
        value={expenseInfo.Place.value}
        onChange={(e) =>
          setExpenseInfo({
            ...expenseInfo,
            Place: {value: e.target.value.trimStart(), msg: ""},
          })
        }
      />
      <p className='mb-4 p-0 text-red-600 text-xs font-semibold'>
        {expenseInfo.Place.msg}
      </p>
      <button
        onClick={createExpense}
        className='w-[40%] flex items-center justify-center px-2 mt-3 border border-transparent text-xs leading-6 font-bold rounded-md text-white bg-purple-600 hover:bg-purple-900 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple transition duration-150 ease-in-out'>
        Create Expense
      </button>
    </div>
  );
};

export default CreateExpense;
