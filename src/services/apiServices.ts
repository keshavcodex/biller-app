import axios from 'axios';
import {baseUrl} from '@env';

const getService = async (route: string) => {
  try {
    const response = await axios.get(route);
    return response?.data;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
  }
};

export const checkServer = async () => {
  return await getService(`${baseUrl}/`);
};
