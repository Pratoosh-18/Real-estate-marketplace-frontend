import React, { useContext, useEffect } from "react";
import Carousel from "../components/Carousel";
import axios from "axios";
import { Link } from "react-router-dom";
import { ListingContext } from "../context/ListingContext";

const Home = () => {
  const { listings, setListings } = useContext(ListingContext);

  useEffect(() => {
    const getAllListings = async () => {
      const response = await axios.get(
        "https://real-estate-marketplace-backend.onrender.com/api/v1/listing/getListings"
      );
      setListings(response.data.listings);
    };
    getAllListings();
  }, [setListings]);

  return (
    <div>
      <Carousel />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {listings.map((item) => (
          <div key={item._id} className="border p-4 rounded-lg shadow-lg">
            <Link to={`/listing/${item._id}`} className="block">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p>ID: {item._id}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
