import React from "react";
import { useSelector } from "react-redux";
import { selectName } from "./authSlice";

const Home = () => {
  const name = useSelector(selectName);
  return <>{name && `Welcome ${name}`}</>;
};

export default Home;
