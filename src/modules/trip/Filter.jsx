'use client';

import FilterList from '@/modules/trip/components/FilterList';
import SortList from '@/modules/trip/components/SortList';
import { ProFormRadio } from '@ant-design/pro-components';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  .ant-radio-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .ant-radio-wrapper {
    font-size: 16px !important;
  }
`;

const Filter = () => {
  return (
    <Container>
      <div className="flex flex-col gap-5">
        {/* <SortList /> */}
        <FilterList />
      </div>
    </Container>
  );
};

export default Filter;
