import request from '@/configs/request';

export const getImageByFileName = async (fileName) => {
  try {
    const response = await request.get(`/image/${fileName}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
