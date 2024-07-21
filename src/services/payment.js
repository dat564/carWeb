import request from '@/configs/request';

export const getPaymentUrl = async (billId) => {
  try {
    const response = await request.get(`/payment/${billId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
