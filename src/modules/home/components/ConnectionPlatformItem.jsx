import { CarFilled } from '@ant-design/icons';
import React from 'react';

const ConnectionPlatformItem = () => {
  return (
    <div className="rounded-md p-3 border border-[#858585] overflow-hidden flex gap-5">
      <div>
        <CarFilled style={{ fontSize: '80px', color: '#08c' }} />
      </div>
      <div>
        <h3 className="mb-2">2000+ nhà xe chất lượng cao</h3>
        <p className="text-[#858585] text-sm">5000+ tuyến đường trên toàn quốc, chủ động và đa dạng lựa chọn.</p>
      </div>
    </div>
  );
};

export default ConnectionPlatformItem;
