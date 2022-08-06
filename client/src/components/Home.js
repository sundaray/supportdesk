import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./authSlice";

const Home = () => {
  const token = useSelector(selectUser);
  return (
    <>
      <div>{token ? "loggedIn" : "loggedOut"}</div>
    </>
  );
};

export default Home;
