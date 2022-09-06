import {Link} from "react-router-dom";

const Login = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-purple-300 px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-4xl font-extrabold text-center'>Login</h1>
          <input
            type='text'
            className='block border border-gray-200 w-full p-3 rounded mb-4'
            name='name'
            placeholder='User Name'
          />

          <input
            type='password'
            className='block border border-gray-200 w-full p-3 rounded mb-4'
            name='password'
            placeholder='Password'
          />
          <button
            type='submit'
            className='w-full text-center py-3 rounded bg-purple-900 text-white hover:bg-black transition-all focus:outline-none my-1'>
            Sign In
          </button>
        </div>
        <div className='text-gray-900 mt-6'>
          Don't have Account?
          <Link
            className='no-underline border-b border-blue-600 text-blue-600'
            to={"/signup"}>
            Register
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default Login;
