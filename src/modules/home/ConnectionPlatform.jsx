import ConnectionPlatformItem from '@/modules/home/components/ConnectionPlatformItem';
import { CarFilled, CheckCircleOutlined, DiscordOutlined, TagOutlined } from '@ant-design/icons';
import React from 'react';

const ConnectionPlatform = () => {
  return (
    <div className="mb-10">
      <h2 className="mt-10 mb-4">Nền tảng kết nối người dùng và nhà xe</h2>
      <div className="flex gap-4">
        <div className="rounded-md p-3 border border-[#858585] overflow-hidden flex gap-5">
          <div>
            <CarFilled style={{ fontSize: '80px', color: '#08c' }} />
          </div>
          <div>
            <h3 className="mb-2">2000+ nhà xe chất lượng cao</h3>
            <p className="text-[#858585] text-sm">5000+ tuyến đường trên toàn quốc, chủ động và đa dạng lựa chọn.</p>
          </div>
        </div>
        <div className="rounded-md p-3 border border-[#858585] overflow-hidden flex gap-5">
          <div>
            <TagOutlined style={{ fontSize: '80px', color: '#08c' }} />
          </div>
          <div>
            <h3 className="mb-2">Đặt vé dễ dàng</h3>
            <p className="text-[#858585] text-sm">Đặt vé chỉ với 60s. Chọn xe yêu thích cực nhanh và thuận tiện.</p>
          </div>
        </div>
        <div className="rounded-md p-3 border border-[#858585] overflow-hidden flex gap-5">
          <div>
            <CheckCircleOutlined style={{ fontSize: '80px', color: '#08c' }} />
          </div>
          <div>
            <h3 className="mb-2">2000+ nhà xe chất lượng cao</h3>
            <p className="text-[#858585] text-sm">5000+ tuyến đường trên toàn quốc, chủ động và đa dạng lựa chọn.</p>
          </div>
        </div>
        <div className="rounded-md p-3 border border-[#858585] overflow-hidden flex gap-5">
          <div>
            <DiscordOutlined style={{ fontSize: '80px', color: '#08c' }} />
          </div>
          <div>
            <h3 className="mb-2">2000+ nhà xe chất lượng cao</h3>
            <p className="text-[#858585] text-sm">5000+ tuyến đường trên toàn quốc, chủ động và đa dạng lựa chọn.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionPlatform;
