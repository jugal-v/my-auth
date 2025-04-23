/* eslint-disable no-unused-vars */
import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, watch } = useForm({});

    const { resetPassword, error, isLoading } = useAuthStore();

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    const onSubmit = async (formData) => {
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try{
            await resetPassword(token, formData.password);
            if (!error) {
                navigate('/login');
            }
        }
        catch(error){
            console.log(error);
        }
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
                    Reset Password
                </h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                            <Lock className="size-5 text-green-500 " />
                        </div>
                        <input
                            type="password"
                            placeholder="New Password"
                            {...register('password')}
                            className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
                        />
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                            <Lock className="size-5 text-green-500 " />
                        </div>
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            {...register('confirmPassword')}
                            className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Resetting...' : 'Set New Password'}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
};

export default ResetPassword;
