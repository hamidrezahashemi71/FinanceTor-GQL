import React, {useState, useContext} from "react";
import {useMutation, gql} from "@apollo/client";
import {AppContext} from "../context/context";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const CreateExpense = () => {
  const {data, refetch} = useContext(AppContext);
  const myTags = data.me.myTags;
  const [expenseInfo, setExpenseInfo] = useState({
    amount: {
      value: "",
      msg: "",
    },
    tag: {
      value: "",
      msg: "",
    },
    geo: {
      value: {
        lat: "35.73825",
        lon: "56.73825",
      },
      msg: "",
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

  const nav = useNavigate();

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
    const values = Object.values(expenseInfo);
    const ifEmpty = values.some((item) => !item.value);

    if (ifEmpty)
      return values.forEach((item) => {
        if (!item.value) item.msg = "This field cannot be empty!";
      });

    try {
      await CreateExpense({
        variables: {
          data: {
            amount: parseFloat(expenseInfo.amount.value),
            geo: {
              lat: parseFloat(expenseInfo.geo.value.lat),
              lon: parseFloat(expenseInfo.geo.value.lon),
            },
            tags: [expenseInfo.tag.value],
            date: expenseInfo.date.value,
            address: {
              MunicipalityZone: parseFloat(expenseInfo.MunicipalityZone.value),
              Neighbourhood: expenseInfo.Neighbourhood.value,
              FormattedAddress: expenseInfo.FormattedAddress.value,
              Place: expenseInfo.Place.value,
            },
          },
        },
      });
      toast.success("Expenses created successfully!");
      await refetch();
      nav("/dashboard/expenses");
    } catch (error) {
      console.log(error.message);
      toast.error("Error! You should create a tag first!");
    }
  };
  // console.log(expenseInfo);

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <p className='text-black font-bold text-3xl my-4'>Create New Expense</p>
      <input
        type='number'
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

      <select
        onClick={(e) =>
          setExpenseInfo({
            ...expenseInfo,
            tag: {value: e.target.value, msg: ""},
          })
        }
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 outline-none'>
        <option>Choose a tag</option>
        {!myTags.length
          ? "You have no tags! Create one first."
          : myTags.map((myTag) => {
              return (
                <option key={myTag._id} value={myTag._id}>
                  {myTag.name}
                </option>
              );
            })}
      </select>

      <p className='mb-4 p-0 text-red-600 text-xs font-semibold'>
        {expenseInfo.tag.msg}
      </p>
      <input
        type='date'
        className={`${
          expenseInfo.date.msg ? "border-red-600" : "border-gray-200"
        } border-[1px] block  w-full p-3 rounded outline-none`}
        placeholder='Date'
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
        type='number'
        className={`${
          expenseInfo.MunicipalityZone.msg
            ? "border-red-600"
            : "border-gray-200"
        } border-[1px] block  w-full p-3 rounded outline-none`}
        placeholder='Municipality Zone'
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
        placeholder='Neighbourhood'
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
        placeholder='Formatted Address'
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
        placeholder='Place'
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
        className='w-[40%] flex items-center justify-center px-2 my-3 border border-transparent text-xs leading-6 font-bold rounded-md text-white bg-purple-600 hover:bg-purple-900 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple transition duration-150 ease-in-out'>
        Create Expense
      </button>
    </div>
  );
};

export default CreateExpense;
