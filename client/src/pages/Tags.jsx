import React, {useContext} from "react";
import TagCard from "../components/TagCard";
import {AppContext} from "../context/context";

const Tags = () => {
  const {data, refetch} = useContext(AppContext);
  const myTags = data.me.myTags;

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <p className='text-black font-bold text-3xl my-4'>My Tags</p>
      {!myTags.length ? (
        <p>You have no expenses yet!</p>
      ) : (
        myTags.map((myTag) => {
          return <TagCard myTag={myTag} refetch={refetch} key={myTag._id} />;
        })
      )}
    </div>
  );
};

export default Tags;
