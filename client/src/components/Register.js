import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { updateJwt, updateName } from "./authSlice";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";

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
        console.log(response);
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
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Name is required."),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required."),
      password: Yup.string()
        .min(5, "Must be 5 characters or more")
        .required("Password is required."),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <div className="register-form-container">
      <div>
        <h1>Register</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <span>{formik.errors.name}</span>
          ) : null}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <span>{formik.errors.email}</span>
          ) : null}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <span>{formik.errors.password}</span>
          ) : null}
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};
export default Register;
