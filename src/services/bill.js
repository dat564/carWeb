import request from '@/configs/request';

export const getBillList = async () => {
  try {
    const response = await request.get('/bill');
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createBill = async (data) => {
  try {
    const response = await request.post('/bill', data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
