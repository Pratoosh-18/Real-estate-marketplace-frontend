import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { ListingContext } from "../context/ListingContext";
import ProfileListingCard from "../components/ProfileListingCard";

const Profile = () => {
  const { user,setUser } = useContext(UserContext);
  const { listings } = useContext(ListingContext);
  const [userListings, setUserListings] = useState([]);
  const [soldListings, setSoldListings] = useState([]);
  const [unsoldListings, setUnsoldListings] = useState([]);
  const navigate = useNavigate()

  const handleClick = (path) => {
    let confirmLogout = confirm("Are you sure you want to log out ?");
    if (confirmLogout) {
      setUser({});
      navigate("/");
    }
  };

  useEffect(() => {
    const userListing = listings.filter((item) => {
      return item.owner.email === user.email;
    });
    setUserListings(userListing);

    const tempSold = userListing.filter((item) => {
      return item.isSold == true;
    });
    setSoldListings(tempSold);
    const tempUnSold = userListing.filter((item) => {
      return item.isSold == false;
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
              <button onClick={handleClick} className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-red-600 transition">
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
        {listings.length > 0 ? <>Your listings :</> : <></>}

        <div>
          {soldListings.length > 0 ? <>Sold listings :</> : <></>}

          <div>
            {soldListings.map((item) => {
              return <ProfileListingCard key={item._id} listing={item} />;
            })}
          </div>
        </div>
        <div>
          {unsoldListings.length > 0 ? <>Unsold listings :</> : <></>}

          <div>
            {unsoldListings.map((item) => {
              return <ProfileListingCard key={item._id} listing={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
