'use client';

import { Breadcrumb, Button, message, Spin } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ProForm, ProFormDatePicker, ProFormText } from '@ant-design/pro-components';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import TicketItem from '@/modules/myTicket/TicketItem';
import { useEffect, useState } from 'react';
import { getBillList } from '@/services/bill';
import { BillStatus } from '@/constants/bill';
import { TRIP_STATUS } from '@/constants/trip';
import { useSetRecoilState } from 'recoil';
import { isAuthenticatedAtom } from '@/atom';

const Tab = {
  CURRENT: 'current',
  PAST: 'past',
  CANCEL: 'cancel'
};

export default function Page({ params }) {
  const searchParams = useSearchParams();
  const queryData = Object.fromEntries(searchParams.entries());
  const router = useRouter();
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedAtom);
  const [currentTab, setCurrentTab] = useState('current');
  const [ticketList, setTicketList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState();
  const [currentTicket, setCurrentTicket] = useState([]);

  const handleGetTickets = async () => {
    try {
      setLoading(true);
      const { data } = await getBillList();
      setTicketList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetTickets();
  }, [refresh]);

  useEffect(() => {
    if (ticketList.length > 0) {
      switch (currentTab) {
        case Tab.CURRENT:
          setCurrentTicket(
            ticketList.filter(
              (ticket) => ticket.trip.status === TRIP_STATUS.PENDING_DEPARTURE && ticket.status !== BillStatus.CANCELED
            )
          );
          break;
        case Tab.PAST:
          setCurrentTicket(ticketList.filter((ticket) => ticket.trip.status === TRIP_STATUS.LANDED));
          break;
        case Tab.CANCEL:
          setCurrentTicket(ticketList.filter((ticket) => ticket.status === BillStatus.CANCELED));
          break;
        default:
          break;
      }
    }
  }, [currentTab, ticketList]);

  return (
    <div className="flex flex-col items-center gap-5 pb-10 mx-auto min-h-[100vh]">
      <div className="w-[1200px]">
        <Breadcrumb
          items={[
            {
              title: <a href="/">Trang chủ</a>
            },
            {
              title: 'Vé của tôi'
            }
          ]}
        />
      </div>
      <div className="items-start w-[1200px] flex gap-5">
        <div className="w-[300px] bg-white rounded-lg flex flex-col gap-3 p-3">
          <Link
            href={'/profile'}
            className="flex items-center p-3 transition-all cursor-pointer hover:bg-gray-200 gap-x-2 hover:rounded-lg"
          >
            <AccountCircleIcon />
            <span>Thông tin tài khoản</span>
          </Link>
          <Link
            href={'/my-ticket'}
            className="flex items-center p-3 text-blue-500 transition-all cursor-pointer hover:bg-gray-200 gap-x-2 hover:rounded-lg"
          >
            <ConfirmationNumberIcon />
            <span>Đơn hàng của tôi</span>
          </Link>
          <span
            onClick={() => {
              localStorage.clear();
              setIsAuthenticated(false);
              message.success('Đăng xuất thành công');
              router.push('/');
            }}
            className="flex items-center p-3 transition-all cursor-pointer hover:bg-gray-200 gap-x-2 hover:rounded-lg"
          >
            <LogoutIcon />
            <span>Đăng xuất</span>
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center w-full font-medium bg-white h-[50px] rounded-lg mb-5">
            <div
              className={`flex items-center justify-center flex-1 h-full border-b-4  cursor-pointer ${
                currentTab === Tab.CURRENT ? 'text-blue-500 border-blue-500' : ''
              }`}
              onClick={() => setCurrentTab(Tab.CURRENT)}
            >
              <span>Hiện tại</span>
            </div>
            <div
              className={`flex items-center justify-center flex-1 h-full  border-b-4  cursor-pointer ${
                currentTab === Tab.PAST ? 'text-blue-500 border-blue-500' : ''
              }`}
              onClick={() => setCurrentTab(Tab.PAST)}
            >
              <span>Đã đi</span>
            </div>
            <div
              className={`flex items-center justify-center flex-1 h-full  border-b-4 cursor-pointer ${
                currentTab === Tab.CANCEL ? 'text-blue-500 border-blue-500' : ''
              }`}
              onClick={() => setCurrentTab(Tab.CANCEL)}
            >
              <span>Đã hủy</span>
            </div>
          </div>
          {currentTicket.length === 0 ? (
            <Spin spinning={loading}>
              Bạn chưa có chuyến sắp đi nào.{' '}
              <Link href={'/'} className="text-blue-500 transition-all hover:underline">
                Đặt chuyến đi ngay
              </Link>
            </Spin>
          ) : (
            <Spin spinning={loading} className="flex flex-col gap-5">
              {currentTicket.map((ticket, index) => (
                <TicketItem key={index} ticket={ticket} currentTab={currentTab} setRefresh={setRefresh} />
              ))}
            </Spin>
          )}
        </div>
      </div>
    </div>
  );
}
