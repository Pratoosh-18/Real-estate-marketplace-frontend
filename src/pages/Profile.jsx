import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { ListingContext } from "../context/ListingContext";
import axios from "axios";

const Profile = () => {
  const ProfileListingCard = ({ listing, bg, onDelete }) => {
    const handleDeleteListing = async () => {
      try {
        console.log(listing._id);
        const res = await axios.delete(
          "https://real-estate-marketplace-backend.onrender.com/api/v1/listing/deleteListing",
          {
            data: { listingId: listing._id },
          }
        );

        console.log(res.data);
        onDelete(listing._id);
      } catch (error) {
        console.error(
          "Error deleting listing:",
          error.response ? error.response.data : error.message
        );
      }
    };

    return (
      <div
        className={`max-w-2xl mx-auto bg-${bg} shadow-md rounded-lg p-6 mt-10`}
      >
        <div className={`flex items-center space-x-4`}>
          <img
            className="w-48 h-48 rounded object-cover"
            src={listing.imageUrls[0]}
            alt={`${listing.name} image`}
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {listing.name}
            </h2>
            <p className="text-gray-600">Address: {listing.address}</p>

            <p className="text-gray-600">Bedrooms: {listing.bedrooms}</p>
            <p className="text-gray-600">Bathrooms: {listing.bathrooms}</p>
            <p className="text-gray-600">
              Parking: {listing.parking ? "Yes" : "No"}
            </p>
            <p className="text-gray-600">
              Furnished: {listing.furnished ? "Yes" : "No"}
            </p>
            <p className="text-gray-600">
              Created At: {new Date(listing.createdAt).toLocaleDateString()}
            </p>
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
              <p className="text-gray-600">
                Regular Price: ${listing.regularPrice.toLocaleString()}
              </p>
              <p className="text-gray-600">
                Discount Price: ${listing.discountPrice.toLocaleString()}
              </p>
              <p className="text-gray-600">
                Sold: {listing.isSold ? "Yes" : "No"}
              </p>
            </div>
          </div>
          {listing.isSold ? (
            <div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-red-600 transition"
                onClick={handleDeleteListing}
              >
                Delete
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  const { user, setUser } = useContext(UserContext);
  const { listings } = useContext(ListingContext);
  const [userListings, setUserListings] = useState([]);
  const [soldListings, setSoldListings] = useState([]);
  const [unsoldListings, setUnsoldListings] = useState([]);
  const navigate = useNavigate();

  const handleClick = (path) => {
    let confirmLogout = confirm("Are you sure you want to log out ?");
    if (confirmLogout) {
      setUser({});
      navigate("/");
    }
  };

  const handleDeleteFromState = (listingId) => {
    setUserListings((prevListings) => prevListings.filter(listing => listing._id !== listingId));
    setSoldListings((prevListings) => prevListings.filter(listing => listing._id !== listingId));
    setUnsoldListings((prevListings) => prevListings.filter(listing => listing._id !== listingId));
  };

  useEffect(() => {
    const userListing = listings.filter((item) => {
      return item.owner.email === user.email;
    });
    setUserListings(userListing);

    const tempSold = userListing.filter((item) => {
      return item.isSold === true;
    });
    setSoldListings(tempSold);
    const tempUnSold = userListing.filter((item) => {
      return item.isSold === false;
    });
    setUnsoldListings(tempUnSold);
  }, [listings, user]);

  return (
    <div>
      {user && Object.keys(user).length > 0 ? (
        <>
          <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
            <div className="flex items-center space-x-4">
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={user.avatar}
                alt={`${user.username}'s avatar`}
              />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user.username}
                </h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-400 text-sm">
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800">User ID:</h3>
              <p className="text-gray-600">{user._id}</p>
            </div>
            <div className="mt-6">
              <Link to="/create-listing">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-blue-600 transition">
                  Create Listing
                </button>
              </Link>
              <button
                onClick={handleClick}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-red-600 transition"
              >
                Log out
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>OOPS</div>
          <div>You need to login first </div>
        </>
      )}

      <div>
        {userListings.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mt-10">Your Listings:</h2>
            <div>
              {soldListings.length > 0 ? (
                <>
                  <h3 className="text-xl font-medium text-gray-800 mt-6">Sold Listings:</h3>
                  <div>
                    {soldListings.map((item) => {
                      return (
                        <ProfileListingCard
                          key={item._id}
                          listing={item}
                          bg="green-200"
                          onDelete={handleDeleteFromState}
                        />
                      );
                    })}
                  </div>
                </>
              ) : (
                <></>
              )}

              {unsoldListings.length > 0 ? (
                <>
                  <h3 className="text-xl font-medium text-gray-800 mt-6">Unsold Listings:</h3>
                  <div>
                    {unsoldListings.map((item) => {
                      return (
                        <ProfileListingCard
                          key={item._id}
                          listing={item}
                          bg="white"
                          onDelete={handleDeleteFromState}
                        />
                      );
                    })}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Profile;
