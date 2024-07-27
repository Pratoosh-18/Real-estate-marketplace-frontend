import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import axios from "axios";
import HomeBanner from "../components/HomeBanner";
import ViewCard from "../components/ViewCard";
import ListingCardSkeleton from "../components/ListingCardSkeleton";

const Home = () => {
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);

  useEffect(() => {
    const refreshServer = async () => {
      try {
        const res = await axios.get("https://real-estate-marketplace-backend.onrender.com/");
        console.log(res.data);
      } catch (error) {
        console.error("Error refreshing server:", error);
      }
    };
    refreshServer();

    const getList = async () => {
      try {
        const response = await axios.get("https://real-estate-marketplace-backend.onrender.com/api/v1/listing/getListings");
        if (Array.isArray(response.data.listings)) {
          const listings = response.data.listings;
          const shuffledList = shuffleArray(listings);
          const midpoint = Math.ceil(shuffledList.length / 2);
          setList1(shuffledList.slice(0, midpoint));
          setList2(shuffledList.slice(midpoint));
        } else {
          console.error("Expected an array of listings but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    getList();
  }, []);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  return (
    <>
      <HomeBanner />
      <Carousel />
      <div className="px-4 md:px-36 py-14">

      <div>
        <h2 className="text-xl font-semibold mb-4">Featured Properties</h2>
        <div className="flex flex-wrap gap-4 justify-center md:justify-normal">
          {
            list1.length > 0? <></>:<>
              <ListingCardSkeleton/>
              <ListingCardSkeleton/>
              <ListingCardSkeleton/>
              <ListingCardSkeleton/>
              <ListingCardSkeleton/>
              <ListingCardSkeleton/>
            </>
          }
          {list1.map((item) => (
            <ViewCard
            key={item._id}
              id={item._id}
              name={item.name}
              img={item.imageUrls[0]}
              desc={item.description}
              originalPrice={item.regularPrice}
              discountedPrice={item.discountPrice}
              listingDate={item.createdAt}
              location={item.address}
              beds={item.bedrooms}
              parking={item.parking}
              furnished={item.furnished}
              />
            ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 mt-10">Best Deals</h2>
        <div className="flex flex-wrap gap-4 justify-center md:justify-normal">
        {
            list2.length > 0? <></>:<>
              <ListingCardSkeleton/>
              <ListingCardSkeleton/>
              <ListingCardSkeleton/>
              <ListingCardSkeleton/>
              <ListingCardSkeleton/>
              <ListingCardSkeleton/>
            </>
          }
          {list2.map((item) => (
            <ViewCard
              key={item._id}
              id={item._id}
              name={item.name}
              img={item.imageUrls[0]}
              desc={item.description}
              originalPrice={item.regularPrice}
              discountedPrice={item.discountPrice}
              listingDate={item.createdAt}
              location={item.address}
              beds={item.bedrooms}
              parking={item.parking}
              furnished={item.furnished}
              />
            ))}
        </div>
      </div>
            </div>
    </>
  );
};

export default Home;
