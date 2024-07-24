'use client';

import { Breadcrumb, Button, Form } from 'antd';
import { useSearchParams } from 'next/navigation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ProForm, ProFormDatePicker, ProFormText } from '@ant-design/pro-components';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Link from 'next/link';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '@/atom';
import { useEffect } from 'react';

export default function Page({ params }) {
  const searchParams = useSearchParams();
  const queryData = Object.fromEntries(searchParams.entries());
  const userInfo = useRecoilValue(userInfoAtom);
  const [form] = Form.useForm();

  useEffect(() => {
    if (userInfo) {
      form.setFieldsValue(userInfo);
    }
  }, [form, userInfo]);

  return (
    <div className="flex flex-col items-center gap-5 pb-10 mx-auto min-h-[100vh]">
      <div className="w-[1200px]">
        <Breadcrumb
          items={[
            {
              title: <Link href={'/'}>Trang chủ</Link>
            },
            {
              title: 'Thông tin tài khoản'
            }
          ]}
        />
      </div>
      <div className="items-start w-[1200px] flex gap-5">
        <div className="w-[300px] bg-white rounded-lg flex flex-col gap-3 p-3">
          <Link
            href={'/profile'}
            className="flex items-center p-3 text-blue-500 transition-all cursor-pointer hover:bg-gray-200 gap-x-2 hover:rounded-lg"
          >
            <AccountCircleIcon />
            <span>Thông tin tài khoản</span>
          </Link>
          <Link
            href={'/my-ticket'}
            className="flex items-center p-3 transition-all cursor-pointer hover:bg-gray-200 gap-x-2 hover:rounded-lg"
          >
            <ConfirmationNumberIcon />
            <span>Đơn hàng của tôi</span>
          </Link>
          <Link
            href={'/logout'}
            className="flex items-center p-3 transition-all cursor-pointer hover:bg-gray-200 gap-x-2 hover:rounded-lg"
          >
            <LogoutIcon />
            <span>Đăng xuất</span>
          </Link>
        </div>
        <div className="flex-1 p-5 bg-white rounded-lg">
          <h3 className="mb-5">Thông tin tài khoản</h3>
          <ProForm submitter={false} form={form}>
            <ProFormText
              label="Họ và tên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập họ và tên'
                }
              ]}
              name="name"
            ></ProFormText>
            <ProFormText label="Số điện thoại" name="phone" disabled></ProFormText>
            <ProFormText label="Email" name="email" disabled></ProFormText>
            <Button className="flex items-center justify-center w-full py-5 text-lg font-medium text-white bg-blue-500">
              Lưu
            </Button>
          </ProForm>
        </div>
      </div>
    </div>
  );
}
