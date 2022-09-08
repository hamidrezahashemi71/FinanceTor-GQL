import {Link, NavLink} from "react-router-dom";
import * as GiIcons from "react-icons/gi";
import {useState} from "react";

const Navbar = () => {
  const [userMenu, setUserMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleUserMenu = () => {
    setUserMenu(!userMenu);
  };

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <>
      <nav className='bg-purple-400 px-2 sm:px-4 py-2.5 rounded'>
        <div className='container flex flex-wrap justify-between items-center mx-auto'>
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
          <div className='flex items-center gap-4 md:order-2'>
            <button
              onClick={handleUserMenu}
              type='button'
              className='flex mr-5 text-sm bg-gray-200 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300'
              id='user-menu-button'
              aria-expanded='false'
              data-dropdown-toggle='user-dropdown'
              data-dropdown-placement='bottom'>
              <img
                className='w-12 h-12 rounded-full'
                src={"/assets/images/user.png"}
                alt='user photo'
              />
            </button>

            <button
              data-collapse-toggle='mobile-menu-2'
              type='button'
              className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none '
              aria-controls='mobile-menu-2'
              aria-expanded='false'>
              <span className='sr-only'>Open main menu</span>
              <GiIcons.GiHamburgerMenu
                onClick={handleMobileMenu}
                className='w-8 h-8 p-1 rounded-lg bg-gray-200'
              />
            </button>
          </div>
          <div
            className={
              mobileMenu
                ? "justify-between items-center w-full md:flex md:w-auto md:order-1"
                : "hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
            }
            id='mobile-menu-2'>
            <ul className='flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white'>
              <li>
                <NavLink
                  style={({isActive}) =>
                    isActive
                      ? {
                          color: "purple",
                        }
                      : {color: "black"}
                  }
                  to={"/"}
                  className='block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 rounded md:bg-transparent md:hover:text-purple-700 md:p-0 '
                  aria-current='page'>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={({isActive}) =>
                    isActive
                      ? {
                          color: "purple",
                        }
                      : {color: "black"}
                  }
                  to={"/contact"}
                  className='block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 '>
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={({isActive}) =>
                    isActive
                      ? {
                          color: "purple",
                        }
                      : {color: "black"}
                  }
                  to={"/login"}
                  className='block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 '>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={({isActive}) =>
                    isActive
                      ? {
                          color: "purple",
                        }
                      : {color: "black"}
                  }
                  to={"/signup"}
                  className='block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 '>
                  Signup
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        className={
          userMenu
            ? "absolute right-5 top-12 z-50 my-4 w-fit text-base bg-purple-100 rounded divide-y divide-gray-100 shadow"
            : "hidden z-50 my-4 text-base bg-purple-100 rounded divide-y divide-gray-100 shadow"
        }
        id='user-dropdown'>
        <div className='py-3 px-4'>
          <span className='block text-sm font-semibold text-gray-900'>
            Bonnie Green
          </span>
        </div>
        <ul className='py-1' aria-labelledby='user-menu-button'>
          <li>
            <Link
              to={"/dashboard"}
              className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100'>
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard/editprofile"}
              className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100'>
              Profile
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard/expenses"}
              className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100'>
              Expenses
            </Link>
          </li>
          <li>
            <Link
              to={"#"}
              className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100'>
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
