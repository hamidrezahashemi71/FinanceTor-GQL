import {Link} from "react-router-dom";
import {useContext} from "react";
import {AppContext} from "../context/context";

const Home = () => {
  const {data} = useContext(AppContext);
  return (
    <div className='p-10'>
      <div className='h-screen w-full p-3 bg-gray-900 flex items-center justify-center text-center bg-cover bg-center'>
        <div className='text-center'>
          <h2 className='text-4xl tracking-tight leading-10 font-light sm:text-5xl text-white sm:leading-none md:text-6xl'>
            <span className='text-purple-600 font-bold'>FinanceTor;</span> Here
            it is!
          </h2>
          <p className='mt-3 text-white sm:mt-5 sm:text-md sm:max-w-xl sm:mx-auto md:mt-5'>
            This is a React JavaScript Application styled with Tailwind CSS
            which uses a Garph QL backend server. You can sign up to this app
            and manage your daily personal expenses by creating new expenses and
            tags as your category of expense. You can delete defined expenses
            and edit defined tags. Also the option of editing profile picture
            and username is in edit profile section in the dashboard. Obviously
            for accessing the dashboard you should login first. Feel free for
            any recommandations from the contact page.
          </p>
          {!data ? (
            <div className='mt-5 sm:mt-8 sm:flex justify-center'>
              <div className='rounded-md shadow'>
                <Link
                  to={"/signup"}
                  className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-regular rounded-md text-white bg-purple-600 hover:bg-purple-900 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple transition duration-150 ease-in-out md:py-4 md:px-10'>
                  Get Started
                </Link>
              </div>
              <div className='mt-3 sm:mt-0 sm:ml-3'>
                <Link
                  to={"/login"}
                  className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-regular rounded-md text-purple-700 bg-purple-200 hover:text-purple-600 hover:bg-purple-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out md:py-4 md:px-10'>
                  Login
                </Link>
              </div>
            </div>
          ) : (
            <p className='text-white font-bold mt-4 text-3xl'>
              {`Welcome ${
                data.me.name.length > 10
                  ? `${data.me.name.slice(0, 10)}...`
                  : data.me.name
              }`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
