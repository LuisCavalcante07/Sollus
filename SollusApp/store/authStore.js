import { create } from "zustand";
import axios from "axios";

const API_URI = "http://192.168.1.20:5000/api/auth";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async (name, lastname, phone, email, password, confirmpassword) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URI}/signup`, {
                name, 
                lastname,
                phone,
                email,
                password,
                confirmpassword,
            });
            set({ user: response.data.user, isLoading: false });
        } catch (error) {
            console.error("Erro no cadastro:", error.response?.data || error);
            const errorMessage = error.response?.data?.message || "Erro ao se cadastrar";
            set({ error: errorMessage, isLoading: false });
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
            const reponse = await axios.post(`${API_URI}/login`, {email, password});
            set({
                user: reponse.data.user,
                error: null,
                isLoading: false,
            });
        } catch (error) {
            console.error("Erro no cadastro:", error.response?.data || error);
            const errorMessage = error.response?.data?.message || "Erro ao se cadastrar";
            set({ error: errorMessage, isLoading: false });
            throw new error(errorMessage);
        }
    }
}));