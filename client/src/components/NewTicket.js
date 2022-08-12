import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePostTicket } from "./hooks/useQuery";
import ErrorFormSubmission from "./ErrorFormSubmission";

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

const NewTicket = () => {
  const [ticketError, setTicketError] = useState(null);

  const mutation = usePostTicket(setTicketError);

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
    <>
      <ErrorFormSubmission error={ticketError} setError={setTicketError} />
      <form
        className="w-11/12  md:w-3/5 xl:w-2/5 flex flex-col bg-white shadow-md rounded px-8 py-8 m-auto"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col mb-4">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="product"
          >
            Product Type
          </label>
          <select
            className="shadow border rounded leading-tight focus:outline-none focus:ring focus:ring-blue-200"
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
          <AnimatePresence>
            {formik.touched.product && formik.errors.product ? (
              <motion.span
                variants={errorVariant}
                initial="initial"
                animate="animate"
                exit="initial"
                className="text-red-500 text-xs italic"
              >
                {formik.errors.product}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>
        <div className="flex flex-col mb-4">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded mb-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200"
            id="description"
            name="description"
            rows="6"
            {...formik.getFieldProps("description")}
          />
          <AnimatePresence>
            {formik.touched.description && formik.errors.description ? (
              <motion.span
                variants={errorVariant}
                initial="initial"
                animate="animate"
                exit="initial"
                className="text-red-500 text-xs italic"
              >
                {formik.errors.description}
              </motion.span>
            ) : null}{" "}
          </AnimatePresence>
        </div>
        <div>
          <button
            className="bg-indigo-500 text-gray-50 px-2 py-1 rounded hover:bg-indigo-600"
            type="submit"
          >
            Create Ticket
          </button>
        </div>
      </form>
    </>
  );
};
export default NewTicket;
