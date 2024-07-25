import React from "react";
import { Link } from "react-router-dom";

const ListingCard = ({id,name,desc,img,originalPrice,discountedPrice}) => {
  return (
    <div key={id} className="border p-2 rounded-lg shadow-lg">
      <Link to={`/listing/${id}`} className="block">
        <img src={img} alt="" />
        <h2 className="text-xl font-semibold">{name}</h2>
        <p>{desc}</p>
        <p>{originalPrice}</p>
        <p>{discountedPrice}</p>
      </Link>
    </div>
  );
};

export default ListingCard;
