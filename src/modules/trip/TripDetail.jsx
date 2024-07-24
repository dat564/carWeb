'use client';

import DestinationTab from '@/modules/trip/components/DestinationTab';
import ImageTab from '@/modules/trip/components/ImageTab';
import LisenceTab from '@/modules/trip/components/LisenceTab';
import { Tabs } from 'antd';
import React from 'react';

const items = [
  {
    key: '3',
    label: 'Điểm đón, trả',
    children: <DestinationTab />
  },
  {
    key: '4',
    label: 'Chính sách',
    children: <LisenceTab />
  }
];

const TripDetail = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div className="transition-all">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default TripDetail;
