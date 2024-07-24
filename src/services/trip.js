import { TRIP_STATUS } from '@/constants/trip';
import axios from 'axios';

export const getTripList = async (params) => {
  try {
    const response = await axios('http://26.117.237.183:8123/api/trip/', {
      method: 'GET',
      params: {
        status: [TRIP_STATUS.PENDING_DEPARTURE],
        ...params
      }
    });
    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
