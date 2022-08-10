import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const NewTicket = () => {
  const navigate = useNavigate();
  const mutation = useMutation(
    (ticketData) => {
      return axios.post("/api/users/tickets/create", ticketData);
    },
    {
      onSuccess: (data) => {
        const { data: response } = data;
        console.log(response);
        // navigate("/");
      },
    }
  );
  const formik = useFormik({
    initialValues: {
      product: "",
      description: "",
    },
    validationSchema: Yup.object({
      product: Yup.string()
        .oneOf(["iMac", "iPhone", "iPad", "Macbook Pro"])
        .required("Required."),
      description: Yup.string().required("Required."),
    }),
    onSubmit: (values) => {
      console.log(values);
      mutation.mutate(values);
    },
  });

  return (
    <div className="ticket-form-container">
      <div>
        <h1>Create a new ticket</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="product">Product Type</label>
          <select
            name="product"
            id="product"
            {...formik.getFieldProps("product")}
          >
            <option value="">Select a product:</option>
            <option value="iPhone">iPhone</option>
            <option value="Macbook Pro">Macbook Pro</option>
            <option value="iMac">iMac</option>
            <option value="iPad">iPad</option>
          </select>
          {formik.touched.product && formik.errors.product ? (
            <span>{formik.errors.product}</span>
          ) : null}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description ? (
            <span>{formik.errors.description}</span>
          ) : null}
        </div>
        <div>
          <button type="submit">Create Ticket</button>
        </div>
      </form>
    </div>
  );
};
export default NewTicket;
