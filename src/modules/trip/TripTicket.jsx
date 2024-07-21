'use client';

import ImageTab from '@/modules/trip/components/ImageTab';
import LisenceTab from '@/modules/trip/components/LisenceTab';
import { Tabs } from 'antd';
import React from 'react';

const items = [
  {
    key: '1',
    label: 'Chỗ mong muốn',
    children: 'Content of Tab Pane 3'
  },
  {
    key: '3',
    label: 'Điểm đón, trả',
    children: 'Content of Tab Pane 3'
  }
];

const TripTicket = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div className="transition-all">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default TripTicket;
