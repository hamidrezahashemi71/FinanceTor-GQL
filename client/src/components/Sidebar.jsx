import {Link} from "react-router-dom";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import {useState, useEffect, useContext} from "react";
import {AppContext} from "../context/context";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const {data, logout, refetch} = useContext(AppContext);
  const [thisUserInfo, setThisUserInfo] = useState({
    name: "",
    profilePic: "",
    username: "",
  });

  useEffect(() => {
    if (data)
      setThisUserInfo({
        ...thisUserInfo,
        name: data.me.name,
        profilePic: data.me.img,
        username: data.me.username,
      });
    refetch();
  }, [data]);

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {showSidebar ? (
        <FaIcons.FaRegWindowClose
          onClick={handleSidebar}
          className='absolute right-2 top-2 w-4 h-4 text-purple-900 cursor-pointer hover:text-red-900 transition-all'
        />
      ) : (
        <FaIcons.FaBookOpen
          onClick={handleSidebar}
          className='absolute right-2 top-2 w-4 h-4 text-purple-900 cursor-pointer hover:text-red-900 transition-all'
        />
      )}
      <aside className={showSidebar ? "z-50 w-64" : "hidden z-50 w-64"}>
        <div className='overflow-y-auto py-4 px-3 bg-purple-400 rounded'>
          <img
            className='w-12 h-12 rounded-full'
            src={
              thisUserInfo.profilePic
                ? `http://localhost:80/${data.me.img}`
                : "/assets/images/user.png"
            }
            alt='user photo'
          />
          <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
            {thisUserInfo.name.length > 10
              ? `${thisUserInfo.name.slice(0, 10)}...`
              : thisUserInfo.name}
          </span>
          <ul className='space-y-2'>
            <li>
              <Link
                to={"/dashboard"}
                className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                <MdIcons.MdDashboard />
                <span className='ml-3'>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                <FaIcons.FaHome />
                <span className='flex-1 ml-3 whitespace-nowrap'>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/editprofile"}
                className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                <FaIcons.FaEdit />
                <span className='flex-1 ml-3 whitespace-nowrap'>
                  Edit Profile
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/expenses"}
                className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                <FaIcons.FaCommentDollar />
                <span className='flex-1 ml-3 whitespace-nowrap'>Expenses</span>
                <span className='inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200'>
                  3
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/createxpense"}
                className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                <FaIcons.FaFileInvoiceDollar />
                <span className='flex-1 ml-3 whitespace-nowrap'>
                  Create Expense
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/tags"}
                className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                <FaIcons.FaTag />
                <span className='flex-1 ml-3 whitespace-nowrap'>Tags</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/createtag"}
                className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                <FaIcons.FaUserTag />
                <span className='flex-1 ml-3 whitespace-nowrap'>
                  Create Tag
                </span>
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                <FaIcons.FaSignOutAlt />
                <span className='flex-1 ml-3 whitespace-nowrap'>Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
