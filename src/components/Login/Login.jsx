import { useFormik } from "formik";
import React, { useContext } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { AuthContext } from "../../context";
import api from "../../network";
import InputField from "../InputField";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().label("Password"),
});

const Login = () => {
  const [showPass, setShowPass] = React.useState(false);

  const { setUser } = useContext(AuthContext);

  const { mutate, isLoading } = useMutation(api.login, {
    onSuccess: ({ data }) => {
      localStorage.setItem("token", data.token);
      setUser(data.user);
      toast("Login Successful", {
        type: toast.TYPE.SUCCESS,
      });
    },

    onError: (er) => {
      toast(er?.response?.data?.message || "error occured", {
        type: toast?.TYPE.ERROR,
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {
    mutate(values);
    formik.resetForm();
  }

  return (
    <div className="h-full font-open light-blue flex flex-col min-h-screen  flex-grow  ">
      <div className="w-full shadow-md  max-w-md border-t-4 border-indigo-400 m-auto bg-white rounded-lg   py-10 px-8">
        <h1 className="text-3xl font-extrabold text-primary mt-4 mb-6 text-center">
          Log in to your account
        </h1>

        <InputField
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          placeholder="Enter your email"
          bold
          error={formik.touched.email && formik.errors.email}
        />
        <InputField
          label="Password"
          type={showPass ? "text" : "password"}
          bold
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          error={formik.touched.password && formik.errors.password}
        />

        <div className="flex items-center my-2.5">
          <input
            type="checkbox"
            className="h-4 w-4"
            onChange={() => setShowPass(!showPass)}
          />
          <p className="ml-2">Show Password</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          onClick={formik.handleSubmit}
          className={`px-12 py-2 font-semibold text-white text-base transition  ${
            isLoading ? "disabled" : "success-filled"
          }  bg-green-500 rounded-md duration-300 hover:bg-emerald-300`}
        >
          {isLoading ? "Logging You in ...  " : "Sign in"}
        </button>

        <div className="mt-3 mx-auto">
          <h3 className="text-blue-500 text-center">
            <span className="text-primary text-black text-center">
              Don't have an account?
            </span>
            <Link to="/register"> Create One</Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
