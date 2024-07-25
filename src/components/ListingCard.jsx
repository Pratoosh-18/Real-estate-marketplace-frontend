import React from "react";
import { Link } from "react-router-dom";

const ListingCard = ({ id, name, desc, img, originalPrice, discountedPrice, listingDate, location }) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  return (
    <div key={id} className="w-[250px] rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <Link onClick={scrollToTop} to={`/listing/${id}`} className="block">
        <img src={img} alt={name} className="w-full h-[150px] object-cover" />
        <div className="p-2 h-full flex flex-col justify-between">
          <div>

          <h2 className="text-base font-semibold text-gray-800 mb-1">{name}</h2>
          <p className="text-sm text-gray-600 mb-2">{desc}</p>
          <div className="mb-2">
            <p className="text-gray-900 text-base font-bold">{discountedPrice ? `$${discountedPrice.toLocaleString()}` : `$${originalPrice.toLocaleString()}`}</p>
            {discountedPrice && (
              <p className="text-gray-500 line-through">{`$${originalPrice.toLocaleString()}`}</p>
            )}
          </div>
            </div>
          <div className="flex flex-col justify-between text-gray-600 text-sm">
            <p>{location}</p>
            <p>{formatDate(listingDate)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
