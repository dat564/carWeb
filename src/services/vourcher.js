import request from '@/configs/request';

export const getVoucherList = async () => {
  try {
    const response = await request.get('/voucherCenter');
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
