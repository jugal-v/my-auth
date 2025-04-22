import {create} from "zustand"
import axios from 'axios'
import { toast } from 'react-toastify';

const API_URL = "http://localhost:4000/api/auth"

axios.defaults.withCredentials = true

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: null,
    isLoading: false,
    isChecking: true,

    signup: async (payload) => {
        set({ isLoading: true, error: null });

        try {
            const signUpResponse = await axios.post(`${API_URL}/signup`, payload);
            set({ user: signUpResponse.data.user, isAuthenticated: true, isLoading: false });
            toast.success('Signup successful! 🎉 Welcome aboard!');
        } catch (error) {
            set({ error: error.response.data.message || 'Error Signing up', isLoading: false });
            toast.error(error.response.data.message || 'Error Signing up');
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            toast.success('Email verified successfully! 🎉 Welcome aboard!');
        } catch (error) {
            set({ error: error.response.data.message || 'Error verifying email', isLoading: false });
            toast.error(error.response.data.message || 'Error verifying email');
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
            console.log(error)
        }
    },

    login: async (payload) => {
        set({isLoading: true, error: null})

        try{
            const loginResponse = await await axios.post(`${API_URL}/login`, payload);
            set({ user: loginResponse.data.user, isAuthenticated: true, isLoading: false });
            toast.success('Logged in successfully! 🎉 Welcome aboard!');
        }
        catch(error){
            set({ error: error.response.data.message || 'Error Logging in', isLoading: false });
            toast.error(error.response.data.message || 'Error Logging in');
        }
    },

    logout: async () => {
        set({isLoading: true, error: null})

        try{
            await axios.post(`${API_URL}/logout`);
            set({user: null, isLoading: false, isAuthenticated: false})
            toast.success("Logged out Successfully")
        }
        catch(error){
            console.log(error)
            set({error: "Error Logging Out"})
            toast.error("Error Logging Out")
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });

        try {
            await axios.post(`${API_URL}/forgot-password`, { email });
            set({ isLoading: false });
            toast.success('Password reset email sent successfully');
        } catch (error) {
            set({ error: error.response.data.message || 'Error Sending Password Reset Email', isLoading: false });
            toast.error(error.response.data.message || 'Error Sending Password Reset Email');
        }
    },

    resetPassword: async (token , password) => {
        set({ isLoading: true, error: null });

        try {
            await axios.post(`${API_URL}/reset-password/${token}`, { password });
            set({ isLoading: false });
            toast.success('Password reset successfully');
        } catch (error) {
            set({ error: error.response.data.message || 'Error Resetting Password', isLoading: false });
            toast.error(error.response.data.message || 'Error Resetting Password');
        }
    }

}));
