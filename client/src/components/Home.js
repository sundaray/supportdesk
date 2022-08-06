import React from "react";
import { useSelector } from "react-redux";
import { selectName } from "./authSlice";

const Home = () => {
  const name = useSelector(selectName);
  return (
    <>
      <div>Hello {name}</div>
    </>
  );
};

export default Home;
