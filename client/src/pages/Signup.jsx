import {Link, useNavigate} from "react-router-dom";
import {useMutation, gql} from "@apollo/client";
import {useState} from "react";
import {toast} from "react-toastify";
import Cookies from "universal-cookie";

const Signup = () => {
  // const [regInfo, setRegInfo] = useState({
  //   name: "",
  //   username: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  const [regInfo, setRegInfo] = useState({
    name: {
      value: "",
      msg: "",
    },
    username: {
      value: "",
      msg: "",
    },
    password: {
      value: "",
      msg: "",
    },
    confirmPassword: {
      value: "",
      msg: "",
    },
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

  console.log(regInfo);

  const signup = async () => {
    // if (!regInfo.name) return toast.error("Enter Name!");
    // if (!regInfo.username) return toast.error("Enter User Name!");
    // if (!regInfo.password) return toast.error("Enter Password!");
    if (regInfo.password.value !== regInfo.confirmPassword.value)
      return toast.error("Passwords don't match!");
    const values = Object.values(regInfo);
    const ifEmpty = values.some((item) => !item.value);

    if (ifEmpty)
      values.forEach((item) => {
        if (!item.value) item.msg = "This field cannot be empty";
      });

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
            value={regInfo.name.value}
            onChange={(e) =>
              // setRegInfo({ ...regInfo, name: e.target.value.trim() })
              setRegInfo({
                ...regInfo,
                name: {value: e.target.value.trimStart(), msg: ""},
              })
            }
            type='text'
            className={`${
              regInfo.name.msg ? "border-red-600" : "border-gray-200"
            } border-[1px] block  w-full p-3 rounded outline-none`}
            name='fullname'
            placeholder='Full Name'
          />
          <p className='mb-4 p-0 text-red-600 text-xs font-semibold'>
            {regInfo.name.msg}
          </p>
          <input
            value={regInfo.username.value}
            onChange={(e) =>
              setRegInfo({
                ...regInfo,
                username: {value: e.target.value.trimStart(), msg: ""},
              })
            }
            type='text'
            className={`${
              regInfo.username.msg ? "border-red-600" : "border-gray-200"
            } border-[1px] block  w-full p-3 rounded outline-none`}
            name='name'
            placeholder='User Name'
          />
          <p className='mb-4 p-0 text-red-600 text-xs font-semibold'>
            {regInfo.username.msg}
          </p>
          <input
            value={regInfo.password.value}
            onChange={(e) =>
              setRegInfo({
                ...regInfo,
                password: {value: e.target.value.trimStart(), msg: ""},
              })
            }
            type='password'
            className={`${
              regInfo.password.msg ? "border-red-600" : "border-gray-200"
            } border-[1px] block  w-full p-3 rounded outline-none`}
            name='password'
            placeholder='Password'
          />
          <p className='mb-4 p-0 text-red-600 text-xs font-semibold'>
            {regInfo.password.msg}
          </p>
          <input
            value={regInfo.confirmPassword.value}
            onChange={(e) =>
              // setRegInfo({ ...regInfo, confirmPassword: e.target.value.trim() })
              setRegInfo({
                ...regInfo,
                confirmPassword: {
                  value: e.target.value.trimStart(),
                  msg: "",
                },
              })
            }
            type='password'
            className={`${
              regInfo.confirmPassword.msg ? "border-red-600" : "border-gray-200"
            } border-[1px] block  w-full p-3 rounded outline-none`}
            name='confirm_password'
            placeholder='Confirm Password'
          />
          <p className='mb-4 p-0 text-red-600 text-xs font-semibold'>
            {regInfo.confirmPassword.msg}
          </p>
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