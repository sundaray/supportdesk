import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { XCircleIcon } from "@heroicons/react/outline";
import { updateJwt, updateName } from "./authSlice";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";

const errorVariant = {
  initial: {
    opacity: 0,
    x: "-0.1rem",
  },
  animate: {
    opacity: 1,
    x: "0rem",
  },
  exit: {
    opacity: 0,
    x: "-0.1rem",
  },
};
const loginErrorVariant = {
  initial: {
    opacity: 0,
    y: "-0.1rem",
  },
  animate: {
    opacity: 1,
    x: "0rem",
  },
  exit: {
    opacity: 0,
    y: "-0.1rem",
  },
};

const Login = () => {
  const [loginError, setLoginError] = useState(null);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mutation = useMutation(
    (loginFormData) => {
      return axios.post("/api/users/login", loginFormData);
    },
    {
      onSuccess: (data) => {
        const { data: response } = data;
        localStorage.setItem("authStatus", JSON.stringify(response));
        dispatch(updateJwt(response.token));
        const { name } = jwt_decode(response.token);
        dispatch(updateName(name));
        navigate(location.state ? location.state.from.pathname : "/");
      },
      onError: ({ message }) => {
        setLoginError(message);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(5, "Must be 5 characters or more")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <>
      <AnimatePresence>
        {loginError && (
          <motion.div
            variants={loginErrorVariant}
            initial="initial"
            animate="animate"
            exit="initial"
            className="flex justify-between items-center w-11/12  md:w-3/5 xl:w-2/5 h-10 mb-4 bg-red-400 shadow-md rounded px-4 py-2 m-auto"
          >
            <p className="text-center">{loginError}</p>
            <XCircleIcon
              className="w-5 h-5 hover:text-gray-50"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginError(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <form
        className="w-11/12  md:w-3/5 xl:w-2/5 flex flex-col bg-white shadow-md rounded px-8 py-8 m-auto"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col mb-4">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200"
            id="email"
            name="email"
            type="email"
            {...formik.getFieldProps("email")}
          />
          <AnimatePresence>
            {formik.touched.email && formik.errors.email ? (
              <motion.span
                variants={errorVariant}
                initial="initial"
                animate="animate"
                exit="initial"
                className="mt-1 text-red-500 text-xs italic"
              >
                {formik.errors.email}
              </motion.span>
            ) : (
              ""
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col mb-4">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200"
            id="password"
            name="password"
            type="password"
            {...formik.getFieldProps("password")}
          />
          <AnimatePresence>
            {formik.touched.password && formik.errors.password ? (
              <motion.span
                variants={errorVariant}
                initial="initial"
                animate="animate"
                exit="initial"
                className="mt-1 text-red-500 text-xs italic"
              >
                {formik.errors.password}
              </motion.span>
            ) : (
              ""
            )}
          </AnimatePresence>
        </div>
        <p className="mb-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-500 font-medium">
            Register
          </Link>
        </p>
        <div>
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};
export default Login;
