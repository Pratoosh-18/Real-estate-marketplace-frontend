import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ListingContext } from "../context/ListingContext";
import ListingCard from "../components/ListingCard";

const ListingsPage = () => {
  const { listings, setListings } = useContext(ListingContext);
  const [visibleListings, setVisibleListings] = useState(9);

  useEffect(() => {
    const getAllListings = async () => {
      const response = await axios.get(
        "https://real-estate-marketplace-backend.onrender.com/api/v1/listing/getListings"
      );
      setListings(response.data.listings);
    };
    getAllListings();
  }, [setListings]);

  const handleShowMore = () => {
    setVisibleListings((prevVisibleListings) => prevVisibleListings + 6);
  };

  return (
    <div>
      <div className="flex">
        <div className="side-bar hidden md:block md:w-[30%] lg:w-[20%] border-black border-2">
          Hello
        </div>
        <div className="w-full md:w-[70%] lg:w-[80%]">
          {listings.length === 0 ? (
            <>Loading.....</>
          ) : (
            <>
              <div className="flex flex-wrap justify-center gap-4 my-4">
                {listings.slice(0, visibleListings).map((item) => (
                  <ListingCard
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    img={item.imageUrls[0]}
                    desc={item.description}
                    originalPrice={item.regularPrice}
                    discountedPrice={item.discountPrice}
                  />
                ))}
              </div>
              {visibleListings < listings.length && (
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleShowMore}
                  >
                    Show More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;
