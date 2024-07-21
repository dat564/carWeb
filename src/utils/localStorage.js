export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage?.getItem(key) ?? 'null');
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};
