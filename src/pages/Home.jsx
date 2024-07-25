import React, { useContext, useEffect } from "react";
import Carousel from "../components/Carousel";
import axios from "axios"
import { Link } from "react-router-dom";
import { ListingContext } from "../context/ListingContext";
import ListingCard from "../components/ListingCard";

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
      {listings.length === 0 ? (
        <>Loading.....</>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {listings.map((item) => (
              <ListingCard id={item._id} name={item.name} img={item.imageUrls[0]}  desc={item.description} originalPrice={item.regularPrice} discountedPrice={item.discountPrice}/>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
