/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password })
      .then((res) => {
        login(res.data.token);
        navigate('/');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-pink-300 to-yellow-200">
      <motion.div
        className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-8 md:p-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-500 mb-8 text-center drop-shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Login
        </motion.h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none bg-white/80 text-gray-800 placeholder-gray-400 shadow-sm transition"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none bg-white/80 text-gray-800 placeholder-gray-400 shadow-sm transition"
          />
          <motion.button
            type="submit"
            className="w-full cursor-pointer py-3 rounded-xl bg-gradient-to-r from-blue-500 via-pink-400 to-yellow-400 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-200"
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.05 }}
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
