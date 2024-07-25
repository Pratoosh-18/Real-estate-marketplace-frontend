import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ListingContext } from "../context/ListingContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ListingDetail = () => {
  const { id } = useParams();
  const { listings } = useContext(ListingContext);
  const listing = listings.find((item) => item._id === id);

  if (!listing) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{listing.name}</h1>
      <div className="w-[100%] flex justify-center">
        <div className="w-[60%]">
          <Carousel>
            {listing.imageUrls.map((url, index) => (
              <div className="h-[400px]" key={index}>
                <img src={url} alt={`Listing image ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <p className="mt-4">{listing.description}</p>
      <p className="mt-2">
        <strong>Owner:</strong> {listing.owner.username}
      </p>
    </div>
  );
};

export default ListingDetail;
