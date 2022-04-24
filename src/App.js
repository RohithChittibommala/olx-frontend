import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CreateListing from "./components/CreateListing";
import EditListing from "./components/EditListing";
import Home from "./components/Home/";
import ListingDetail from "./components/ListingDetail";
import Login from "./components/Login/";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile";
import Register from "./components/Register/Register";
import { AuthContext } from "./context";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="font-open">
      {user && <Navbar user={user} />}
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        theme={"colored"}
        pauseOnHover
      />

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute redirectTo={"/login"}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <NotAllowedIfLoggedIn>
              <Login />
            </NotAllowedIfLoggedIn>
          }
        />
        <Route
          path="/register"
          element={
            <NotAllowedIfLoggedIn>
              <Register />
            </NotAllowedIfLoggedIn>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute redirectTo={"/login"}>
              <CreateListing />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute redirectTo={"/login"}>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <PrivateRoute redirectTo={"/login"}>
              <EditListing />
            </PrivateRoute>
          }
        />
        <Route
          path="/listing/:id"
          element={
            <PrivateRoute redirectTo={"/login"}>
              <ListingDetail />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

function PrivateRoute({ children, redirectTo }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to={redirectTo} />;
  return children;
}

function NotAllowedIfLoggedIn({ children }) {
  const { user } = useContext(AuthContext);
  if (user) return <Navigate to={"/"} />;
  return children;
}

export default App;
