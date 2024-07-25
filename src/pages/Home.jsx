import React, { useContext, useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  useEffect(() => {
    const refreshServer = async () => {
      const res = await axios.get(
        "https://real-estate-marketplace-backend.onrender.com/"
      );
      console.log(res.data);
    };
    refreshServer();
  }, []);

  return (
    <>
      <Link to={"/listings"}>Explore...</Link>
      <Carousel />
    </>
  );
};

export default Home;
