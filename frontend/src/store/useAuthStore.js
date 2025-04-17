import {create} from "zustand"
import axios from 'axios'
import { toast } from 'react-toastify';

const API_URL = "http://localhost:4000/api/auth"

export const useAuthStore = create((set)=>({
    user: null,
    isAuthenticated: null,
    isLoading: false,
    isChecking: true,

    signup: async (payload) =>{
        set({isLoading: true, error: null})

        try{
            const signUpResponse = await axios.post(`${API_URL}/signup`, payload)
            set({user: signUpResponse.data, isAuthenticated: true, isLoading: false})
            toast.success('Signup successful! 🎉 Welcome aboard!');
        }
        catch(error){
            set({error: error.response.data.message || "Error Signing up", isLoading: false})
            toast.error(error.response.data.message || "Error Signing up");
        }
    }
}))
