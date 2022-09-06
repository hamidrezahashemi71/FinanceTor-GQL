import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FirstLayout = () => {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default FirstLayout;
