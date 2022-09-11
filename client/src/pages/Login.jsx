import {Link} from "react-router-dom";
import {useMutation, gql} from "@apollo/client";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import Cookies from "universal-cookie";
import Loading from "../components/Loading";

const Login = () => {
  const [logInfo, setLogInfo] = useState({
    username: "",
    password: "",
  });

  const cookie = new Cookies();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cookie.get("ut")) return window.location.assign("/dashboard");
    setLoading(false);
  }, []);

  const LOGIN = gql`
    mutation Mutation($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
      }
    }
  `;

  const [Login] = useMutation(LOGIN);

  const login = async () => {
    if (!logInfo.username) return toast.error("Enter User Name!");
    if (!logInfo.password) return toast.error("Enter Password!");
    try {
      const x = await Login({
        variables: {
          username: logInfo.username,
          password: logInfo.password,
        },
      });
      cookie.set("ut", x.data.login.token, {path: "/"});
      window.location.assign("/dashboard");
      // console.log(x);
    } catch (error) {
      if (error.message === "bad request")
        return toast.warn("This User Name does not exist!");
      if (error.message === "password doesnt match")
        return toast.warn("Wrong Password!");
    }
  };

  if (loading) return <Loading />;
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-purple-300 px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-4xl font-extrabold text-center'>Login</h1>
          <input
            value={logInfo.username}
            onChange={(e) =>
              setLogInfo({...logInfo, username: e.target.value.trim()})
            }
            type='text'
            className='block border border-gray-200 w-full p-3 rounded mb-4'
            name='name'
            placeholder='User Name'
          />

          <input
            value={logInfo.password}
            onChange={(e) =>
              setLogInfo({...logInfo, password: e.target.value.trim()})
            }
            type='password'
            className='block border border-gray-200 w-full p-3 rounded mb-4'
            name='password'
            placeholder='Password'
          />
          <button
            onClick={login}
            type='submit'
            className='w-full text-center py-3 rounded bg-purple-900 text-white hover:bg-black transition-all focus:outline-none my-1'>
            Sign In
          </button>
        </div>
        <div className='text-gray-900 mt-6'>
          Don't have an Account?
          <Link
            className='no-underline border-b border-blue-600 text-blue-600 hover:text-blue-900'
            to={"/signup"}>
            Register
          </Link>
          now.
        </div>
      </div>
    </div>
  );
};

export default Login;
