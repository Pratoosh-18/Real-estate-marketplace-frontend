import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paths, setPaths] = useState(['/','/listings','/about', '/login', '/signup']);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setPaths(['/','/listings','/about']);
    } else {
      setPaths(['/','/listings','/about', '/login', '/signup']);
    }
  }, [user]);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = (path) => {
    if (path === '/logout') {
      // Handle logout functionality here
    } else if (path === '/profile') {
      navigate('/profile');
    } else {
      navigate(path);
    }
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="fixed h-[10vh] w-full z-50 bg-slate-100 p-4 shadow-md flex justify-between items-center">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <Link to="/" className="text-black text-2xl font-bold flex items-center">
            <p>
              <span className='text-gray-600'>Estate</span>Edge
            </p>
          </Link>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-black focus:outline-none">
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          <ul
            className={`md:flex md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 absolute md:static bg-slate-100 w-full md:w-auto left-0 md:left-auto transition-all duration-300 ease-in-out ${
              menuOpen ? 'top-[10vh] opacity-100 z-40' : 'top-[-100vh] md:opacity-100 opacity-0'
            }`}
          >
            {paths.map((path) => (
              <li key={path} className="text-center md:text-left">
                {path === '/logout' ? (
                  <button
                    className="block py-2 md:py-0 text-base transition duration-300 text-gray-500 hover:text-black"
                    onClick={() => handleLinkClick(path)}
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to={path}
                    className={`bg-slate-100 text-sm block py-2 md:py-0 transition duration-300 ${
                      activeLink === path ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'
                    }`}
                    onClick={() => handleLinkClick(path)}
                  >
                    {path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2).replace('/', '')}
                  </Link>
                )}
              </li>
            ))}
            {user && Object.keys(user).length > 0 && (
              <li className="bg-slate-100 text-center md:text-left">
                <Link
                  to="/profile"
                  className={`bg-slate-100 block py-2 md:py-0 text-base transition duration-300 ${
                    activeLink === '/profile' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'
                  }`}
                  onClick={() => handleLinkClick('/profile')}
                >
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full border border-gray-300"
                  />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <div className="h-[10vh]"></div>
    </>
  );
};

export default Navbar;
