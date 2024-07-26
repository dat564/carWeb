import { BillStatus } from '@/constants/bill';
import { convertDatetime, convertDatetimeAndFormat, formatDate, formatTime, subtractDateTimes } from '@/utils/date';
import { notification, Tag } from 'antd';
import React, { useMemo } from 'react';

const TicketItem = ({ currentTab, ticket }) => {
  console.log({ ticket });

  const [isPaid, isWaiting, isCanceled] = useMemo(() => {
    return [
      ticket.status === BillStatus.PAYMENT_SUCCESS,
      ticket.status === BillStatus.WAIT_FOT_PAY,
      ticket.status === BillStatus.CANCELED
    ];
  }, [ticket.status]);

  const enableCancelBtn = useMemo(() => {
    const currentTime = new Date().getTime();
    const departureTime = new Date(ticket.trip.departure_time).getTime();
    const isTenHoursBefore = departureTime - currentTime > 10 * 60 * 60 * 1000;
    const isTimeToDeparture = departureTime - currentTime <= 0;
    return isTenHoursBefore || isTimeToDeparture;
  }, [ticket.trip.departure_time]);

  const handleEvaluationClick = () => {
    notification.info({
      message: 'Thông báo',
      description: 'Vui lòng tải ứng dụng để thực hiện đánh giá.'
    });
  };

  return (
    <div className="w-full h-[230px] p-5 bg-white rounded-lg">
      <div className="flex flex-col w-full h-full border rounded-lg">
        <div className="relative flex-1 p-5">
          <div className="flex flex-col gap-2">
            <span className="font-medium">{formatDate(convertDatetime(ticket.trip.departure_time))}</span>
            <span className="font-medium text-[28px]">
              {formatTime(convertDatetimeAndFormat(ticket.trip.departure_time))}
            </span>
            <span>{ticket.trip.car.transport_company.name}</span>
            <div className="flex-row items-center ">
              <span>{ticket.trip.route_start}</span>
              <span>➡️</span>
              <span>{ticket.break_point.name}</span>
            </div>
          </div>
          {currentTab === 'cancel' && (
            <div className="absolute top-2 right-2">
              <Tag color="red">Đã hủy</Tag>
            </div>
          )}
        </div>
        {currentTab !== 'cancel' && (
          <div>
            {currentTab === 'past' ? (
              <div className="h-[50px] flex items-center font-medium gap-1 justify-end">
                <button
                  onClick={handleEvaluationClick}
                  className="flex items-center justify-center w-[100%] h-full text-white bg-yellow-400 rounded-lg"
                >
                  Đánh giá
                </button>
              </div>
            ) : (
              <div className="h-[50px] flex items-center font-medium gap-1 justify-around">
                {enableCancelBtn && (
                  <button className="flex items-center justify-center w-full h-full text-white bg-red-500 rounded-lg">
                    Hủy
                  </button>
                )}
                {isWaiting && (
                  <button className="flex items-center justify-center w-full h-full text-white bg-yellow-400 rounded-lg">
                    Thanh toán
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketItem;
