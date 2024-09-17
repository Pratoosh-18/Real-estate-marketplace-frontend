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
import ListingDetail from "./pages/ListingDetails";
import { ListingContextProvider } from "./context/ListingContext";
import { UserContextProvider } from "./context/UserContext";

import CreateListing from "./pages/CreateListing";
import ListingsPage from "./pages/ListingsPage";
import About from "./pages/About";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AppContent = () => {
  
  return (
    <>
      <UserContextProvider>
        <ListingContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
          </Routes>
          <Footer />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <ToastContainer />
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
