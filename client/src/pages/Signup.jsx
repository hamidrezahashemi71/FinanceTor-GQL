import {Link, useNavigate} from "react-router-dom";
import {useMutation, gql} from "@apollo/client";
import {useState} from "react";
import {toast} from "react-toastify";
import Cookies from "universal-cookie";

const Signup = () => {
  const [regInfo, setRegInfo] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const nav = useNavigate();

  const cookie = new Cookies();

  const SIGNUP = gql`
    mutation Signup($name: String!, $password: String!, $username: String!) {
      signup(name: $name, password: $password, username: $username) {
        token
      }
    }
  `;

  const [Signup] = useMutation(SIGNUP);

  const signup = async () => {
    if (!regInfo.name) return toast.error("Enter Name!");
    if (!regInfo.username) return toast.error("Enter User Name!");
    if (!regInfo.password) return toast.error("Enter Password!");
    if (regInfo.password !== regInfo.confirmPassword)
      return toast.error("Passwords don't match!");
    try {
      const x = await Signup({
        variables: {
          name: regInfo.name,
          username: regInfo.username,
          password: regInfo.password,
        },
      });
      cookie.set("ut", x.data.signup.token, {path: "/"});
      // window.location.assign("/login");
      nav("/login");
      // console.log(x);
    } catch (error) {
      if (error.message === "this username already exists")
        return toast.warn("This Username already exists!");
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-purple-300 px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-4xl font-extrabold text-center'>Sign up</h1>
          <input
            value={regInfo.name}
            onChange={(e) => setRegInfo({...regInfo, name: e.target.value})}
            type='text'
            className='block border-[1px] border-gray-200 w-full p-3 rounded mb-4'
            name='fullname'
            placeholder='Full Name'
          />

          <input
            value={regInfo.username}
            onChange={(e) => setRegInfo({...regInfo, username: e.target.value})}
            type='text'
            className={"block border border-gray-200 w-full p-3 rounded mb-4"}
            name='name'
            placeholder='User Name'
          />

          <input
            value={regInfo.password}
            onChange={(e) => setRegInfo({...regInfo, password: e.target.value})}
            type='password'
            className='block border border-gray-200 w-full p-3 rounded mb-4'
            name='password'
            placeholder='Password'
          />
          <input
            value={regInfo.confirmPassword}
            onChange={(e) =>
              setRegInfo({...regInfo, confirmPassword: e.target.value})
            }
            type='password'
            className='block border border-gray-200 w-full p-3 rounded mb-4'
            name='confirm_password'
            placeholder='Confirm Password'
          />

          <button
            onClick={signup}
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
