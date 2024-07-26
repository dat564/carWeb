import { BillStatus } from '@/constants/bill';
import { convertDatetime, convertDatetimeAndFormat, formatDate, formatTime } from '@/utils/date';
import { Modal, notification, Spin, Tag } from 'antd';
import React, { useMemo, useState, useEffect, useRef } from 'react';
import ModalCancel from './modalCancel';
import { formatCurrency } from '@/utils/money';
import { updateBill } from '@/services/bill';
import { getPaymentUrl } from '@/services/payment';

const TicketItem = ({ currentTab, ticket, setRefresh }) => {
  const [isVisibleModalCancel, setIsVisibleModalCancel] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isPaid, isWaiting, isCanceled] = useMemo(() => {
    return [
      ticket.status === BillStatus.PAYMENT_SUCCESS,
      ticket.status === BillStatus.WAIT_FOT_PAY,
      ticket.status === BillStatus.CANCELED
    ];
  }, [ticket.status]);

  const enableCancelBtn = useMemo(() => {
    const currentTime = new Date().getTime();
    const departureTime = new Date(convertDatetime(ticket.trip.departure_time)).getTime();
    const isTenHoursBefore = departureTime - currentTime > 10 * 60 * 60 * 1000;
    const isTimeToDeparture = departureTime - currentTime <= 0;
    return (isTenHoursBefore || isTimeToDeparture) && !isCanceled;
  }, [isCanceled, ticket.trip.departure_time]);

  const handleEvaluationClick = () => {
    notification.info({
      message: 'Thông báo',
      description: 'Vui lòng tải ứng dụng để thực hiện đánh giá.'
    });
  };

  const handleCancel = async (type) => {
    async function onOk() {
      try {
        const data = [
          {
            id: ticket.id,
            status: BillStatus.CANCELED,
            type
          }
        ];
        const res = await updateBill(data);
        if (res.status === 'Success') {
          setRefresh(new Date().getTime());
          notification.success({
            message: 'Thông báo',
            description: 'Hủy vé thành công.'
          });
        }
      } catch (error) {}
    }

    Modal.confirm({
      title: 'Xác nhận hủy vé',
      content: 'Bạn có chắc chắn muốn hủy vé này?',
      onOk
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { data: url } = await getPaymentUrl(ticket.id);
      if (url) {
        window.open(url, '_blank');
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="w-full p-5 mb-6 bg-white rounded-lg">
        <div className="flex flex-col w-full h-full border rounded-lg">
          <div className="relative flex-1 p-5">
            <div className="flex flex-row justify-between">
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
              <div className="text-[24px] font-bold text-green-500 mt-5">
                {formatCurrency(ticket?.total_price_applied_voucher || ticket?.total_price)}
              </div>
            </div>
            {currentTab === 'cancel' && (
              <div className="absolute top-2 right-2">
                <Tag color="red">Đã hủy</Tag>
              </div>
            )}
            {currentTab === 'current' && (
              <div className="absolute top-2 right-2">
                <Tag color="orange">Chưa chạy</Tag>
              </div>
            )}
            {currentTab === 'past' && (
              <div className="absolute top-2 right-2">
                <Tag color="blue">Đã chạy</Tag>
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
                <div className="flex items-center justify-around gap-1 font-medium ">
                  {enableCancelBtn && (
                    <button
                      className="flex h-[50px] items-center justify-center w-full text-white bg-red-500 rounded-lg"
                      onClick={() => {
                        if (isPaid) {
                          setIsVisibleModalCancel(true);
                        } else {
                          handleCancel();
                        }
                      }}
                    >
                      Hủy
                    </button>
                  )}
                  {isWaiting && (
                    <button
                      className="flex items-center  justify-center w-full  h-[50px]  text-white bg-yellow-400 rounded-lg"
                      onClick={handlePayment}
                    >
                      Thanh toán
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <ModalCancel
          visible={isVisibleModalCancel}
          onClose={() => setIsVisibleModalCancel(false)}
          handleCancelBill={handleCancel}
          ticket={ticket}
        />
      </div>
    </Spin>
  );
};

export default TicketItem;
