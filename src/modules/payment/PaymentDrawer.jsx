"use client";

import { formatCurrency } from "@/utils/money";
import { Button, Card, Drawer } from "antd";
import React from "react";
import PlaceIcon from "@mui/icons-material/Place";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { currentTripAtom } from "@/atom/currentTrip";
import { useRecoilValue } from "recoil";
import {
    convertDateAndFormat,
    convertDatetime,
    formatDate,
    formatTime,
} from "@/utils/date";

const PaymentDrawer = ({ visible, handleClose, data }) => {
    const currentTrip = useRecoilValue(currentTripAtom);
    const {
        trip,
        tickets,
        totalPrices,
        start_point,
        end_point,
        car,
        break_point,
    } = currentTrip || {};
    const [loading, setLoading] = React.useState(false);

    return (
        <Drawer
            closable
            destroyOnClose
            title={
                <div className='ml-3'>
                    <h3>
                        {/* { currentTrip?.car?.transport_company?.name } */}
                        Nhà ga ABC
                    </h3>
                    <p>
                        <span>
                            {/* { formatTime(trip?.departure_time) } */}
                            08:00
                        </span>{" "}
                        •{" "}
                        <span>
                            {/* { formatDate(trip?.departure_time) } */}
                            22/12/2021
                        </span>
                    </p>
                </div>
            }
            width={600}
            placement='right'
            open={visible}
            // loading={loading}
            onClose={handleClose}
        >
            <div className='flex flex-col gap-3 text-base'>
                <div className='flex justify-between'>
                    <p>Tuyến</p>
                    <span className='font-medium'>
                        {/* { trip?.route_start } */}
                        Hà Nội ➡️
                        {/* { break_point?.name } */}
                        Hồ Chí Minh
                    </span>
                </div>
                <div className='flex justify-between'>
                    <p>Nhà ga</p>
                    <span className='font-medium'>
                        {/* {currentTrip?.car?.transport_company?.name} */}
                        Nhà ga ABC
                    </span>
                </div>
                <div className='flex justify-between'>
                    <p>Chuyến</p>
                    <span className='font-medium'>
                        <span>
                            {/* {formatTime(
                                convertDateAndFormat(trip?.departure_time)
                            )} */}
                            08:00
                        </span>{" "}
                        •{" "}
                        <span>
                            {/* {formatDate(convertDatetime(trip?.departure_time))} */}
                            22/12/2021
                        </span>
                    </span>
                </div>
                <div className='flex justify-between'>
                    <p>Loại ga</p>
                    <span className='font-medium'>
                        {/* { car?.name } */}
                        Mec
                    </span>
                </div>
                <div className='flex justify-between'>
                    <p>Số lượng</p>
                    <span className='font-medium'>
                        {/* { tickets.length } */}1 vé
                    </span>
                </div>
                <div className='flex justify-between'>
                    <p>Mã ghế/ giường</p>
                    <span className='font-medium'>
                        {/* {tickets
                            .map((ticket) =>
                                ticket.position_on_car < 10
                                    ? `0${ticket.position_on_car}`
                                    : ticket.position_on_car
                            )
                            .join(", ")} */}
                        1123345345
                    </span>
                </div>
                <div className='flex justify-between'>
                    <p>Tạm tính</p>
                    <span className='font-medium'>
                        {/* {formatCurrency(totalPrices)} */}
                        120,000đ
                    </span>
                </div>
                <Card
                    title={
                        <p>
                            <PersonPinIcon className='text-blue-500' /> Điểm đón
                        </p>
                    }
                >
                    <div className='font-medium'>
                        {/* { trip?.route_start } */}
                        Hà Nội
                        <br></br>
                        {/* { start_point } */}
                        Mỹ Đình
                        <br></br> Dự kiến đón lúc:{" "}
                        {/* {formatTime(convertDateAndFormat(trip.departure_time))}{" "}
                        {formatDate(convertDatetime(trip.departure_time))} */}
                        08:00 22/12/2021
                    </div>
                </Card>
                <Card
                    title={
                        <p>
                            <PlaceIcon className='text-red-500' /> Điểm trả
                        </p>
                    }
                >
                    <div className='font-medium'>
                        {/* { break_point?.name } */}
                        Hồ Chí Minh
                        <br></br>
                        {/* { end_point } */}
                        Mỹ Đình
                        <br></br> Dự kiến trả lúc:{" "}
                        {/* {formatTime(
                            convertDateAndFormat(
                                break_point?.scheduled_end_time
                            )
                        )}{" "}
                        {formatDate(
                            convertDatetime(break_point?.scheduled_end_time)
                        )} */}
                        08:00 22/12/2021
                    </div>
                </Card>
            </div>
        </Drawer>
    );
};

export default PaymentDrawer;
