import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ListingContext } from "../context/ListingContext";
import ListingCard from "../components/ListingCard";
import ListingCardSkeleton from "../components/ListingCardSkeleton";

const ListingsPage = () => {
  const { listings, setListings } = useContext(ListingContext);
  const [visibleListings, setVisibleListings] = useState(9);
  const [sortOption, setSortOption] = useState("date-new");
  const [showParking, setShowParking] = useState(false);
  const [showFurnished, setShowFurnished] = useState(false);
  const [searchAddress, setSearchAddress] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const getAllListings = async () => {
      const response = await axios.get(
        "https://real-estate-marketplace-backend.onrender.com/api/v1/listing/getListings"
      );
      const reversedListings = response.data.listings.reverse();
      setListings(reversedListings);
      console.log(listings)
    };
    getAllListings();
  }, [setListings]);

  const handleShowMore = () => {
    setVisibleListings((prevVisibleListings) => prevVisibleListings + 6);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleAddressChange = (e) => {
    setSearchAddress(e.target.value);
  };

  const handleNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const sortListings = (listings) => {
    switch (sortOption) {
      case "price-low-high":
        return [...listings].sort((a, b) => a.regularPrice - b.regularPrice);
      case "price-high-low":
        return [...listings].sort((a, b) => b.regularPrice - a.regularPrice);
      case "date-old":
        return [...listings].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case "date-new":
      default:
        return [...listings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  const filterListings = (listings) => {
    return listings.filter((listing) => {
      const matchesAddress = listing.address
        ? listing.address.toLowerCase().includes(searchAddress.toLowerCase())
        : true;
      const matchesName = listing.name
        ? listing.name.toLowerCase().includes(searchName.toLowerCase())
        : true;
      const matchesParking = showParking ? listing.parking : true;
      const matchesFurnished = showFurnished ? listing.furnished : true;
      return matchesAddress && matchesName && matchesParking && matchesFurnished;
    });
  };

  const sortedListings = sortListings(listings);
  const sortedAndFilteredListings = filterListings(sortedListings);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="hidden min-h-[90vh] md:block md:w-[30%] lg:w-[25%] bg-white border-r border-gray-200 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Filter & Sort</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="date-new">Date: New to Old</option>
            <option value="date-old">Date: Old to New</option>
          </select>
        </div>
        
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="showParking"
            checked={showParking}
            onChange={() => setShowParking(!showParking)}
            className="mr-2"
          />
          <label htmlFor="showParking" className="text-sm font-medium text-gray-700">Parking</label>
        </div>
        
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="showFurnished"
            checked={showFurnished}
            onChange={() => setShowFurnished(!showFurnished)}
            className="mr-2"
          />
          <label htmlFor="showFurnished" className="text-sm font-medium text-gray-700">Furnished</label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Search by Address:</label>
          <input
            type="text"
            value={searchAddress}
            onChange={handleAddressChange}
            placeholder="Enter address"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Search by Name:</label>
          <input
            type="text"
            value={searchName}
            onChange={handleNameChange}
            placeholder="Enter name"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Listings */}
      <div className="w-full md:w-[70%] lg:w-[75%] p-4">
        {listings.length === 0 ? (
          <div  className="flex flex-wrap justify-center gap-4 my-4">
            <ListingCardSkeleton/>
            <ListingCardSkeleton/>
            <ListingCardSkeleton/>
            <ListingCardSkeleton/>
            <ListingCardSkeleton/>
            <ListingCardSkeleton/>
            <ListingCardSkeleton/>
            <ListingCardSkeleton/>
            <ListingCardSkeleton/>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-4 my-4">
              {sortedAndFilteredListings.slice(0, visibleListings).map((item) => (
                <ListingCard
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  img={item.imageUrls[0]}
                  desc={item.description}
                  originalPrice={item.regularPrice}
                  discountedPrice={item.discountPrice}
                  listingDate={item.createdAt}
                  location={item.address}
                />
              ))}
            </div>
            {visibleListings < sortedAndFilteredListings.length && (
              <div className="flex justify-center mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handleShowMore}
                >
                  Show More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ListingsPage;
