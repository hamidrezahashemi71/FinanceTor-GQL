import {Outlet, useNavigate} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import NotFound from "../pages/NotFound";
import {useContext} from "react";
import {AppContext} from "../context/context";
import Cookies from "universal-cookie";
import {useEffect} from "react";

const MainLayout = () => {
  const cookie = new Cookies();
  const nav = useNavigate();

  const {data, loading, error, refetch} = useContext(AppContext);
  console.log(data);

  useEffect(() => {
    if (!cookie.get("ut")) nav("/login");
    if (data) refetch();
  }, []);

  if (loading) return <Loading />;
  if (error) return <NotFound />;
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
