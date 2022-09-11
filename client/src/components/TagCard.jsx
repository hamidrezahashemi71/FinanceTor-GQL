import React, {useState, useContext} from "react";
import {useMutation, gql} from "@apollo/client";
import {AppContext} from "../context/context";
import {SketchPicker} from "react-color";
import {toast} from "react-toastify";
import DeleteModal from "./DeleteModal";

const TagCard = ({myTag, refetch}) => {
  const [editMode, setEditMode] = useState(false);
  const {data} = useContext(AppContext);
  const [currentTag, setCurrentTag] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showModal, setShowModal] = useState(false);
  let myTags = data.me.myTags;

  const handleShowColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleChangeComplete = (color) => {
    setCurrentTag({...currentTag, color: {value: color.hex, msg: ""}});
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const deleteTag = (_id) => {
    return (myTags = myTags.filter((myTag) => myTag._id !== _id));
    console.log(myTags);
    // window.location.assign("/dashboard/tags");
  };

  const findTag = (_id) => {
    const currentTag = myTags.find((item) => item._id === _id);
    setCurrentTag({
      _id,
      name: {
        value: currentTag.name,
        msg: "",
      },
      color: {
        value: currentTag.color,
        msg: "",
      },
    });
    console.log(currentTag);
  };

  const EDIT_TAG = gql`
    mutation Create_tag($id: ID!, $data: tagInfo!) {
      edit_tag(_id: $id, data: $data) {
        status
        msg
      }
    }
  `;

  const [EditTag] = useMutation(EDIT_TAG);

  const editTag = async () => {
    if (!currentTag.name.value)
      currentTag.name.msg = "Tag name field cannot be empty";
    try {
      const x = await EditTag({
        variables: {
          id: currentTag._id,
          data: {
            name: currentTag.name.value,
            color: currentTag.color.value,
          },
        },
      });
      toast.success("Tag Edited Successfully!");
      setEditMode(false);
      await refetch();
    } catch (error) {}
  };

  return (
    <>
      <div className='flex gap-2 justify-around items-center mb-3 p-2 w-[40%] h-20 border-1 border-purple-400 rounded-lg bg-gray-50'>
        {editMode ? (
          <>
            <div
              onClick={handleShowColorPicker}
              className={`w-5 h-5 rounded-full cursor-pointer`}
              style={{backgroundColor: `${currentTag.color.value}`}}></div>
            <input
              type='text'
              className={`${
                currentTag.name.msg ? "border-red-600" : "border-gray-200"
              } border-[1px] block  w-[75%] h-10 p-3 rounded-md outline-none`}
              value={currentTag.name.value}
              onChange={(e) =>
                setCurrentTag({
                  ...currentTag,
                  name: {
                    value: e.target.value,
                    msg: "",
                  },
                })
              }
            />
            <p className='mb-4 p-0 text-red-600 text-xs font-semibold'>
              {currentTag.name.msg}
            </p>
            <button
              onClick={editTag}
              className='bg-green-300 p-1 rounded-md text-sm font-light hover:bg-green-400 transition-all'>
              Save
            </button>
          </>
        ) : (
          <>
            <div
              className={`w-5 h-5 rounded-full`}
              style={{backgroundColor: `${myTag.color}`}}></div>
            <p>{myTag.name}</p>
            <button
              onClick={() => {
                setEditMode(!editMode);
                findTag(myTag._id);
              }}
              className='bg-orange-300 p-1 rounded-md text-sm font-light hover:bg-orange-400 transition-all'>
              Edit
            </button>
            <button
              onClick={handleModal}
              className='bg-red-300 p-1 rounded-md text-sm font-light hover:bg-red-400 transition-all'>
              Delete
            </button>
          </>
        )}
      </div>
      {showColorPicker ? (
        <div className='flex flex-col justify-center gap-1 mb-4'>
          <SketchPicker
            className='mt-4'
            color={currentTag.color.value}
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
      {showModal ? (
        <DeleteModal
          handleModal={handleModal}
          deleteTag={deleteTag}
          myTag={myTag}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default TagCard;
