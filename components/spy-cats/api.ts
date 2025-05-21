import axios from 'axios';
import { SpyCat, SpyCatCreateInput, SpyCatEditInput } from './schemas';

const API_URL = 'http://localhost:8000'; // Update this with your backend URL

export const spyCatsApi = {
  getAll: async (): Promise<SpyCat[]> => {
    const response = await axios.get(`${API_URL}/cats/`);
    return response.data;
  },

  create: async (data: SpyCatCreateInput): Promise<SpyCat> => {
    const response = await axios.post(`${API_URL}/cats/`, data);
    return response.data;
  },

  update: async (id: string, data: SpyCatEditInput): Promise<SpyCat> => {
    const response = await axios.patch(`${API_URL}/cats/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/cats/${id}`);
  },
};
