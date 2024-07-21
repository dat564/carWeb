import request from '@/configs/request';

export const getTicketList = async () => {
  try {
    const response = await request.get('/ticket');
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
