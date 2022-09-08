import {Outlet, useNavigate} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import {useQuery, gql} from "@apollo/client";
import Loading from "../components/Loading";
import NotFound from "../pages/NotFound";
import Cookies from "universal-cookie";
import {useEffect} from "react";

const MainLayout = () => {
  const cookie = new Cookies();
  const nav = useNavigate();
  const GET_ME = gql`
    query Query {
      me {
        _id
        name
        username
        img
        myTags {
          _id
          name
          color
        }
        myExpenses {
          _id
          amount
          tags {
            _id
            name
            color
          }
          geo {
            lat
            lon
          }
          date
          address {
            MunicipalityZone
            Neighbourhood
            FormattedAddress
            Place
          }
        }
      }
    }
  `;

  useEffect(() => {
    if (!cookie.get("ut")) nav("/login");
    if (data) refetch();
  }, []);

  const {data, loading, error, refetch} = useQuery(GET_ME);
  console.log(data);

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
