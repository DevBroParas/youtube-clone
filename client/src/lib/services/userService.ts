// src/services/userService.ts
import axios from 'axios';
import { UserProfile, Subscription, VideoLike } from '@/types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const userService = {
  getProfile: async (userId: string): Promise<UserProfile> => {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  },

  updateProfile: async (data: { username: string; about: string }, avatar?: File) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('about', data.about);
    if (avatar) formData.append('avatar', avatar);

    return axios.patch(`${API_URL}/users/profile`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  subscribe: async (userId: string) => {
    return axios.post(`${API_URL}/users/${userId}/subscribe`, {}, { withCredentials: true });
  },

  unsubscribe: async (userId: string) => {
    return axios.delete(`${API_URL}/users/${userId}/unsubscribe`, { withCredentials: true });
  },

  getSubscriptions: async (): Promise<Subscription[]> => {
    const response = await axios.get(`${API_URL}/users/subscriptions`, { withCredentials: true });
    return response.data.channels;
  },

  getLikedVideos: async (): Promise<VideoLike[]> => {
    const response = await axios.get(`${API_URL}/users/liked-videos`, { withCredentials: true });
    return response.data.videos;
  }
};
