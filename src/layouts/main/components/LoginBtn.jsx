'use client';

import { isAuthenticatedAtom, userInfoAtom } from '@/atom';
import LoginModal from '@/modules/auth/LoginModal';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const LoginBtn = () => {
  const [visible, setVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom);
  const userInfo = useRecoilValue(userInfoAtom);
  const router = useRouter();

  const items = [
    {
      label: 'Thông tin tài khoản',
      key: '1',
      icon: <UserOutlined />,
      onClick: () => router.push('/profile')
    },
    {
      label: 'Đăng xuất',
      key: '2',
      icon: <LogoutOutlined />,
      onClick: () => {
        localStorage.clear();
        setIsAuthenticated(false);
        message.success('Đăng xuất thành công');
        router.push('/');
      }
    }
  ];

  const handleClick = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      {isAuthenticated ? (
        <Dropdown menu={{ items }} trigger={['click']}>
          <Avatar size="large" icon={<UserOutlined />} src={userInfo?.img_url || null} />
        </Dropdown>
      ) : (
        <Button className="font-semibold" onClick={handleClick}>
          Đăng nhập
        </Button>
      )}
      {visible && <LoginModal visible={visible} handleCancel={handleCancel} />}
    </>
  );
};

export default LoginBtn;
