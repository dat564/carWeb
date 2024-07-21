import request from '@/configs/request';

export const getTripList = async (params) => {
  try {
    const response = await request('/trip/', {
      method: 'GET',
      params
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
