import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./authSlice";

const Home = () => {
  const displayName = useSelector(selectUser);
  return (
    <>
      <div>{`Hello ${displayName}`}</div>
    </>
  );
};

export default Home;
