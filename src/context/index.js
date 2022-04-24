import React from "react";
import Loading from "../components/Loading/Loading";
import api from "../network";

export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = React.useState(null);

  const [loading, setLoading] = React.useState(
    localStorage.getItem("token") !== null
  );

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      api
        .getUserData()
        .then(({ data }) => setUser(data))
        .catch((err) => {})
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <Loading />;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
