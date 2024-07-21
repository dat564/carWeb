import { ProFormRadio } from '@ant-design/pro-components';
import React from 'react';

const SortList = () => {
  return (
    <div className="w-full p-5 pb-0 bg-white rounded-2xl">
      <h2 className="mb-4 text-xl font-semibold">Sắp xếp</h2>
      <ProFormRadio.Group
        className="flex flex-col gap-2 mt-2"
        name="sort"
        direction="vertical"
        style={{ fontSize: '20px' }}
        options={[
          {
            label: 'Mặc định',
            value: 'a'
          },
          {
            label: 'Giờ đi sớm nhất',
            value: 'b'
          },
          {
            label: 'Giờ đi muộn nhất',
            value: 'c'
          },
          {
            label: 'Đánh giá cao nhất',
            value: 'c'
          },
          {
            label: 'Giá tăng dần',
            value: 'c'
          },
          {
            label: 'Giá giảm dần',
            value: 'c'
          }
        ]}
      />
    </div>
  );
};

export default SortList;
