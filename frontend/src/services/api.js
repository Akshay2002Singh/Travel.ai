import axios from 'axios';
import { MOCK_NEARBY_PLACES, MOCK_ROADMAP, MOCK_LOCAL_GUIDE } from '../data';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
export const IS_BACKEND_ACTIVE = import.meta.env.VITE_IS_BACKEND_ACTIVE === 'true';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getNearbyPlaces = async (location) => {
  if (!IS_BACKEND_ACTIVE) {
    return {
      success: true,
      isDemo: true,
      places: MOCK_NEARBY_PLACES
    };
  }
  try {
    const response = await api.post('/nearby-places', { location });
    return response.data;
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    throw error;
  }
};

export const getTravelRoadmap = async (start, destination, budget, days) => {
  if (!IS_BACKEND_ACTIVE) {
    return {
      success: true,
      isDemo: true,
      roadmap: MOCK_ROADMAP
    };
  }
  try {
    const response = await api.post('/travel-roadmap', { start, destination, budget, days });
    return response.data;
  } catch (error) {
    console.error('Error fetching travel roadmap:', error);
    throw error;
  }
};

export const liveLikeLocal = async (location) => {
  if (!IS_BACKEND_ACTIVE) {
    return {
      success: true,
      isDemo: true,
      localGuide: MOCK_LOCAL_GUIDE
    };
  }
  try {
    const response = await api.post('/live-like-local', { location });
    return response.data;
  } catch (error) {
    console.error('Error fetching local guide:', error);
    throw error;
  }
};

export default api;
