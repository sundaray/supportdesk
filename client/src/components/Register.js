import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
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

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mutation = useMutation(
    (registerFormData) => {
      return axios.post("/api/users/register", registerFormData);
    },
    {
      onSuccess: (data) => {
        const { data: response } = data;
        localStorage.setItem("authStatus", JSON.stringify(response));
        dispatch(updateJwt(response.token));
        const { name } = jwt_decode(response.token);
        dispatch(updateName(name));
        navigate("/");
      },
    }
  );
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, "Must be 10 characters or less")
        .required("Username is required"),
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
    <form
      className="w-1/3 flex flex-col bg-white shadow-md rounded px-8 py-8 m-auto"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col mb-4">
        <label
          className="text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200"
          id="username"
          name="username"
          type="text"
          {...formik.getFieldProps("username")}
        />
        <AnimatePresence>
          {formik.touched.username && formik.errors.username ? (
            <motion.span
              variants={errorVariant}
              initial="initial"
              animate="animate"
              exit="initial"
              className="text-red-500 text-xs italic"
            >
              {formik.errors.username}
            </motion.span>
          ) : (
            ""
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
              className="text-red-500 text-xs italic"
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
              className="text-red-500 text-xs italic"
            >
              {formik.errors.password}
            </motion.span>
          ) : (
            " "
          )}
        </AnimatePresence>
      </div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
      </div>
    </form>
  );
};
export default Register;
