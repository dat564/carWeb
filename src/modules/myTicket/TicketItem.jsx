import {
    convertDatetimeAndFormat,
    formatDate,
    formatTime,
    subtractDateTimes,
} from "@/utils/date";
import { Button, notification, Tag } from "antd";
import React, { useState } from "react";

const TicketItem = ({ currentTab, ticket }) => {
    const [evaluation, setEvaluation] = useState(null);

    const handleEvaluationClick = () => {
        notification.info({
            message: "Thông báo",
            description: "Vui lòng tải ứng dụng để thực hiện đánh giá.",
        });
    };

    return (
        <div className='w-full h-[230px] p-5 bg-white rounded-lg'>
            <div className='flex flex-col w-full h-full border rounded-lg'>
                <div className='relative flex-1 p-5'>
                    <div className='flex flex-col gap-2'>
                        <span className='font-medium'>
                            {formatDate(
                                subtractDateTimes(ticket.trip.departure_time)
                            )}
                        </span>
                        <span className='font-medium text-[28px]'>
                            {formatTime(
                                convertDatetimeAndFormat(
                                    ticket.trip.departure_time
                                )
                            )}
                        </span>
                        <span>{ticket.trip.car.transport_company.name}</span>
                        <div className='flex-row items-center '>
                            <span>{ticket.trip.route_start}</span>
                            <span> -</span>
                            <span>{ticket.trip.route_end}</span>
                        </div>
                    </div>
                    {currentTab === "cancel" && (
                        <div className='absolute top-2 right-2'>
                            <Tag color='red'>Đã hủy</Tag>
                        </div>
                    )}
                </div>
                {currentTab !== "cancel" && (
                    <div>
                        {currentTab === "past" ? (
                            <div className='h-[50px] flex items-center font-medium gap-1 justify-end'>
                                <button
                                    onClick={handleEvaluationClick}
                                    className='flex items-center justify-center w-[100%] h-full text-white bg-yellow-400 rounded-lg'
                                >
                                    Đánh giá
                                </button>
                            </div>
                        ) : (
                            <div className='h-[50px] flex items-center font-medium gap-1 justify-around'>
                                <button className='flex items-center justify-center w-full h-full text-white bg-red-500 rounded-lg'>
                                    Hủy
                                </button>
                                <button className='flex items-center justify-center w-full h-full text-white bg-yellow-400 rounded-lg'>
                                    Thanh toán
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketItem;
