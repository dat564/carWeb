'use client';

import { Logo } from '@/components';
import LoginBtn from '@/layouts/main/components/LoginBtn';
import LoginModal from '@/modules/auth/LoginModal';
import { PhoneFilled } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { isAuthenticatedAtom } from '@/atom';

const Header = () => {
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  return (
    <div className="bg-[#2472e5] text-white min-h-[72px] flex items-center">
      <div className="flex items-center justify-between w-full px-10 mx-auto">
        <div className="left">
          <Logo className="text-4xl" />
        </div>
        <div className="flex items-center gap-5">
          {isAuthenticated && (
            <Link href="/my-ticket" className="text-sm transition-all hover:underline">
              Quản lý đơn của tôi
            </Link>
          )}
          <Button className="flex items-center font-semibold">
            Hotline 24/7 <PhoneFilled />
          </Button>
          <LoginBtn />
        </div>
      </div>
      <LoginModal />
    </div>
  );
};

export default Header;
