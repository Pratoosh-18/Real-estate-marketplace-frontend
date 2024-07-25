import React from "react";
import { Link } from "react-router-dom";

const ListingCard = ({id,name,desc,img,originalPrice,discountedPrice,listingDate}) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <div key={id} className="w-[280px] border p-2 rounded-lg shadow-lg">
      <Link to={`/listing/${id}`} className="block">
        <img src={img} alt="" />
        <h2 className="text-xl font-semibold">{name}</h2>
        <p>{desc}</p>
        <p>{originalPrice}</p>
        <p>{discountedPrice}</p>
        <p>{formatDate(listingDate)}</p>
        <p></p>
      </Link>
    </div>
  );
};

export default ListingCard;
