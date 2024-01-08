import { AxiosResponse } from 'axios';
import { User } from '@/types';
import axios, { AxiosError } from 'axios';

const url = `${process.env.NEXT_PUBLIC_API_URL}/users`;

const updateUser = async (data: any, id:string): Promise<AxiosResponse<User>> => {
  try {

    const response = await axios.patch<User>(`${url}/${id}`, data);

    if (response.status === 200) {
      return response;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export default updateUser;
