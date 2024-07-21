'use client';
import Header from './components/Header';
import Footer from './components/Footer';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { isAuthenticatedAtom, userInfoAtom } from '@/atom';
import { getLocalStorage } from '@/utils/localStorage';

const MainLayout = ({ children }) => {
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedAtom);
  const setUserInfo = useSetRecoilState(userInfoAtom);

  useEffect(() => {
    const userInfo = getLocalStorage('userInfo');
    const isAuthenticated = getLocalStorage('isAuthenticated');
    setIsAuthenticated(isAuthenticated ?? false);
    setUserInfo(userInfo ?? null);
  }, [setIsAuthenticated, setUserInfo]);
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
