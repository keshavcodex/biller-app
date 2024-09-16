import axios from 'axios';
import { baseUrl } from '@env';

export const getConsumer = async (body: any) => {
  try {
    const response =  await axios.post(`${baseUrl}/getConsumer`, body);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const addConsumer = async (body: any) => {
  try {
    return await axios.post(`${baseUrl}/addConsumer`, body);
  } catch (error) {
    console.log(error);
  }
};