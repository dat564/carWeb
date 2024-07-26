"use client";

import { TripContext } from "@/app/trip/page";
import { formatCurrency } from "@/utils/money";
import { ProForm } from "@ant-design/pro-components";
import { Button, Slider } from "antd";
import React, { useContext, useState } from "react";

const FilterList = () => {
    const [filterValues, setFilterValues] = useState({});
    const { setFilter, queryData } = useContext(TripContext);
    const selectedDate = queryData.date;

    function setDateTime(date, hours) {
        return new Date(date.setHours(hours, 0, 0));
    }

    const handleFilterSubmit = () => {
        // const departureTimeMin = setDateTime(
        //     new Date(selectedDate),
        //     filterValues.departure_time
        //         ? `${filterValues.departure_time[0]}:00`
        //         : "0:00"
        // );
        // const departureTimeMax = setDateTime(
        //     new Date(selectedDate),
        //     filterValues.departure_time
        //         ? `${filterValues.departure_time[1]}:00`
        //         : "24:00"
        // );
        setFilter({
            ticket_price_min: filterValues.price ? filterValues.price[0] : 0,
            ticket_price_max: filterValues.price
                ? filterValues.price[1]
                : 2000000,
            average_trip_rating_min: filterValues.rating
                ? filterValues.rating[0]
                : 0,
            average_trip_rating_max: filterValues.rating
                ? filterValues.rating[1]
                : 5,
            departure_time_min: filterValues.departure_time[0],
            departure_time_max: filterValues.departure_time[1],
        });
    };

    const handleSliderChange = (key, value) => {
        setFilterValues((prevState) => ({ ...prevState, [key]: value }));
    };

    return (
        <div className='w-full px-10 py-5 text-base bg-white rounded-2xl'>
            <h2 className='mb-4 text-xl font-semibold'>Lọc</h2>
            <ProForm submitter={false}>
                <SliderWithLabel
                    label='Giờ đi'
                    min={0}
                    max={24}
                    defaultValue={[0, 24]}
                    marks={{ 0: "0h", 24: "24h" }}
                    onChange={(value) =>
                        handleSliderChange("departure_time", value)
                    }
                />
                <SliderWithLabel
                    label='Giá vé'
                    min={0}
                    max={2000000}
                    defaultValue={[0, 2000000]}
                    step={100000}
                    marks={{ 0: "0đ", 2000000: formatCurrency(2000000) }}
                    onChange={(value) => handleSliderChange("price", value)}
                />
                <SliderWithLabel
                    label='Đánh giá'
                    min={0}
                    max={5}
                    defaultValue={[0, 5]}
                    marks={{ 0: "0⭐", 5: "5⭐" }}
                    onChange={(value) => handleSliderChange("rating", value)}
                />
                <Button
                    className='flex items-center justify-center w-full py-5 mt-10 text-lg font-medium'
                    type='primary'
                    onClick={handleFilterSubmit}
                >
                    Lọc
                </Button>
            </ProForm>
        </div>
    );
};

const SliderWithLabel = ({ label, min, max, defaultValue, ...props }) => {
    return (
        <>
            <label className='text-lg font-medium'>{label}</label>
            <Slider
                min={min}
                max={max}
                range
                defaultValue={defaultValue}
                {...props}
            />
        </>
    );
};

export default FilterList;
