import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { updateJwt, updateName } from "./authSlice";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";
import { Formik, Field, Form, ErrorMessage } from "formik";

const Login = () => {
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
        navigate("/");
      },
    }
  );

  return (
    <Formik
      initialValues={{ email: " ", password: " " }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .min(5, "Must be 5 characters or more")
          .required("Password is required."),
      })}
      onSubmit={(values) => {
        mutation.mutate(values);
      }}
    >
      <Form>
        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />

        <label htmlFor="password">Password</label>
        <Field name="password" type="password" />
        <ErrorMessage name="password" />

        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
};
export default Login;
