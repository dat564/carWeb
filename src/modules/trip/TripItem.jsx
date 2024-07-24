'use client';

import LocationIcon from '@/components/icons/LocationIcon';
import { image_url } from '@/configs/common';
import TicketDetail from '@/modules/trip/TicketDetail';
import TripDetail from '@/modules/trip/TripDetail';
import TripTicket from '@/modules/trip/TripTicket';
import { convertDatetime, getTimeFromDatetime, subtractDateTimes } from '@/utils/date';
import { formatCurrency } from '@/utils/money';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Popover, Tag } from 'antd';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';

const content = (
  <div className="w-[500px]">
    <p>
      Thông báo về việc vận hành dòng xe Limousine 27 - 28 chỗ VIP với nhiều tiện ích nổi bật, một số chuyến xe trong
      ngày sẽ được thay đổi từ dòng xe limousine 9 - 11 chỗ thành limousine 27 - 28 chỗ để hành khách có thể trải nghiệm
      và đánh giá. Chính sách đón trả tận nơi vẫn không thay đổi, với các điểm nằm ngoài phạm vi đón/trả miễn phí sẽ phụ
      thu từ 20,000 VND đến 50,000 VND. Nhân viên tổng đài sẽ thông báo với quý khách các thay đổi trước chuyến đi. Xin
      cảm ơn.
    </p>
  </div>
);

const TripItem = ({ tripData }) => {
  const [openDetail, setOpenDetail] = useState(false);
  const [openTicketDetail, setOpenTicketDetail] = useState(false);
  const car = useMemo(() => tripData?.car, [tripData?.car]);
  const transportCompany = useMemo(() => car?.transport_company, [car?.transport_company]);
  const tickets = useMemo(() => tripData?.tickets, [tripData?.tickets]);

  const emptySeats = useMemo(() => {
    if (!tickets) return 0;
    return tickets.filter((ticket) => ticket.status === 0).length;
  }, [tickets]);

  return (
    <div className="w-full bg-white rounded-2xl min-h-[200px] p-7 hover:shadow-xl transition-all">
      <div className="mb-5">
        <Tag color="processing">Thông báo</Tag>
        <Popover content={content} placement="top" trigger="click">
          <span className="text-blue-500 underline cursor-pointer">CHÍNH SÁCH NHÀ XE</span>
        </Popover>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-5">
          <div>
            <Image
              loader={() => `${image_url}${car?.images}`}
              src={`${image_url}${car?.images}`}
              width={200}
              height={200}
              objectFit="cover"
              alt="Ảnh minh họa xe"
            />
          </div>
          <div>
            <div className="flex items-center text-[#484848] gap-1">
              <h2 className="text-base font-semibold">{transportCompany?.name}</h2>
              <Tag color="processing">⭐4.5 (607)</Tag>
            </div>
            <div className="text-[14px] font-normal my-2">
              <p className="">{car?.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <LocationIcon />
              <div className="flex flex-col gap-2">
                <p>
                  <span className="text-lg font-bold">
                    {getTimeFromDatetime(convertDatetime(tripData?.departure_time))} •{' '}
                  </span>
                  <span>{tripData?.route_start}</span>
                </p>
                <p className="text-[#707070] text-[14px]">
                  {subtractDateTimes(
                    convertDatetime(tripData?.departure_time),
                    convertDatetime(tripData?.scheduled_end_time)
                  )}
                </p>
                <p>
                  <span className="text-lg font-bold">
                    {getTimeFromDatetime(convertDatetime(tripData?.scheduled_end_time))} •{' '}
                  </span>
                  <span>{tripData?.route_end}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <div className="flex flex-col items-end gap-2">
            <p className="text-xl font-semibold text-blue-500">Từ {formatCurrency(tickets?.[0]?.price)}</p>
            {/* <Tag color="cyan">Giảm 50%</Tag> */}
            <span>Còn {emptySeats} chỗ trống</span>
          </div>
          <div className="flex text-lg">
            <Button
              iconPosition="end"
              type="link"
              icon={openDetail ? <DownOutlined /> : <UpOutlined />}
              className="text-base transition-all"
              onClick={() => {
                setOpenDetail((prev) => !prev);
                setOpenTicketDetail(false);
              }}
            >
              Thông tin chi tiết
            </Button>
            <Button
              onClick={() => {
                setOpenTicketDetail((prev) => !prev);
                setOpenDetail(false);
              }}
              className="flex items-center justify-center px-5 py-3 text-base font-semibold text-white bg-yellow-500 hover:!bg-yellow-600 border-0 hover:!text-white"
            >
              Chọn chuyến
            </Button>
          </div>
        </div>
      </div>
      {openDetail && <TripDetail />}
      {openTicketDetail && <TicketDetail tickets={tickets} trip={tripData} />}
    </div>
  );
};

export default TripItem;
