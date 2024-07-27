import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { ListingContext } from "../context/ListingContext";
import axios from "axios";
import { FaCopy, FaCouch, FaParking } from "react-icons/fa";
import { toast } from "react-toastify";


const Profile = () => {
  const ProfileListingCard = ({ listing, bg, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteListing = async () => {
      try {
        setIsDeleting(true);
        console.log(listing._id);
        const res = await axios.delete("https://real-estate-marketplace-backend.onrender.com/api/v1/listing/deleteListing",
          {
            data: { listingId: listing._id },
          }
        );

        console.log(res.data);
        onDelete(listing._id);
        toast.success('The listing was deleted !', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          });
      } catch (error) {
        toast.error('Unable to delete listing at this moment !', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          });
        setIsDeleting(false);
        console.error(
          "Error deleting listing:",
          error.response ? error.response.data : error.message
        );
      }
    };

    const copyToClipboard = async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    };

    return (
      <div
        className={`w-fit md:w-full flex flex-col md:flex-row justify-between bg-${bg} shadow-md rounded-lg p-6 mt-10 mb-10`}
      >
        <div className={`w-full h-fit justify-between flex flex-col md:flex-row items-center space-x-4`}>
          <div className="flex gap-5 flex-col md:flex-row">
            <img
              className="h-36 lg:h-56 rounded object-cover"
              src={listing.imageUrls[0]}
              alt={`${listing.name} image`}
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {listing.name}
              </h2>
              <p className="text-sm text-gray-600">Address: {listing.address}</p>

              <p className="text-sm text-gray-600">Bedrooms: {listing.bedrooms}</p>
              <p className="text-sm text-gray-600">Bathrooms: {listing.bathrooms}</p>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <FaParking />
                <span>Parking</span>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <FaCouch />
                <span>Furnished</span>
              </div>
              <p className="text-sm text-gray-600">
                Created At: {new Date(listing.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Regular Price: ${listing.regularPrice.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  Discount Price: ${listing.discountPrice.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  Sold: {listing.isSold ? "Yes" : "No"}
                </p>
                {listing.isSold ? (
                  <div className="text-sm">
                    Buyer : {listing.buyerEmail}
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => copyToClipboard(listing.buyerEmail)}
                    >
                      <FaCopy />
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          {listing.isSold ? (
            <div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-28 hover:bg-red-600 transition"
                onClick={handleDeleteListing}
              >
                {isDeleting ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      class="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  <>Delete</>
                )}
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
      toast.info("You have been logged out", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    }
  };

  const handleDeleteFromState = (listingId) => {
    setUserListings((prevListings) =>
      prevListings.filter((listing) => listing._id !== listingId)
    );
    setSoldListings((prevListings) =>
      prevListings.filter((listing) => listing._id !== listingId)
    );
    setUnsoldListings((prevListings) =>
      prevListings.filter((listing) => listing._id !== listingId)
    );
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
          <div className="w-[90%] sm:w-[80%] md:w-[50%] mx-auto bg-white shadow-md rounded-lg p-6 mt-10 mb-10">
            <div className="flex items-center space-x-4">
              <img
                className="h-16 w-16 sm:w-24 sm:h-24 rounded-full object-cover"
                src={user.avatar}
                alt={`${user.username}'s avatar`}
              />
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  {user.username}
                </h2>
                <p className="text-sm  text-gray-600">{user.email}</p>
                <p className="text-gray-400 text-sm">
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text font-medium text-gray-800">User ID:</h3>
              <p className="text-xs text-gray-600">{user._id}</p>
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
        <div className="flex h-[90vh] w-full justify-center items-center flex-col">
          <section class="text-black">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Something's missing.</p>
            <p class="mb-4 text-lg font-light text-gray-600">It seems you need to log in to access this page.</p>
            <div className="flex flex-col w-full">

          <Link to={"/"} class="flex justify-center items-center  border-2 border-black text-black bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</Link>
            <Link to={"/login"} class="flex justify-center items-center  border-2 border-black text-black bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Login</Link>
            </div>
        </div>   
    </div>
</section>
        </div>
      )}

      <div className="px-[3%] md:px-[5%] flex flex-col">
        {userListings.length > 0 ? (
          <div className>
            <h2 className="text-2xl font-semibold text-gray-800 mt-10">
              Your Listings:
            </h2>
            <div className="flex flex-col justify-center items-center">
              {soldListings.length > 0 ? (
                <>
                  <h3 className="text-xl font-medium text-gray-800 mt-6">
                    Sold Listings:
                  </h3>
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
                  <h3 className="text-xl font-medium text-gray-800 mt-6">
                    Unsold Listings:
                  </h3>
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
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Profile;
