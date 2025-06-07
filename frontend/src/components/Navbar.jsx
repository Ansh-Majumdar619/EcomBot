/*
  Navbar.jsx
  -------------
  This component renders the navigation bar for the application. It adapts to authentication state and screen size, showing different links and a hamburger menu for mobile. Uses Framer Motion for animations and React Context for authentication state.
*/
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/react.svg';

// Define navigation links and their visibility based on auth state
const navLinks = [
  { to: '/', label: 'Home', auth: 'both' },      // Always visible
  { to: '/chat', label: 'Chat', auth: 'auth' }, // Only for authenticated users
  { to: '/login', label: 'Login', auth: 'guest' }, // Only for guests
  { to: '/signup', label: 'Signup', auth: 'guest' }, // Only for guests
];

// Navbar component definition
const Navbar = () => {
  // Get token (auth state) and logout function from context
  const { token, logout } = useContext(AuthContext);
  // State to control mobile menu open/close
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle mobile menu open/close
  const handleMenuToggle = () => setMenuOpen((prev) => !prev);
  // Close mobile menu when a link is clicked
  const handleLinkClick = () => setMenuOpen(false);

  return (
    // Animated nav bar container
    <motion.nav
      initial={{ y: -60, opacity: 0 }} // Start hidden above
      animate={{ y: 0, opacity: 1 }}   // Animate into view
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full bg-white/60 backdrop-blur-md shadow-lg px-4 md:px-10 py-2 flex items-center justify-between"
    >
      {/* Logo and app name, always visible, links to home */}
      <Link to="/" className="flex items-center gap-2" onClick={handleLinkClick}>
        <img src={Logo} alt="Logo" className="w-9 h-9 drop-shadow-md" />
        <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent select-none hidden sm:inline">EcomBot</span>
      </Link>
      {/* Desktop navigation links (hidden on mobile) */}
      <div className="hidden md:flex items-center gap-2 lg:gap-4">
        <AnimatePresence>
          {/* Map over navLinks and render those allowed for current auth state */}
          {navLinks.map(
            (link) =>
              ((link.auth === 'both') || (link.auth === 'auth' && token) || (link.auth === 'guest' && !token)) &&
              (
                <motion.div
                  key={link.to}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  className=""
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Navigation link */}
                  <Link
                    to={link.to}
                    onClick={handleLinkClick}
                    className="px-4 py-2 rounded-xl font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:via-pink-400 hover:to-yellow-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
          )}
          {/* Logout button for authenticated users */}
          {token && (
            <motion.button
              key="logout"
              onClick={() => { logout(); handleLinkClick(); }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              className="ml-2 px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-blue-500 via-pink-400 to-yellow-400 text-white shadow hover:shadow-xl transition-all duration-200"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              Logout
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      {/* Hamburger menu button for mobile (hidden on desktop) */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-white/40 transition"
        onClick={handleMenuToggle}
        aria-label="Toggle menu"
      >
        {/* Hamburger icon: 3 lines, animated to X when open */}
        <span className={`block w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-700 rounded my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>
      {/* Mobile menu, slides down when open */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-md shadow-lg flex flex-col items-center py-4 gap-2 md:hidden"
          >
            {/* Map over navLinks and render those allowed for current auth state */}
            {navLinks.map(
              (link) =>
                ((link.auth === 'both') || (link.auth === 'auth' && token) || (link.auth === 'guest' && !token)) &&
                (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={handleLinkClick}
                    className="w-11/12 text-center px-4 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:via-pink-400 hover:to-yellow-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                )
            )}
            {/* Logout button for authenticated users (mobile) */}
            {token && (
              <button
                onClick={() => { logout(); handleLinkClick(); }}
                className="w-11/12 hover:cursor-pointer text-center px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 via-pink-400 to-yellow-400 text-white shadow hover:shadow-xl transition-all duration-200"
              >
                Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Export Navbar as default
export default Navbar;
