import React, {useState, useEffect, useContext} from "react";
import {useMutation, gql} from "@apollo/client";
import {AppContext} from "../context/context";
import * as AiIcons from "react-icons/ai";
import {toast} from "react-toastify";

const EditProfile = () => {
  const {data, loading, refetch} = useContext(AppContext);
  const [file, setFile] = useState(null);
  const [thisUserInfo, setThisUserInfo] = useState({
    name: "",
    profilePic: "",
  });

  useEffect(() => {
    if (data)
      setThisUserInfo({
        ...thisUserInfo,
        name: data.me.name,
        profilePic: data.me.img,
        username: data.me.username,
      });
  }, [loading]);

  const EDIT_ME = gql`
    mutation Mutation($name: String!, $img: Upload) {
      editMe(name: $name, img: $img) {
        status
        msg
      }
    }
  `;

  const [EditProfile] = useMutation(EDIT_ME);

  const eidtProfile = async () => {
    try {
      const x = await EditProfile({
        variables: {
          name: thisUserInfo.name,
          img: file,
        },
      });
      toast.success("Profile Edited Successfully!");
      window.location.assign("/dashboard");
      refetch();
      // console.log(x);
    } catch (error) {
      if (error.message) return toast.error("Something Went Wrong!");
    }
  };

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <p className='text-black font-bold text-3xl my-4'>Edit Profile</p>
      <div className='flex flex-col items-center justify-center w-[50%] border-[1px] border-black rounded-md h-auto p-2'>
        <img
          className='w-20 h-20 rounded-full border-[1px] border-purple-900 cursor-pointer hover:bg-purple-100 transition-all'
          src={
            thisUserInfo.profilePic
              ? `http://localhost:80/${data.me.img}`
              : "/assets/images/user.png"
          }
          onError={(e) => (e.target.src = "/assets/images/user.png")}
          alt=''
        />
        <input
          id='file'
          name='file-upload'
          type='file'
          className='hidden'
          onChange={(e) => {
            console.log(e.target.files[0]);
            setFile(e.target.files[0]);
          }}
        />
        <label htmlFor='file' className='cursor-pointer text-black'>
          <AiIcons.AiFillPicture className='w-8 h-8 rounded-lg' />
        </label>
        <p>{thisUserInfo.username}</p>
        <input
          type='text'
          className='block border border-gray-500 mt-4 text-center w-full p-3 rounded mb-4'
          value={thisUserInfo.name}
          onChange={(e) =>
            setThisUserInfo({...thisUserInfo, name: e.target.value})
          }
        />
        <button
          onClick={eidtProfile}
          className='w-[40%] flex items-center justify-center px-2 mt-3 border border-transparent text-xs leading-6 font-bold rounded-md text-white bg-purple-600 hover:bg-purple-900 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple transition duration-150 ease-in-out'>
          Submit Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
