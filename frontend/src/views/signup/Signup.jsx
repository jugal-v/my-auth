/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Loader } from 'lucide-react';
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter';
import { useAuthStore } from '../../store/useAuthStore';

const Signup = () => {
    const navigate = useNavigate();
    const { signup, error, isLoading } = useAuthStore();
    const { register, handleSubmit, watch } = useForm({
        // resolver: yupResolver(schema),
    });

    const passValue = watch('password');

    const onSubmit = async ( formData) => {
        const payload = {
            email: formData.email,
            name: formData.name,
            password: formData.password,
        };
        console.log(payload)
        try {
            const response = await signup(payload);
            if(response){
                navigate('/verify-email');
            }
        } catch (error) {
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
                    Create Account
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                            <User className="size-5 text-green-500 " />
                        </div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            {...register('name')}
                            className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
                        />
                    </div>
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
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                            <Lock className="size-5 text-green-500 " />
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register('password')}
                            className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
                        />
                    </div>
                    {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
                    <PasswordStrengthMeter password={passValue} />
                    <motion.button
                        className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : 'Sign Up'}
                    </motion.button>
                </form>
            </div>
            <div className="px-8 py-4 bg-gray-900 bg-opacity-50 justify-center">
                <p className="text-gray-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-400 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default Signup;
