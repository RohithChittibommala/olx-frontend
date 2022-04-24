import { useFormik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import api from "../../network";
import InputField from "../InputField";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).required("Name is required").label("Name"), //.max(10)
  email: Yup.string()
    .email("Invalid email address format")
    .required()
    .label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

const Register = () => {
  const [showPass, setShowPass] = React.useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const { mutate, isLoading } = useMutation((data) => api.register(data), {
    onSuccess: (data) => {
      toast.info("account is successfully created");
      navigate("/login");
    },

    onError: (err) => {
      const message = err?.response?.data?.message || "Register Failed";
      toast.error(message);
    },
  });

  function handleSubmit(values) {
    mutate({ ...values, role: "student" });
    formik.resetForm();
  }

  return (
    <div className="h-screen light-blue items-center flex bg-gray-bg1 flex-grow">
      <div className="w-full  max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-8 shadow-lg">
        <h1 className="text-3xl font-extrabold  mt-4 mb-5 text-center">
          Create an account 👋
        </h1>
        <InputField
          label="Name"
          bold
          placeholder="Enter your name"
          value={formik.values.name}
          onChange={formik.handleChange("name")}
          error={formik.touched.name ? formik.errors.name : ""}
        />

        <InputField
          label="Email"
          bold
          value={formik.values.email}
          placeholder="Enter your email"
          onChange={formik.handleChange("email")}
          error={formik.touched.email ? formik.errors.email : ""}
        />
        <InputField
          label="Password"
          bold
          type={showPass ? "text" : "password"}
          value={formik.values.password}
          placeholder="Enter your password"
          onChange={formik.handleChange("password")}
          error={formik.touched.password ? formik.errors.password : ""}
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
          className={`px-16 py-2 font-semibold text-white ${
            isLoading ? "disabled" : "success-filled"
          }  bg-green-400 rounded-md `}
        >
          {isLoading ? "Registering You  ...  " : "Register"}
        </button>

        <div className="text-center my-5 flex justify-center space-x-3">
          <p> Already have accout?</p>
          <Link to="/login">
            <h3 className="text-blue-500">Login</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
