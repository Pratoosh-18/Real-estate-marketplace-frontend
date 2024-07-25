import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing icons for menu toggle

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleClick = (path) => {
    setActiveLink(path);
    setMenuOpen(false); 
    window.scrollTo(0, 0);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="fixed h-[10vh] w-full z-50 bg-white p-4 shadow-md flex justify-between items-center">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <Link to="/" className="text-black text-2xl font-bold flex items-center">
            <p>LOGO</p>
          </Link>
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-black focus:outline-none">
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          <ul
            className={`lg:flex lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6 absolute lg:static bg-white w-full lg:w-auto left-0 lg:left-auto transition-all duration-300 ease-in-out ${
              menuOpen ? 'top-[10vh] opacity-100 z-40' : 'top-[-100vh] lg:opacity-100 opacity-0'
            }`}
          >
            {['/', '/notifications', '/profile', '/login', '/signup'].map((path) => (
              <li key={path} className="text-center lg:text-left">
                <Link
                  to={path}
                  className={`block py-2 lg:py-0 text-base transition duration-300 ${
                    activeLink === path ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'
                  }`}
                  onClick={() => handleClick(path)}
                >
                  {path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2).replace('/', '')}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="h-[10vh]"></div>
    </>
  );
};

export default Navbar;
