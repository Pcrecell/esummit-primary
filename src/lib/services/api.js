import {auth} from '@/lib/utils/firebase/firebase';
import { signOut } from 'firebase/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
      

    return response.json();
  },

  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  verifyToken: async () => {
    const response = await fetch(`${API_URL}/users/`, {
      method: 'GET',
      credentials: 'include', 
    });
    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    signOut(auth);
    return { success: true };
  },
};

export const userAPI = {
  checkAdmin: async () => {
    const response = await fetch(`${API_URL}/users/check-admin`, {
      headers: getAuthHeader(),
    });
    return response.json();
  },

  updateUserData: async (userId, data) => {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // getUserData: async () => {
  //   const response = await fetch(`${API_URL}/users/me`, {
  //     headers: getAuthHeader(),
  //   });
  //   return response.json();
  // },
  //   verifySession: async () => {
  //   const response = await fetch(`${API_URL}/users/me`, {
  //     headers: getAuthHeader(),
  //   });
  //   return response.json();
  // },

  getUserByQR: async (uid) => {
    const response = await fetch(`${API_URL}/users/qr/${uid}`, {
      headers: getAuthHeader(),
    });
    return response.json();
  },

  updateUserStatus: async (uid, statusData) => {
    const response = await fetch(`${API_URL}/users/${uid}/status`, {
      method: 'PATCH',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statusData),
    });
    return response.json();
  },
}; 