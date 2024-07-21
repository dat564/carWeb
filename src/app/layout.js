import { Roboto } from 'next/font/google';
import './globals.css';
import './reset.css';
import { ConfigProvider } from 'antd';
import MainLayout from '@/layouts/main';
import viVN from 'antd/lib/locale/vi_VN';
import RecoilRootLayout from '@/app/RecoilRootLayout';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const roboto = Roboto({ subsets: ['vietnamese'], weight: ['100', '300', '400', '500', '700', '900'] });

export const metadata = {
  title: 'BookingCar',
  description: 'Đặt xe trực tuyến nhanh chóng, tiện lợi'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ConfigProvider locale={viVN}>
          <RecoilRootLayout>
            <MainLayout>{children}</MainLayout>
          </RecoilRootLayout>
        </ConfigProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
