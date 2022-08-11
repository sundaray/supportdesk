import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, queryCache } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const NewTicket = () => {
  const navigate = useNavigate();
  const mutation = useMutation(
    (ticketData) => {
      axios.post("/api/users/tickets/create", ticketData);
    },
    {
      onSuccess: () => {
        navigate("/tickets");
        queryCache.invalidateQueries("tickets");
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
            className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
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
            <span className="text-red-500 text-xs italic">
              {formik.errors.product}
            </span>
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
            <span className="text-red-500 text-xs italic">
              {formik.errors.description}
            </span>
          ) : null}
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Ticket
          </button>
        </div>
      </form>
    </div>
  );
};
export default NewTicket;
