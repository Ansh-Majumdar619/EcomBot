/* eslint-disable no-unused-vars */
import React from 'react';
import Chatbot from '../components/Chatbot';
import { motion } from 'framer-motion';

const Chat = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-pink-300 to-yellow-200 py-8 px-2">
    <motion.div
      className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col items-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-500 mb-6 text-center drop-shadow-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Chat with our Bot
      </motion.h2>
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Chatbot />
      </motion.div>
    </motion.div>
  </div>
);

export default Chat;