import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import ListingDetail from "./pages/ListingDetails";
import { ListingContextProvider } from "./context/ListingContext";
import { UserContextProvider } from "./context/UserContext";
import ListingsPage from "./pages/ListingsPage";

{
  /* {import.meta.env.VITE_REACT_TESTING_ENV} */
}

const AppContent = () => {
  // const location = useLocation();

  // const showNavbarAndFooter =
  //   location.pathname !== "/signup" && location.pathname !== "/login";

  return (
    <>
      <UserContextProvider>
        <ListingContextProvider>
          {/* {showNavbarAndFooter && <Navbar />} */}
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
          </Routes>
          {/* {showNavbarAndFooter && <Footer />} */}
          <Footer/>
        </ListingContextProvider>
      </UserContextProvider>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
