import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <div className='flex gap-3'>
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
