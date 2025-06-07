/* eslint-disable no-unused-vars */
// Importing necessary libraries and components
import React, { useState } from 'react'; // Importing React and useState hook for managing state
import axios from 'axios'; // Importing axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation after signup
import { motion } from 'framer-motion'; // Importing motion for animations

const Signup = () => {
  const navigate = useNavigate(); // Initializing navigate function for routing
  const [email, setEmail] = useState(''); // State for storing email input
  const [password, setPassword] = useState(''); // State for storing password input
  const [username, setUsername] = useState(''); // State for storing username input

  const handleSubmit = (e) => { // Function to handle form submission
    e.preventDefault(); // Preventing default form submission behavior
    // Making a POST request to the registration endpoint with user data
    axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { username, email, password })
      .then(() => navigate('/login')) // Navigating to login page on successful signup
      .catch((err) => console.error(err)); // Logging error if the request fails
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-pink-300 to-yellow-200">
      {/* Main container with gradient background and flexbox for centering */}
      <motion.div
        className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-8 md:p-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }} // Animation to fade in and move up
        transition={{ duration: 0.7, ease: 'easeOut' }} // Animation transition settings
      >
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-500 mb-8 text-center drop-shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }} // Initial animation state for heading
          animate={{ scale: 1, opacity: 1 }} // Animation to scale up and fade in
          transition={{ delay: 0.2, duration: 0.5 }} // Animation transition settings
        >
          Signup {/* Heading for the signup form */}
        </motion.h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          {/* Form for user input with a submit handler */}
          <input
            type="text"
            value={username} // Binding username state to input value
            onChange={(e) => setUsername(e.target.value)} // Updating state on input change
            placeholder="Username" // Placeholder text for the input
            required // Making this field required
            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none bg-white/80 text-gray-800 placeholder-gray-400 shadow-sm transition"
          />
          <input
            type="email"
            value={email} // Binding email state to input value
            onChange={(e) => setEmail(e.target.value)} // Updating state on input change
            placeholder="Email" // Placeholder text for the input
            required // Making this field required
            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none bg-white/80 text-gray-800 placeholder-gray-400 shadow-sm transition"
          />
          <input
            type="password"
            value={password} // Binding password state to input value
            onChange={(e) => setPassword(e.target.value)} // Updating state on input change
            placeholder="Password" // Placeholder text for the input
            required // Making this field required
            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none bg-white/80 text-gray-800 placeholder-gray-400 shadow-sm transition"
          />
          <motion.button
            type="submit" // Button type set to submit
            className="w-full py-3 cursor-pointer rounded-xl bg-gradient-to-r from-blue-500 via-pink-400 to-yellow-400 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-200"
            whileTap={{ scale: 0.97 }} // Animation on tap
            whileHover={{ scale: 1.05 }} // Animation on hover
          >
            Signup {/* Button text */}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup; // Exporting the Signup component for use in other parts of the application
