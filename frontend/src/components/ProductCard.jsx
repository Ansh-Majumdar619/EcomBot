/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => (
  <motion.div
    className="bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-start gap-3 hover:shadow-2xl transition-shadow duration-300 cursor-pointer hover:scale-[1.03] focus:scale-[1.03] outline-none min-h-[220px]"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    tabIndex={0}
  >
    <h3 className="text-xl font-bold text-gray-800 mb-1 truncate w-full" title={product.name}>{product.name}</h3>
    <p className="text-gray-600 text-sm line-clamp-2 mb-2">{product.description}</p>
    <div className="flex items-center justify-between w-full mt-auto">
      <span className="text-lg font-semibold text-pink-500">₹{product.price}</span>
      <span className={`text-xs font-medium px-2 py-1 rounded-full ml-2 ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}</span>
    </div>
  </motion.div>
);

export default ProductCard;
