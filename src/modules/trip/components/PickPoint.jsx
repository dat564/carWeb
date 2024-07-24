'use client';

import { convertDatetimeAndFormat, formatTime } from '@/utils/date';
import { ProForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { Card } from 'antd';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

const PickPoint = ({ trip }, ref) => {
  const [form] = ProForm.useForm();
  const [selectedBreakPoint, setSelectedBreakPoint] = React.useState(null);
  const resultRef = useRef({
    start_point: '',
    end_point: ''
  });

  const renderStartPoint = () => {
    if (trip?.static_start_point) {
      return (
        <li className="flex items-baseline gap-4 text-lg font-medium">
          <div>
            <ProFormRadio
              checked
              name="staticStartPoint"
              onChange={(e) => {
                if (e.target.checked) {
                  resultRef.current = {
                    ...resultRef.current,
                    start_point: trip?.start_point
                  };
                }
              }}
            />
          </div>
          <div>
            <span>{formatTime(convertDatetimeAndFormat(trip?.departure_time))}</span> • {trip?.route_start}
            <p className="text-base font-normal">{trip?.start_point}</p>
          </div>
        </li>
      );
    } else {
      return (
        <li className="flex items-baseline gap-4 text-lg font-medium">
          <div>
            <ProFormRadio
              fieldProps={{
                onChange: (e) => {
                  if (e.target.checked) {
                    const value = form.getFieldValue('startPoint');
                    resultRef.current = {
                      ...resultRef.current,
                      start_point: value
                    };
                  }
                }
              }}
            />
          </div>
          <div>
            <span>{formatTime(trip?.departure_time)}</span> • {trip?.route_start}
            <div className="text-base font-normal">
              <ProFormText
                name="startPoint"
                fieldProps={{
                  onBlur: (e) => {
                    resultRef.current = {
                      ...resultRef.current,
                      start_point: e.target.value
                    };
                  }
                }}
              />
            </div>
          </div>
        </li>
      );
    }
  };

  const renderEndPoint = () => {
    return trip.break_point?.map((item) => (
      <li className="flex items-baseline gap-4 text-lg font-medium" key={item.id}>
        <div>
          <ProFormRadio
            name={`endPoint_${item.id}`}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedBreakPoint(item);

                const filterBreakPoint = trip?.break_point?.filter((i) => i.id !== item.id) || [];

                filterBreakPoint.forEach((i) => {
                  form.resetFields([`endPoint_${i.id}`]);
                });

                const value = form.getFieldValue(`endPoint_value_${item.id}`);

                resultRef.current = {
                  ...resultRef.current,
                  end_point: value || ''
                };
              }
            }}
          />
        </div>
        <div>
          <span>{formatTime(convertDatetimeAndFormat(item?.scheduled_end_time))}</span> • {item?.name}
          <div className="text-base font-normal">
            {trip.static_end_point ? (
              <p className="text-base font-normal">{item?.end_point}</p>
            ) : (
              <ProFormText
                name={`endPoint_value_${item?.id}`}
                fieldProps={{
                  onBlur: (e) => {
                    resultRef.current = {
                      ...resultRef.current,
                      end_point: e.target.value
                    };
                  },
                  disabled: selectedBreakPoint?.id !== item?.id
                }}
              />
            )}
          </div>
        </div>
      </li>
    ));
  };

  useImperativeHandle(
    ref,
    () => ({
      getData: () => {
        return { ...resultRef?.current, break_point_id: selectedBreakPoint?.id };
      }
    }),
    [selectedBreakPoint?.id]
  );

  return (
    <ProForm form={form} className="flex justify-center gap-10 mt-5 mb-5 text-lg" submitter={false}>
      <Card className="flex-1" title="Điểm đón">
        <ul className="flex flex-col gap-5">{renderStartPoint()}</ul>
      </Card>
      <div className="w-[1px] h-[400px] bg-black"></div>
      <Card className="flex-1" title="Điểm trả">
        <ul className="flex flex-col gap-5">{renderEndPoint()}</ul>
      </Card>
    </ProForm>
  );
};

export default forwardRef(PickPoint);
