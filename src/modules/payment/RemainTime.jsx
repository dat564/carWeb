'use client';

import React from 'react';

const RemainTime = () => {
  // Bắt đầu là 10 phút
  const [time, setTime] = React.useState(600);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="w-[1200px]">
      <div className="flex justify-center p-5 text-xl text-white bg-blue-500 rounded-lg">
        <span>
          Thời gian còn lại:{' '}
          <span className="p-2 font-medium bg-red-500 rounded-lg">
            {/* Nếu mà chỉ có 1 số thì thêm số 0 vào */}
            {Math.floor(time / 60)
              .toString()
              .padStart(2, '0')}
            :{(time % 60).toString().padStart(2, '0')}
          </span>
        </span>
      </div>
    </div>
  );
};

export default RemainTime;
