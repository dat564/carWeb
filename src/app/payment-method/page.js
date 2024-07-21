'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { formatCurrency } from '@/utils/money';
import PaymentTripDetail from '@/modules/payment/PaymentTripDetail';
import WalletIcon from '@mui/icons-material/Wallet';
import PaymentInfoDetail from '@/modules/payment/PaymentInfoDetail';
import RemainTime from '@/modules/payment/RemainTime';
import { currentTripAtom } from '@/atom/currentTrip';
import { useRecoilValue } from 'recoil';
import { useEffect, useRef } from 'react';
import { getPaymentUrl } from '@/services/payment';

export default function Page({ params }) {
  const searchParams = useSearchParams();
  const queryData = Object.fromEntries(searchParams.entries());
  const { billId } = queryData || {};
  const currentTrip = useRecoilValue(currentTripAtom);
  const paymentUrlRef = useRef();
  const router = useRouter();

  useEffect(() => {
    getPaymentUrl(billId).then(res => {
      
    });
  }, [billId]);

  // if (!Object.keys(currentTrip.trip).length) {
  //   return router.push('/my-ticket');
  // }

  return (
    <div className="flex flex-col items-center gap-5 pb-10 mx-auto">
      <RemainTime></RemainTime>
      <div className="items-start w-[1200px] flex gap-5">
        <div className="flex-1">
          <div className="w-full p-5 bg-white rounded-lg">
            <h3 className="mb-5">Phương thức thanh toán</h3>
            <div className="flex items-start gap-3 p-5">
              <WalletIcon className="w-8 h-8" />
              <div>
                <span className="text-lg font-medium">Thanh toán bằng ví điện tử</span>
                <p>Không cần nhập thông tin. Xác nhận thanh toán tức thì, nhanh chóng và ít sai sót.</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <button className="flex items-center justify-center w-full p-5 py-3 mt-5 text-lg font-medium text-white bg-yellow-400 rounded-lg hover:bg-yellow-500">
              Thanh toán
            </button>
          </div>
        </div>
        <div className="w-[500px] flex flex-col gap-5">
          <div className="flex justify-between w-full p-5 text-lg font-medium bg-white rounded-lg">
            <h3>Tạm tính: </h3>
            <span>{formatCurrency(1000000)}</span>
          </div>
          <PaymentTripDetail></PaymentTripDetail>
          <PaymentInfoDetail></PaymentInfoDetail>
        </div>
      </div>
    </div>
  );
}
