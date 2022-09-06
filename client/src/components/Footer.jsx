import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <footer className='p-4 bg-purple-400 rounded-lg shadow md:px-6 md:py-8 '>
      <div className='sm:flex sm:items-center sm:justify-between'>
        <Link to={"/"} className='flex items-center'>
          <img
            src={"/assets/images/logo.png"}
            className='mr-3 h-11 sm:h-12 rounded-lg'
            alt='FinanceTor Logo'
          />
          <span className='self-center text-xl font-extrabold whitespace-nowrap'>
            FinanceTor
          </span>
        </Link>
        <ul className='flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400'>
          <li>
            <Link to={"/"} className='mr-4 hover:underline md:mr-6 '>
              Home
            </Link>
          </li>
          <li>
            <a to={"/login"} className='mr-4 hover:underline md:mr-6'>
              Login
            </a>
          </li>
          <li>
            <Link to={"/signup"} className='mr-4 hover:underline md:mr-6 '>
              Signup
            </Link>
          </li>
          <li>
            <Link to={"/contact"} className='hover:underline'>
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <hr className='my-6 border-gray-200 sm:mx-auto lg:my-8' />
      <span className='block text-sm text-gray-500 sm:text-center'>
        © 2022
        <Link to={"#"} className='hover:underline'>
          HamidreZa™
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
