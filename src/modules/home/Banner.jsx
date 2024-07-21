import React from 'react';
import SearchForm from './SearchForm';
import { QuestionCircleOutlined } from '@ant-design/icons';

const Banner = () => {
  return (
    <div className="relative flex items-center justify-center bg-center bg-banner h-[500px] text-white">
      <div className="z-10 flex flex-col items-center content">
        <h1 className="mb-5 text-3xl font-semibold">BookingCar - Đồng hành cùng mọi hành trình của bạn.</h1>
        <div className="w-[1200px]">
          <SearchForm />
        </div>
      </div>
      <div className="absolute bottom-0 w-full bg-black bg-opacity-50 h-[64px] flex justify-center gap-20 items-center font-semibold">
        <div className="flex items-center gap-2">
          <QuestionCircleOutlined className="text-lg text-yellow-300" />
          <p>Chắc chắn có chỗ</p>
        </div>
        <div className="flex items-center gap-2">
          <QuestionCircleOutlined className="text-lg text-yellow-300" />
          <p>Hỗ trợ 24/7</p>
        </div>
        <div className="flex items-center gap-2">
          <QuestionCircleOutlined className="text-lg text-yellow-300" />
          <p>Nhiều ưu đãi</p>
        </div>
        <div className="flex items-center gap-2">
          <QuestionCircleOutlined className="text-lg text-yellow-300" />
          <p>Thanh toán đa dạng</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
