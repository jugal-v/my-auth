/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const Signup = () => {

  const {
      register,
      handleSubmit,
  } = useForm({
      // resolver: yupResolver(schema),
  });

  return (
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
          <div className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                  Create Account
              </h2>
          </div>
      </motion.div>
  );
}

export default Signup