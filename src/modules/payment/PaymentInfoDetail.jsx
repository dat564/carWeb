import { currentTripAtom } from '@/atom/currentTrip';
import LocationIcon from '@/components/icons/LocationIcon';
import { Card } from 'antd';
import Image from 'next/image';
import React from 'react';
import { useRecoilValue } from 'recoil';
import DirectionsBusFilledOutlinedIcon from '@mui/icons-material/DirectionsBusFilledOutlined';
import { formatDate, getTimeFromDatetime, subtractDateTimes } from '@/utils/date';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

const PaymentInfoDetail = () => {
  const tripData = useRecoilValue(currentTripAtom);
  return (
    <div className="w-full p-5 bg-white rounded-lg">
      <h3 className="mb-5 text-lg">Thông tin liên hệ</h3>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <span>Hành khách</span>
          <span className="font-medium">dat hoang</span>
        </div>
        <div className="flex justify-between">
          <span>Số điện thoại</span>
          <span className="font-medium">09823288283</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoDetail;
