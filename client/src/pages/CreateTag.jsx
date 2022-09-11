import React, {useState, useContext} from "react";
import {useMutation, gql} from "@apollo/client";
import {AppContext} from "../context/context";
import {SketchPicker} from "react-color";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const CreateTag = () => {
  const {refetch} = useContext(AppContext);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [tagInfo, setTagInfo] = useState({
    name: {
      value: "",
      msg: "",
    },
    color: {
      value: "",
      msg: "",
    },
  });

  const nav = useNavigate();
  const handleShowColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleChangeComplete = (color) => {
    setTagInfo({...tagInfo, color: {value: color.hex, msg: ""}});
  };

  const CREATE_TAG = gql`
    mutation Create_tag($data: tagInfo!) {
      create_tag(data: $data) {
        status
        msg
      }
    }
  `;

  const [CreateTag] = useMutation(CREATE_TAG);

  const createTag = async () => {
    if (!tagInfo.name.value)
      tagInfo.name.msg = "Tag name field cannot be empty";
    try {
      const x = await CreateTag({
        variables: {
          data: {
            name: tagInfo.name.value,
            color: tagInfo.color.value,
          },
        },
      });
      toast.success("Tag added successfully!");
      await refetch();
      nav("/dashboard/tags");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <p className='text-black font-bold text-3xl my-4'>Create New Tag</p>
      <p className='mb-4 p-0 text-red-600 text-xs font-semibold'>
        {tagInfo.name.msg}
      </p>
      <div className='flex items-center gap-2 w-[50%]'>
        <input
          type='text'
          className={`${
            tagInfo.name.msg ? "border-red-600" : "border-gray-200"
          } border-[1px] block  w-[75%] h-20 p-3 rounded outline-none`}
          value={tagInfo.name.value}
          onChange={(e) =>
            setTagInfo({
              ...tagInfo,
              name: {value: e.target.value.trimStart().capitalize(), msg: ""},
            })
          }
          placeholder='Tag Name'
        />
        <button
          onClick={handleShowColorPicker}
          className='w-[25%] h-20 flex items-center justify-center px-8 border border-transparent text-xs leading-6 font-regular rounded-md text-white bg-purple-600 hover:bg-purple-900 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple transition duration-150 ease-in-out md:py-4 md:px-10'>
          Pick Tag Color
        </button>
      </div>
      <div
        className={`w-5 h-5 mt-3 rounded-full`}
        style={{backgroundColor: `${tagInfo.color.value}`}}></div>

      {showColorPicker ? (
        <div className='flex flex-col justify-center gap-1 mb-4'>
          <SketchPicker
            className='mt-4'
            color={tagInfo.color.value}
            onChangeComplete={handleChangeComplete}
          />
          <button
            onClick={handleShowColorPicker}
            className='w-[40%] flex items-center justify-center px-2 mt-3 border border-transparent text-xs leading-6 font-bold rounded-md text-white bg-purple-600 hover:bg-purple-900 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple transition duration-150 ease-in-out'>
            Pick!
          </button>
        </div>
      ) : (
        ""
      )}
      <button
        onClick={createTag}
        className='w-[25%] h-5 flex items-center justify-center my-4 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-purple-600 hover:bg-purple-900 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple transition duration-150 ease-in-out '>
        Create Tag!
      </button>
    </div>
  );
};

export default CreateTag;
