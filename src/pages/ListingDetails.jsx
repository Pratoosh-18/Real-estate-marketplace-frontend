import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ListingContext } from "../context/ListingContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const ListingDetail = () => {
  const { id } = useParams();
  const { listings } = useContext(ListingContext);
  const { user } = useContext(UserContext);
  const listing = listings.find((item) => item._id === id);

  const [isSold, setIsSold] = useState(listing.isSold);

  if (!listing) return <div>Loading...</div>;

  const handleBuy = async () => {
    if (user && Object.keys(user).length > 0) {
      console.log("Buying.....");
      const res = await axios.post(
        "https://real-estate-marketplace-backend.onrender.com/api/v1/listing/buyListing",
        { listingId: listing._id, buyerEmail: user.email }
      );
      console.log(res.data);
      setIsSold(true);
    } else {
      alert("You need to log in first");
    }
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mx-auto p-4 relative">
      <Link
        onClick={scrollToTop}
        to="/listings"
        className="fixed top-[15vh] left-[12vh] bg-gray-200 text-gray-700 px-3 py-1 rounded shadow hover:bg-gray-300"
      >
        Go Back
      </Link>
      <h1 className="text-4xl font-bold mb-6 text-center">{listing.name}</h1>
      <div className="w-full flex flex-col items-center">
        <div className="w-[60%] mb-6">
          <Carousel>
            {listing.imageUrls.map((url, index) => (
              <div className="h-[400px]" key={index}>
                <img
                  src={url}
                  alt={`Listing image ${index + 1}`}
                  className="object-cover h-full w-full"
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="w-full md:w-[60%]">
          <p className="text-xl font-semibold mb-2">
            <strong>Description:</strong> {listing.description}
          </p>
          <p className="text-lg mb-2">
            <strong>Address:</strong> {listing.address}
          </p>
          <p className="text-lg mb-2">
            <strong>Owner:</strong> {listing.owner.username}
          </p>
          <p className="text-md text-gray-600 mb-2">
            <strong>Email:</strong> {listing.owner.email}
          </p>
          <p className="text-lg mb-2">
            <strong>Bedrooms:</strong> {listing.bedrooms}
          </p>
          <p className="text-lg mb-2">
            <strong>Bathrooms:</strong> {listing.bathrooms}
          </p>
          <p className="text-lg mb-2">
            <strong>Furnished:</strong> {listing.furnished ? "Yes" : "No"}
          </p>
          <p className="text-lg mb-2">
            <strong>Parking:</strong> {listing.parking ? "Yes" : "No"}
          </p>
          <p className="text-2xl font-bold text-green-600 mb-2">
            <strong>Price:</strong> $
            {listing.discountPrice
              ? listing.discountPrice.toLocaleString()
              : listing.regularPrice.toLocaleString()}
          </p>
          {listing.discountPrice && (
            <p className="text-md text-gray-500 line-through mb-2">
              <strong>Original Price:</strong> $
              {listing.regularPrice.toLocaleString()}
            </p>
          )}
        </div>

        {isSold ? (
          <div className="w-[200px] h-11 rounded-md font-bold bg-gray-300 flex justify-center items-center text-gray-700">
            Sold
          </div>
        ) : (
          <button
            onClick={handleBuy}
            className="w-[200px] h-11 rounded-md font-bold bg-blue-400 text-white"
          >
            Buy
          </button>
        )}
      </div>
      <div className="border-t border-gray-300 mt-6 pt-4 text-center text-gray-600 text-sm">
        <p>
          Listing created on {new Date(listing.createdAt).toLocaleDateString()}
        </p>
        <p>
          Last updated on {new Date(listing.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ListingDetail;
