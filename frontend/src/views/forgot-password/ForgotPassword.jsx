/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/useAuthStore';
import { Mail, ArrowLeft, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const { isLoading, error, forgotPassword } = useAuthStore();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { register, handleSubmit, watch } = useForm({});

    const email = watch('email');

    const onSubmit = async (formData) => {
      await forgotPassword(formData.email);
      setIsSubmitted(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
        >
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Forgot Password
                </h2>

                {!isSubmitted ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className="text-gray-300 mb-6 text-center">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                                <Mail className="size-5 text-green-500 " />
                            </div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                {...register('email')}
                                className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                            type="submit"
                        >
                            {isLoading ? <Loader className="size-6 animate-spin mx-auto" /> : 'Send Reset Link'}
                        </motion.button>
                    </form>
                ) : (
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                            <Mail className="h-8 w-8 text-white" />
                        </motion.div>
                        <p className="text-gray-300 mb-6">
                            If an account exists for {email}, you will receive a password reset link shortly.
                        </p>
                    </div>
                )}
            </div>

            <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
                <Link to={'/login'} className="text-sm text-green-400 hover:underline flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
                </Link>
            </div>
        </motion.div>
    );
};

export default ForgotPassword;
