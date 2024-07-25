import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ListingContext } from "../context/ListingContext";

const ListingDetail = () => {
  const { id } = useParams();
  const { listings } = useContext(ListingContext);
  const listing = listings.find((item) => item._id === id);

  if (!listing) return <div>Loading...</div>;

  return (
    <div>
      <h1>{listing.name}</h1>
      <p>{listing.description}</p>
    </div>
  );
};

export default ListingDetail;
