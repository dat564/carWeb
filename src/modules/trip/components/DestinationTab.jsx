import { Card } from 'antd';
import React from 'react';

const DestinationTab = () => {
  return (
    <div className="flex justify-center gap-10 mt-5 mb-5 text-lg">
      <Card className="flex-1" title="Điểm đón">
        <ul className="flex flex-col gap-5">
          <li className="flex items-baseline gap-4 text-lg font-medium">
            <div>
              <span>18:00</span> • Hà Nội
              <p className="text-base font-normal">
                Sân Bay Nội Bài ( Sảnh E Ga Nội Địa T1), Thị trấn Sóc Sơn, Sóc Sơn, Hà Nội
              </p>
            </div>
          </li>
        </ul>
      </Card>
      <div className="w-[1px] h-[400px] bg-black"></div>
      <Card className="flex-1" title="Điểm trả">
        <ul className="flex flex-col gap-5">
          <li className="flex items-baseline gap-4 text-lg font-medium">
            <div>
              <span>18:00</span> • Hà Nội
              <p className="text-base font-normal">
                Sân Bay Nội Bài ( Sảnh E Ga Nội Địa T1), Thị trấn Sóc Sơn, Sóc Sơn, Hà Nội
              </p>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default DestinationTab;
