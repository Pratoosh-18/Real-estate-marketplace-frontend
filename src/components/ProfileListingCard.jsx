import React from 'react';

const ProfileListingCard = ({ listing }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <div className="flex items-center space-x-4">
        <img
          className="w-48 h-48 rounded object-cover"
          src={listing.imageUrls[0]}
          alt={`${listing.name} image`}
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{listing.name}</h2>
          <p className="text-gray-600">Address: {listing.address}</p>
          
          <p className="text-gray-600">Bedrooms: {listing.bedrooms}</p>
          <p className="text-gray-600">Bathrooms: {listing.bathrooms}</p>
          <p className="text-gray-600">Parking: {listing.parking ? 'Yes' : 'No'}</p>
          <p className="text-gray-600">Furnished: {listing.furnished ? 'Yes' : 'No'}</p>
          <p className="text-gray-600">Created At: {new Date(listing.createdAt).toLocaleDateString()}</p>
          <p className="text-gray-600">Description: {listing.description}</p>
          <div className="flex space-x-2 mt-2">
            {listing.imageUrls.map((url, index) => (
              <img
                key={index}
                className="w-24 h-24 rounded object-cover"
                src={url}
                alt={`Listing image ${index + 1}`}
              />
            ))}
          </div>
          <div className="mt-4">
            <p className="text-gray-600">Regular Price: ${listing.regularPrice.toLocaleString()}</p>
            <p className="text-gray-600">Discount Price: ${listing.discountPrice.toLocaleString()}</p>
            <p className="text-gray-600">Sold: {listing.isSold ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileListingCard;
