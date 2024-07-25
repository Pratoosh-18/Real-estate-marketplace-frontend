import { createContext, useState } from "react";

export const ListingContext = createContext();

export const ListingContextProvider = ({ children }) => {
  const [listings, setListings] = useState([]);

  const value = {
    listings,
    setListings,
  };

  return (
    <ListingContext.Provider value={value}>
      {children}
    </ListingContext.Provider>
  );
};
