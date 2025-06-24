import { create } from "zustand";
import axios from "axios";
import { Platform } from "react-native"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URI = "http://172.20.10.3:5000/api/auth";
axios.defaults.withCredentials = true;

const storage = {
  async setItem(key, value) {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  },
  async getItem(key) {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      return await AsyncStorage.getItem(key);
    }
  },
  async removeItem(key) {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await AsyncStorage.removeItem(key);
    }
  },
};

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
      const response = await axios.post(`${API_URI}/login`, { email, password });
      const { token, user } = response.data;

      // Usa o wrapper storage para salvar o token
      await storage.setItem('token', token);
      console.log("Token Salvo ", token);
      set({ user, isLoading: false });
    } catch (error) {
      console.error("Erro no login:", error.response?.data || error);
      const errorMessage = error.response?.data?.message || "Erro ao fazer login";
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);  
    }
  },

  logout: async () => {
    // Remove token usando wrapper
    await storage.removeItem('token');
    set({ user: null, error: null, isLoading: false });
  },

  userUpdate: async (name, lastname, email, phone) => {
    set({ isLoading: true, error: null });

    try {
      // Busca token com wrapper
      const token = await storage.getItem('token');

      const response = await axios.put(`${API_URI}/profile-change`, 
        { name, lastname, email, phone }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      set({ user: response.data.user, error: null, isLoading: false });
    } catch (error) {
      console.error("Erro ao atualizar dados do perfil: ", error.response?.data || error);
      const errorMessage = error.response?.data?.message || "Erro ao atualizar dados do perfil";
      set({ error: errorMessage, isLoading: false });
    }
  },

  viewPerfil: async () => {
    set({ isLoading: true, error: null });

    try {
      const token = await storage.getItem('token');
      console.log("Token Recuperado: ", token);

      const response = await axios.get(`${API_URI}/viewProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      set({
        user: response.data, 
        isLoading: false,
        error: null,
      });

    } catch (error) {
      console.error("Erro ao buscar perfil:", error.response?.data || error);

      const errorMessage =
        error.response?.data?.message || "Erro ao buscar perfil do usuário";

      set({ error: errorMessage, isLoading: false });
    }
  },

  uploadProfilePhoto: async (imageUri) => {
  try {
    const token = await storage.getItem('token');

    const formData = new FormData();
    formData.append('photo', {
      uri: imageUri,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });

    const response = await axios.post(`${API_URI}/profile/photo`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Foto enviada com sucesso:', response.data);
    return response.data.url;

  } catch (error) {
    console.error("Erro ao enviar a foto:", error.response?.data || error);
    throw new Error(error.response?.data?.message || "Erro ao enviar a foto");
  }
  }
}));