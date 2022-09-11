import React from "react";

const DeleteModal = ({handleModal, deleteTag, myTag}) => {
  return (
    <>
      <div className='w-screen h-screen bg-black fixed top-0 left-0 opacity-70 z-50'></div>
      <div
        id='popup-modal'
        tabindex='-1'
        class='flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full'>
        <div class='relative p-4 w-full max-w-md h-full md:h-auto'>
          <div class='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <button
              type='button'
              class='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
              data-modal-toggle='popup-modal'>
              <span class='sr-only'>Close modal</span>
            </button>
            <div class='p-6 text-center'>
              <h3 class='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                Are you sure you want to sign out?
              </h3>
              <button
                onClick={deleteTag(myTag._id)}
                data-modal-toggle='popup-modal'
                type='button'
                class='text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'>
                Yes, I'm sure
              </button>
              <button
                onClick={handleModal}
                data-modal-toggle='popup-modal'
                type='button'
                class='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'>
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
