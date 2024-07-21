'use client';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import React, { useState } from 'react';

const DropdownSimple = (props) => {
  const { label, handleMenuClick, items } = props;
  const [open, setOpen] = useState(false);

  const handleOpenChange = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen);
    }
  };

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick
      }}
      onOpenChange={handleOpenChange}
      open={open}
      className="text-base font-medium cursor-pointer"
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <span className="text-sm">{label}</span>
          <DownOutlined className="text-sm" />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownSimple;
