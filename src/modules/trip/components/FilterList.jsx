"use client";

import { formatCurrency } from "@/utils/money";
import { ProForm } from "@ant-design/pro-components";
import { Button, Col, InputNumber, Row, Slider } from "antd";
import React, { useState } from "react";

const FilterList = () => {
    const onChange = (key) => {
        console.log(key);
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
                />
                <SliderWithLabel
                    label='Giá vé'
                    min={0}
                    max={2000000}
                    defaultValue={[0, 2000000]}
                    step={100000}
                    marks={{ 0: "0đ", 2000000: formatCurrency(2000000) }}
                />
                <SliderWithLabel
                    label='Đánh giá'
                    min={0}
                    max={5}
                    defaultValue={[0, 5]}
                    marks={{ 0: "0⭐", 5: "5⭐" }}
                />
                <Button
                    className='flex items-center justify-center w-full py-5 mt-10 text-lg font-medium'
                    htmlType='submit'
                    type='primary'
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
