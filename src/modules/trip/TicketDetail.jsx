'use client';

import { currentTripAtom } from '@/atom/currentTrip';
import PickPoint from '@/modules/trip/components/PickPoint';
import TripSelection from '@/modules/trip/components/TripSelection';
import { formatCurrency } from '@/utils/money';
import { Button, Steps } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

const items = [
  {
    title: 'Chỗ mong muốn'
  },
  {
    title: 'Điểm đón, trả'
  }
];

const TicketDetail = ({ tickets, trip }) => {
  const [current, setCurrent] = React.useState(0);
  const [seatSelected, setSeatSelected] = React.useState([]);
  const setCurrentTrip = useSetRecoilState(currentTripAtom);
  const [pickpoinData, setPickpointData] = React.useState({
    start_point: trip?.start_point,
    end_point: trip?.end_point
  });
  const router = useRouter();

  const sortTickets = useMemo(() => {
    return tickets.sort((a, b) => a.position_on_car - b.position_on_car);
  }, [tickets]);

  const handleSelectSeat = (index) => {
    if (seatSelected.includes(index)) {
      setSeatSelected((prev) => prev.filter((item) => item !== index));
    } else {
      setSeatSelected((prev) => [...prev, index]);
    }
  };

  const totalPrices = useMemo(() => {
    return seatSelected.reduce((total, index) => {
      return total + Number(sortTickets[index].price);
    }, 0);
  }, [seatSelected, sortTickets]);

  const handleContinue = () => {
    if (current === 1) {
      setCurrentTrip((prev) => ({
        ...prev,
        tickets: seatSelected.map((index) => sortTickets[index]),
        totalPrices,
        start_point: pickpoinData.start_point,
        end_point: pickpoinData.end_point,
        trip,
        car: trip?.car
      }));
      router.push('/payment');
      return;
    }
    if (current === 0) {
      if (seatSelected.length === 0) {
        toast.error('Vui lòng chọn ghế');
        return;
      }
    }
    setCurrent((prev) => prev + 1);
  };

  const handleReturn = () => {
    setCurrent((prev) => prev - 1);
  };

  const handleSetPickpoint = (value, key) => {
    setPickpointData((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="w-full mt-5 font-medium transition-all">
      <Steps items={items} current={current}></Steps>
      <div className="content">
        {current === 0 && <TripSelection tickets={tickets} handleSelectSeat={handleSelectSeat} seatSelected={seatSelected} />}
        {current === 1 && <PickPoint trip={trip} handleSetPickpoint={handleSetPickpoint} />}
      </div>
      <p className="font-normal text-red-500">Lưu ý: Sử dụng app đặt vé để có thể sử dụng voucher</p>
      <div className="flex justify-between w-full px-5 py-5 mt-5 border-t border-slate-400 footer">
        {current === 1 ? (
          <Button type="default" onClick={handleReturn}>
            Quay lại
          </Button>
        ) : (
          <div>Tổng số ghế: {seatSelected.length}</div>
        )}
        <div className="flex items-center gap-5">
          <span>Tổng cộng: {formatCurrency(totalPrices)}</span>
          <Button type="primary" onClick={handleContinue}>
            Tiếp tục
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;