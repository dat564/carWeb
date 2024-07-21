'use client';

import TripItem from '@/modules/trip/TripItem';
import { getTripList } from '@/services/trip';
import { Spin } from 'antd';
import React, { useEffect } from 'react';

const TripList = ({ queryData }) => {
  const [loading, setLoading] = React.useState(false);
  const [tripList, setTripList] = React.useState([]);

  const handleGetTripList = async () => {
    // Fetch trip list
    setLoading(true);
    const params = {
      // route_start: queryData.startPoint,
      // route_end: queryData.endPoint
      // departure_time: queryData.selectedDate
    };
    const { data } = await getTripList(params);
    setTripList(data);
    setLoading(false);
  };

  useEffect(() => {
    handleGetTripList();
  }, []);

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col gap-5">
        {tripList.map((trip, index) => (
          <TripItem key={index} tripData={trip} />
        ))}
      </div>
    </Spin>
  );
};

export default TripList;
