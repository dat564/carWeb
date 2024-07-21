'use client';

import { Slider } from '@/components';
import SuggestionItem from '@/modules/home/components/SuggestionItem';
import { getTripList } from '@/services/trip';
import React, { useEffect } from 'react';

const Suggestion = () => {
  const [tripList, setTripList] = React.useState([]);

  useEffect(() => {
    getTripList().then((res) => {
      const { data } = res || {};
      setTripList(data);
    });
  }, []);

  return (
    <div>
      <h2 className="mt-10 mb-4">Tuyến đường phổ biến</h2>
      <Slider>
        {tripList?.map((trip, index) => (
          <SuggestionItem data={trip} key={index} />
        ))}
      </Slider>
    </div>
  );
};

export default Suggestion;
