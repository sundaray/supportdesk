import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required."),
      password: Yup.string()
        .min(5, "Must be 5 characters or more")
        .required("Password is required."),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="register-form-container">
      <div>
        <h1>Login</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
export default Login;
