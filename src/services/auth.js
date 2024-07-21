import request from '@/configs/request';

export const login = async ({ email, phone, password }) => {
  try {
    const response = await request.post('/login', {
      email,
      password,
      phone
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const logout = async () => {
  try {
    await request.post('/logout');
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const register = async (email, password) => {
  try {
    const response = await request.post('/register', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
