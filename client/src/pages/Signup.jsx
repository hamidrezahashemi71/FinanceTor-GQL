import {Link} from "react-router-dom";

const Signup = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-purple-300 px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-4xl font-extrabold text-center'>Sign up</h1>
          <input
            type='text'
            className='block border-[1px] border-gray-200 w-full p-3 rounded mb-4'
            name='fullname'
            placeholder='Full Name'
          />

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
          <input
            type='password'
            className='block border border-gray-200 w-full p-3 rounded mb-4'
            name='confirm_password'
            placeholder='Confirm Password'
          />

          <button
            type='submit'
            className='w-full text-center py-3 rounded bg-purple-900 text-white hover:bg-black transition-all focus:outline-none my-1'>
            Create Account
          </button>

          <div className='text-center text-sm text-gray-800 mt-4'>
            By signing up, you agree to the
            <Link
              className='no-underline border-b border-gray-900 text-gray-900'
              to={"#"}>
              Terms of Service
            </Link>
            and
            <Link
              className='no-underline border-b border-gray-900 text-gray-900'
              to={"#"}>
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className='text-gray-900 mt-6'>
          Already have an account?
          <Link
            className='no-underline border-b border-blue-600 text-blue-600'
            to={"/login"}>
            Login
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default Signup;
