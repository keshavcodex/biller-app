import axios from 'axios';
import { baseUrl } from '@env';

export const addConsumer = async (body: any) => {
  try {
    return await axios.post(`${baseUrl}/addConsumer`, body);
  } catch (error) {
    console.log(error);
  }
};