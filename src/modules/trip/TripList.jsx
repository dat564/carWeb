'use client';

import TripItem from '@/modules/trip/TripItem';
import { getTripList } from '@/services/trip';
import { convertDatetimeToServer } from '@/utils/date';
import { Spin } from 'antd';
import moment from 'moment';
import React, { useCallback, useEffect } from 'react';

const TripList = ({ queryData }) => {
  const [loading, setLoading] = React.useState(false);
  const [tripList, setTripList] = React.useState([]);

  const handleGetTripList = useCallback(async () => {
    setLoading(true);
    const params = {
      route_start: queryData.route_start,
      route_end: queryData.route_end,
      departure_time_min: convertDatetimeToServer(
        moment(queryData.date, 'DD/MM/YYYY').startOf('day').format('DD/MM/YYYY HH:mm:ss')
      ),
      departure_time_max: convertDatetimeToServer(
        moment(queryData.date, 'DD/MM/YYYY').endOf('day').format('DD/MM/YYYY HH:mm:ss')
      )
    };

    const res = await getTripList(params);
    setTripList(res?.data);
    setLoading(false);
  }, [queryData]);

  useEffect(() => {
    handleGetTripList();
  }, [handleGetTripList]);

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col gap-5">
        {tripList?.map((trip, index) => (
          <TripItem key={index} tripData={trip} />
        ))}
        {!tripList?.length && (
          <div className="text-xl font-medium text-center text-gray-500">Không tìm thấy chuyến xe nào</div>
        )}
      </div>
    </Spin>
  );
};

export default TripList;
