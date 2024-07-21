'use client';

import React from 'react';
import { RecoilRoot } from 'recoil';

const RecoilRootLayout = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilRootLayout;
