'use client';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import { Button, Col, Row, Tag, Card, Spin } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { formatCurrency } from '@/utils/money';
import PaymentTripDetail from '@/modules/payment/PaymentTripDetail';
import PaymentDrawer from '@/modules/payment/PaymentDrawer';
import { useRecoilValue } from 'recoil';
import { currentTripAtom } from '@/atom/currentTrip';
import { userInfoAtom } from '@/atom';
import { useEffect, useState } from 'react';
import { createBill } from '@/services/bill';

export default function Page({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('phone');
  const [name, setName] = useState('name');
  const currentTrip = useRecoilValue(currentTripAtom);
  const userInfo = useRecoilValue(userInfoAtom);

  const handleContinue = async () => {
    setLoading(true);
    await createBill({
      customerName: name,
      customerPhone: phone,
      tripId: currentTrip.trip.id,
      totalPrices: currentTrip.totalPrices
    });
    router.push('/payment-method');
  };

  useEffect(() => {
    if (userInfo) {
      setPhone(userInfo.phone);
      setName(userInfo.name);
    }
  }, [userInfo]);

  if (!Object.keys(currentTrip.trip).length) {
    return router.back();
  }

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col items-center gap-5 pb-10 mx-auto min-h-[100vh]">
        <div className="w-[1200px]">
          <Button
            type="text"
            className="flex items-baseline"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowLeftOutlined /> Quay lại
          </Button>
        </div>
        <div className="items-start w-[1200px] flex gap-5">
          <div className="flex-1">
            <div className="w-full p-5 bg-white rounded-lg">
              <h3 className="mb-5">Thông tin liên hệ</h3>
              <Row>
                <Col span={24}>
                  <ProFormText
                    name="customerName"
                    fieldProps={{ value: name, onChange: (e) => setName(e.target.value) }}
                    placeholder={'Nhập tên'}
                    rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                  ></ProFormText>
                </Col>
                <Col span={24}>
                  <ProFormText
                    name="customerPhone"
                    fieldProps={{
                      value: phone,
                      onChange: (e) => setPhone(e.target.value)
                    }}
                    placeholder={'Nhập số điện thoại'}
                    rules={[
                      { required: true, message: 'Vui lòng nhập số điện thoại' },
                      { pattern: /^0\d{9,10}$/, message: 'Số điện thoại không hợp lệ' }
                    ]}
                  />
                </Col>
                <Col span={24}>
                  <div className="flex items-center gap-4 p-5 text-base bg-green-100 border border-green-500 rounded-lg">
                    <VerifiedUserIcon className="text-green-500" />
                    <span>Số điện thoại và email được sử dụng để gửi thông tin đơn hàng và liên hệ khi cần thiết.</span>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="w-full">
              <button
                onClick={handleContinue}
                className="flex items-center justify-center w-full p-5 py-3 mt-5 text-lg font-medium text-white bg-yellow-400 rounded-lg hover:bg-yellow-500"
              >
                Tiếp tục
              </button>
            </div>
          </div>
          <div className="w-[500px] flex flex-col gap-5">
            <div className="flex justify-between w-full p-5 text-lg font-medium bg-white rounded-lg">
              <h3>Tạm tính: </h3>
              <span>{formatCurrency(currentTrip.totalPrices)}</span>
            </div>
            <PaymentTripDetail currentTrip={currentTrip}></PaymentTripDetail>
          </div>
        </div>
      </div>
    </Spin>
  );
}
