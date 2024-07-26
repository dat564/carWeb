'use client';

import DestinationTab from '@/modules/trip/components/DestinationTab';
import ImageTab from '@/modules/trip/components/ImageTab';
import LisenceTab from '@/modules/trip/components/LisenceTab';
import PickPoint from '@/modules/trip/components/PickPoint';
import { Tabs } from 'antd';
import React from 'react';

const TripDetail = ({ trip }) => {
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: '3',
      label: 'Điểm đón, trả',
      children: <PickPoint trip={trip} isView />
    },
    {
      key: '4',
      label: 'Chính sách',
      children: <LisenceTab />
    }
  ];
  return (
    <div className="transition-all">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default TripDetail;
