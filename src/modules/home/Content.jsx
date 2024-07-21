import ConnectionPlatform from '@/modules/home/ConnectionPlatform';
import Suggestion from '@/modules/home/Suggestion';
import React from 'react';

const Content = () => {
  return (
    <div>
      <div className="w-[980px] mx-auto flex gap-20 flex-col mb-20">
        <Suggestion />
        <ConnectionPlatform />
      </div>
    </div>
  );
};

export default Content;
