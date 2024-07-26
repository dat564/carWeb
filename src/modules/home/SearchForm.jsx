"use client";

import {
    ProForm,
    ProFormDatePicker,
    ProFormSelect,
} from "@ant-design/pro-components";
import { Button, Spin } from "antd";
import React, { useEffect } from "react";
import DepartmentIcon from "@/components/icons/DepartmentIcon.svg";
import DateIcon from "@/components/icons/DateIcon.svg";
import DestinationIcon from "@/components/icons/DestinationIcon.svg";
import Image from "next/image";
import styled from "styled-components";
import { getCityList } from "@/services/cities";
import { useRouter } from "next/navigation";
import moment from "moment/moment";

const Container = styled.div`
    .ant-select {
        height: 30px;
    }
    .ant-select-selector {
        border: 0 !important;
        padding: 0 !important;
        outline: none !important;
    }
    .ant-select-focused {
        border: 0 !important;
    }
    .ant-form-item {
        margin-bottom: 0;
    }
    .ant-select-selection-item {
        font-weight: 500;
        font-size: 16px;
    }
    .ant-picker {
        border: 0 !important;
        padding: 0 !important;
    }
    .ant-picker-input {
        font-weight: 500;
        font-size: 16px;
    }
`;

const SearchForm = ({ queryData = {} }) => {
    const [form] = ProForm.useForm();
    const departmentPointRef = React.useRef();
    const destinationPointRef = React.useRef();
    const dateRef = React.useRef();
    const [openDate, setOpenDate] = React.useState(false);
    const [cities, setCities] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const handleGetCities = async () => {
        const data = await getCityList();
        const results = data.map((city) => ({
            label: city.province_name,
            value: city.province_name,
        }));
        setCities(results);
    };

    const handleSubmit = async (values) => {
        await form.validateFields();
        setLoading(true);

        const queryString = new URLSearchParams(values).toString();
        router.push(`/trip?${queryString}`);
        setLoading(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);

        const namePath = errorInfo.errorFields[0].name[0];
        if (namePath === "route_start") departmentPointRef.current.focus();
        if (namePath === "route_end") destinationPointRef.current.focus();
        if (namePath === "date") {
            dateRef.current.focus();
            setOpenDate(true);
        }
    };

    useEffect(() => {
        handleGetCities();
    }, []);

    return (
        <Container>
            <div className='w-full p-5 bg-white rounded-lg min-h-20'>
                <Spin spinning={loading}>
                    <ProForm
                        submitter={false}
                        initialValues={{
                            ...queryData,
                            date: queryData?.date
                                ? moment(queryData?.date, "DD/MM/YYYY")
                                : moment(),
                        }}
                        className='flex items-center gap-5'
                        form={form}
                        onFinish={handleSubmit}
                        onFinishFailed={onFinishFailed}
                    >
                        <div className='flex-1 flex items-center border border-[#eee] rounded-lg min-h-[50px] p-3 gap-4 w-full'>
                            <div className='flex items-center justify-center px-3 flex-1 gap-4 border-r border-[#eee]'>
                                <Image src={DepartmentIcon} alt='123' />
                                <div className='flex flex-col justify-center flex-1 h-[30px]'>
                                    <span className='text-[#bbb] text-[12px] font-semibold'>
                                        Nơi xuất phát
                                    </span>
                                    <ProFormSelect
                                        name='route_start'
                                        fieldProps={{
                                            ref: departmentPointRef,
                                            showAction: ["focus"],
                                            showSearch: true,
                                        }}
                                        options={cities}
                                        id='route_start'
                                        onChange={() =>
                                            destinationPointRef.current.focus()
                                        }
                                        className='p-0 m-0 text-lg font-bold'
                                        rules={[
                                            { required: true, message: "" },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className='flex items-center justify-center flex-1 px-3 gap-4 border-r border-[#eee]'>
                                <Image src={DestinationIcon} alt='123' />
                                <div className='flex flex-col justify-center flex-1 h-[30px]'>
                                    <span className='text-[#bbb] text-[12px] font-semibold'>
                                        Nơi đến
                                    </span>
                                    <ProFormSelect
                                        name='route_end'
                                        fieldProps={{
                                            ref: destinationPointRef,
                                            showAction: ["focus"],
                                            showSearch: true,
                                        }}
                                        onChange={() => setOpenDate(true)}
                                        options={cities}
                                        className='p-0 m-0 text-lg font-bold'
                                        rules={[
                                            { required: true, message: "" },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className='flex items-center justify-center w-[300px] gap-4 px-4'>
                                <Image src={DateIcon} alt='123' />
                                <div className='flex flex-col justify-center flex-1 h-[30px]'>
                                    <span
                                        htmlFor='test'
                                        className='text-[#bbb] text-[12px] font-semibold'
                                    >
                                        Ngày đi
                                    </span>
                                    <ProFormDatePicker
                                        name='date'
                                        fieldProps={{
                                            format: "DD/MM/YYYY",
                                            ref: dateRef,
                                            open: openDate,
                                            onOpenChange: (status) =>
                                                setOpenDate(status),
                                            disabledDate: (current) =>
                                                current &&
                                                current <
                                                    moment().startOf("day"),
                                        }}
                                        className='p-0 m-0 text-lg font-bold'
                                        rules={[
                                            { required: true, message: "" },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                        <Button
                            className='flex items-center justify-center px-10 py-6 font-medium bg-yellow-400 hover:!bg-yellow-500'
                            type='primary'
                            htmlType='submit'
                            loading={loading}
                        >
                            Tìm kiếm
                        </Button>
                    </ProForm>
                </Spin>
            </div>
        </Container>
    );
};

export default SearchForm;
