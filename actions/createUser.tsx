// Importe os tipos necessários
import { AxiosResponse } from 'axios';
import { User } from '@/types';
import axios, { AxiosError } from 'axios';

const url = `${process.env.NEXT_PUBLIC_API_URL}/users`;

const createUser = async (data?: any): Promise<AxiosResponse<User>> => {
  try {
    const response = await axios.post<User>(url, data);

    if (response.status === 200) {
      return response;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export default createUser;
