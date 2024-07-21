import ConnectionPlatformItem from '@/modules/home/components/ConnectionPlatformItem';
import React from 'react';

const ConnectionPlatform = () => {
  return (
    <div className="mb-10">
      <h2 className="mt-10 mb-4">Nền tảng kết nối người dùng và nhà xe</h2>
      <div className="flex gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <ConnectionPlatformItem key={index} />
        ))}
      </div>
    </div>
  );
};

export default ConnectionPlatform;
