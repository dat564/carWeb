import { Button, Tag } from 'antd';
import React from 'react';

const TicketItem = () => {
  return (
    <div className="w-full h-[230px] p-5 bg-white rounded-lg">
      <div className="flex flex-col w-full h-full border rounded-lg">
        <div className="relative flex-1 p-5">
          <div className="flex flex-col gap-2">
            <span className="font-medium">T3, 09/07/2024</span>
            <span className="font-medium text-[28px]">21:03</span>
            <span>Hải Phòng travel</span>
            <span>Hà Nội - Hải Phòng</span>
          </div>
          <div className="absolute top-2 right-2">
            <Tag color="red">Đã hủy</Tag>
          </div>
        </div>
        <div className="h-[70px] flex items-center font-medium gap-1 justify-around">
          <button className="flex items-center justify-center w-full h-full text-white bg-red-500 rounded-lg">
            Hủy
          </button>
          <button className="flex items-center justify-center w-full h-full text-white bg-yellow-400 rounded-lg">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketItem;
