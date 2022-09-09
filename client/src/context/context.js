import {createContext} from "react";
import {useQuery, gql} from "@apollo/client";
import Loading from "../components/Loading";
import Cookies from "universal-cookie";

export const AppContext = createContext();
export const DataProvider = (props) => {
  const cookie = new Cookies();

  const logout = () => {
    cookie.remove("ut", {path: "/"});
    window.location.assign("/");
  };

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

  const {data, loading, error, refetch} = useQuery(GET_ME);
  if (loading) return <Loading />;
  console.log(data);

  return (
    <AppContext.Provider value={{data, loading, error, refetch, logout}}>
      {props.children}
    </AppContext.Provider>
  );
};
