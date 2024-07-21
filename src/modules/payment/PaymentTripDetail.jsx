"use client";

import { currentTripAtom } from '@/atom/currentTrip';
import LocationIcon from '@/components/icons/LocationIcon';
import { Card } from 'antd';
import Image from 'next/image';
import React from 'react';
import { useRecoilValue } from 'recoil';
import DirectionsBusFilledOutlinedIcon from '@mui/icons-material/DirectionsBusFilledOutlined';
import { formatDate, formatTime, getTimeFromDatetime, subtractDateTimes } from '@/utils/date';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PaymentDrawer from '@/modules/payment/PaymentDrawer';
import { image_url } from '@/configs/common';

const PaymentTripDetail = () => {
  const currentTrip = useRecoilValue(currentTripAtom);
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="w-full p-5 bg-white rounded-lg">
      <h3 className="mb-5">Thông tin chuyến đi</h3>
      <Card
        size="small"
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DirectionsBusFilledOutlinedIcon className="text-blue-500" />
              <span>{formatDate(new Date())}</span>
              <div className="flex items-center">
                <GroupOutlinedIcon className="text-gray-500" />
                <span>{currentTrip.tickets.length}</span>
              </div>
            </div>
            <div>
              <span
                className="font-medium text-blue-500 underline cursor-pointer hover:text-blue-500 hover:underline"
                onClick={() => setVisible(true)}
              >
                Chi tiết
              </span>
            </div>
          </div>
        }
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3 p-3 border-b border-gray-300">
            <div>
              <Image
                width={50}
                height={50}
                src={`${image_url}${currentTrip.car.images}`}
                loader={() => `${image_url}${currentTrip.car.images}`}
                alt="Picture of the author"
              ></Image>
            </div>
            <div>
              <h4 className="text-base font-medium">{currentTrip?.car?.transport_company?.name}</h4>
              <span>{currentTrip.car.name}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4 font-medium">
              <div className="flex flex-col gap-8 text-lg">
                <span>{formatTime(currentTrip.trip.departure_time)}</span>
                <span>{formatTime(currentTrip.trip.scheduled_end_time)}</span>
              </div>
              <LocationIcon />
              <div className="flex flex-col gap-4 text-base">
                <p className="flex flex-col">
                  <span>{currentTrip.trip.route_start}</span>
                  <span className="text-xs font-normal">{currentTrip.start_point}</span>
                </p>
                <p className="flex flex-col">
                  <span>{currentTrip.trip.route_end}</span>
                  <span className="text-xs font-normal">{currentTrip.end_point}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      {visible && <PaymentDrawer visible={visible} handleClose={() => setVisible(false)} />}
    </div>
  );
};

export default PaymentTripDetail;
