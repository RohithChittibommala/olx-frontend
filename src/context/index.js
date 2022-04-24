import React from "react";
import { useQuery } from "react-query";
import Loading from "../components/Loading/Loading";
import api from "../network";

export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = React.useState(null);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    api
      .getUserData()
      .then(({ data }) => setUser(data))
      .catch((err) => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
