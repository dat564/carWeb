import Link from 'next/link';
import React from 'react';

const Logo = ({ className }) => {
  return (
    <Link href="/" className={`text-[25px] ${className}`}>
      BookingCar 🚃
    </Link>
  );
};

export default Logo;
