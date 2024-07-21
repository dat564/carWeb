import { atom } from 'recoil';

export const isAuthenticatedAtom = atom({
  key: 'isAuthenticated',
  default: false
});

export const userInfoAtom = atom({
  key: 'userInfo',
  default: {}
});
