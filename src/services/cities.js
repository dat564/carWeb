import axios from 'axios';

export const getCityList = async () => {
  try {
    const { data } = await axios.get('https://vapi.vnappmob.com/api/province/');
    return data.results;
  } catch (error) {
    throw error;
  }
};
