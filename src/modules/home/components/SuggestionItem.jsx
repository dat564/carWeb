'use client';
import { image_url } from '@/configs/common';
import { removeProvinceCityPrefix } from '@/utils/city';
import { formatCurrency } from '@/utils/money';
import Image from 'next/image';
import React, { useMemo } from 'react';

const SuggestionItem = ({ data }) => {
  console.log({ data });
  const tickets = useMemo(() => {
    return data?.tickets;
  }, [data]);
  const car = useMemo(() => {
    return data?.car;
  }, [data]);
  console.log({ tickets, car });

  const minPrice = useMemo(() => {
    return Math.min(...tickets.map((ticket) => Number(ticket.price)));
  }, [tickets]);

  return (
    <div className="w-[230px] h-[230px] rounded-md overflow-hidden bg-[#9e947c] text-white cursor-pointer">
      <div className="w-full h-[120px] overflow-hidden">
        <Image
          loader={() => `${image_url}${car?.images}`}
          src={`${image_url}${car?.images}`}
          width={230}
          height={120}
          objectFit="cover"
          alt="Ảnh minh họa xe"
        />
      </div>
      <div className="p-3">
        <h3 className="mb-2">
          {removeProvinceCityPrefix(data?.route_start)} - {removeProvinceCityPrefix(data?.route_end)}
        </h3>
        <p className="flex items-center gap-2 text-sm">
          <span>Từ {formatCurrency(minPrice)}</span>
          {/* <span className="line-through text-[#ffffff99] text-xs">300.000đ</span> */}
        </p>
      </div>
    </div>
  );
};

export default SuggestionItem;
