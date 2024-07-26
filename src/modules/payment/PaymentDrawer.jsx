'use client';

import { formatCurrency } from '@/utils/money';
import { Button, Card, Drawer } from 'antd';
import React from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { currentTripAtom } from '@/atom/currentTrip';
import { useRecoilValue } from 'recoil';
import { convertDateAndFormat, convertDatetime, formatDate, formatTime } from '@/utils/date';

const PaymentDrawer = ({ visible, handleClose, data }) => {
  const currentTrip = useRecoilValue(currentTripAtom);
  const { trip, tickets, totalPrices, start_point, end_point, car, break_point } = currentTrip || {};
  const [loading, setLoading] = React.useState(false);

  return (
    <Drawer
      closable
      destroyOnClose
      title={
        <div className="ml-3">
          <h3>{currentTrip?.car?.transport_company?.name}</h3>
          <p>
            <span>{formatTime(trip?.departure_time)}</span> • <span>{formatDate(trip?.departure_time)}</span>
          </p>
        </div>
      }
      width={600}
      placement="right"
      open={visible}
      loading={loading}
      onClose={handleClose}
    >
      <div className="flex flex-col gap-3 text-base">
        <div className="flex justify-between">
          <p>Tuyến</p>
          <span className="font-medium">
            {trip?.route_start} ➡️ {break_point?.name}
          </span>
        </div>
        <div className="flex justify-between">
          <p>Nhà xe</p>
          <span className="font-medium">{currentTrip?.car?.transport_company?.name}</span>
        </div>
        <div className="flex justify-between">
          <p>Chuyến</p>
          <span className="font-medium">
            <span>{formatTime(convertDateAndFormat(trip?.departure_time))}</span> •{' '}
            <span>{formatDate(convertDatetime(trip?.departure_time))}</span>
          </span>
        </div>
        <div className="flex justify-between">
          <p>Loại xe</p>
          <span className="font-medium">{car?.name}</span>
        </div>
        <div className="flex justify-between">
          <p>Số lượng</p>
          <span className="font-medium">{tickets.length} vé</span>
        </div>
        <div className="flex justify-between">
          <p>Mã ghế/ giường</p>
          <span className="font-medium">
            {tickets
              .map((ticket) => (ticket.position_on_car < 10 ? `0${ticket.position_on_car}` : ticket.position_on_car))
              .join(', ')}
          </span>
        </div>
        <div className="flex justify-between">
          <p>Tạm tính</p>
          <span className="font-medium">{formatCurrency(totalPrices)}</span>
        </div>
        <Card
          title={
            <p>
              <PersonPinIcon className="text-blue-500" /> Điểm đón
            </p>
          }
        >
          <div className="font-medium">
            {trip?.route_start} <br></br> {start_point}
            <br></br> Dự kiến đón lúc: {formatTime(convertDateAndFormat(trip.departure_time))}{' '}
            {formatDate(convertDatetime(trip.departure_time))}
          </div>
        </Card>
        <Card
          title={
            <p>
              <PlaceIcon className="text-red-500" /> Điểm trả
            </p>
          }
        >
          <div className="font-medium">
            {break_point?.name} <br></br> {end_point}
            <br></br> Dự kiến trả lúc: {formatTime(convertDateAndFormat(break_point?.scheduled_end_time))}{' '}
            {formatDate(convertDatetime(break_point?.scheduled_end_time))}
          </div>
        </Card>
      </div>
    </Drawer>
  );
};

export default PaymentDrawer;
