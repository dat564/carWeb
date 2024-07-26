'use client';

import { isAuthenticatedAtom, userInfoAtom } from '@/atom';
import { login } from '@/services/auth';
import { setLocalStorage } from '@/utils/localStorage';
import { validateWithAntd } from '@/utils/validate';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Modal, Spin, message } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

const LoginModal = ({ visible, handleCancel }) => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [isLoginWithPhone, setIsLoginWithPhone] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const { status, authorization, user } = await login(values);
      if (status === 'success') {
        // Set user info to recoil state
        setIsAuthenticated(true);
        setUserInfo(user);

        // Save token to local storage
        setLocalStorage('jwtToken', authorization.access_token);
        setLocalStorage('isAuthenticated', true);
        setLocalStorage('refresh_token', authorization.refresh_token);
        setLocalStorage('userInfo', user);

        message.success('Đăng nhập thành công');
        handleCancel();
      }
    } catch (error) {
      toast.error('Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      width={500}
      footer={null}
      height={400}
      className="w-full max-w-[500px] mx-auto "
    >
      <div className="mb-5 header">
        <h1 className="mb-1 text-lg font-bold text-center">Đăng nhập</h1>
      </div>
      <div className="content">
        <Spin spinning={loading}>
          <ProForm submitter={false} onFinish={handleLogin}>
            {isLoginWithPhone ? (
              <ProFormText
                name="phone"
                label="Số điện thoại"
                rules={validateWithAntd(['required', 'phone'])}
                className="p-4"
              />
            ) : (
              <ProFormText name="email" label="Email" rules={validateWithAntd(['required', 'email'])} className="p-4" />
            )}
            <ProFormText.Password
              name="password"
              label="Mật khẩu"
              rules={validateWithAntd(['required'])}
              className="p-4"
            />
            <Button className="w-full h-[50px]" htmlType="submit" type="primary">
              Đăng nhập
            </Button>
            <div className="flex items-center justify-center" onClick={() => setIsLoginWithPhone((prev) => !prev)}>
              <Button type="link">Đăng nhập bằng {isLoginWithPhone ? 'email' : 'số điện thoại'}</Button>
            </div>
          </ProForm>
          <div className="relative w-full my-2 text-center">
            <div className="absolute w-[200px] h-[1px] z-[1] top-1/2 -translate-y-1/2 bg-[#b4abab]"></div>
            <span className="">Hoặc</span>
            <div className="absolute w-[200px] right-0 h-[1px] z-[1] top-1/2 -translate-y-1/2 bg-[#b4abab]"></div>
          </div>
          <Button className="w-full h-[50px]">Tiếp tục với google</Button>
          <div className="flex items-center gap-2 mt-4">
            <p>Bạn chưa có tài khoản? </p>
            <Link href="/" className="text-blue-500">
              Đăng ký
            </Link>
          </div>
        </Spin>
      </div>
    </Modal>
  );
};

export default LoginModal;
