'use client';

import { formatTime } from '@/utils/date';
import { ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { Card, Radio } from 'antd';
import React, { useState } from 'react';

const PickPoint = ({ trip, handleSetPickpoint }) => {
  const [isDynamicPickPoint, setIsDynamicPickPoint] = useState(false);
  const [isDynamicDropPoint, setIsDynamicDropPoint] = useState(false);

  return (
    <div className="flex justify-center gap-10 mt-5 mb-5 text-lg">
      <Card className="flex-1" title="Điểm đón">
        <ProFormRadio.Group name="startPoint">
          <ul className="flex flex-col gap-5">
            <li className="flex items-baseline gap-4 text-lg font-medium">
              <div>
                <Radio
                  value={1}
                  checked={!isDynamicPickPoint}
                  onChange={(e) => e.target.checked && setIsDynamicPickPoint(false)}
                ></Radio>
              </div>
              <div>
                <span>{formatTime(trip?.departure_time)}</span> • {trip?.route_start}
                <p className="text-base font-normal">{trip?.start_point}</p>
              </div>
            </li>
            <li className="flex items-baseline gap-4 text-lg font-medium">
              <div>
                <Radio
                  value={trip?.start_point}
                  onChange={(e) => setIsDynamicPickPoint(e.target.checked)}
                  checked={isDynamicPickPoint}
                ></Radio>
              </div>
              <div>
                <span>{formatTime(trip?.departure_time)}</span> • {trip?.route_start}
                <div className="text-base font-normal">
                  <ProFormText
                    name="startPoint"
                    fieldProps={{
                      onChange: (e) => {
                        if (isDynamicPickPoint) handleSetPickpoint(e.target.value, 'start_point');
                      }
                    }}
                  />
                </div>
              </div>
            </li>
          </ul>
        </ProFormRadio.Group>
      </Card>
      <div className="w-[1px] h-[400px] bg-black"></div>
      <Card className="flex-1" title="Điểm trả">
        <ProFormRadio.Group name="startPoint">
          <ul className="flex flex-col gap-5">
            <li className="flex items-baseline gap-4 text-lg font-medium">
              <div>
                <Radio
                  value={1}
                  checked={!isDynamicDropPoint}
                  onChange={(e) => e.target.checked && setIsDynamicDropPoint(false)}
                ></Radio>
              </div>
              <div>
                <span>{formatTime(trip?.scheduled_end_time)}</span> • {trip?.route_end}
                <p className="text-base font-normal">{trip?.end_point}</p>
              </div>
            </li>
            <li className="flex items-baseline gap-4 text-lg font-medium">
              <div>
                <Radio
                  value={1}
                  checked={isDynamicDropPoint}
                  onChange={(e) => setIsDynamicDropPoint(e.target.checked)}
                ></Radio>
              </div>
              <div>
                <span>{formatTime(trip?.scheduled_end_time)}</span> • {trip?.route_end}
                <div className="text-base font-normal">
                  <ProFormText
                    name="endPoint"
                    fieldProps={{
                      onChange: (e) => {
                        if (isDynamicDropPoint) handleSetPickpoint(e.target.value, 'end_point');
                      }
                    }}
                  />
                </div>
              </div>
            </li>
          </ul>
        </ProFormRadio.Group>
      </Card>
    </div>
  );
};

export default PickPoint;
