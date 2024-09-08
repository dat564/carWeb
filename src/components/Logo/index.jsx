import Link from "next/link";
import React from "react";

const Logo = ({ className }) => {
    return (
        <Link href='/' className={`text-[25px] ${className}`}>
            🛤️ Railway G8
        </Link>
    );
};

export default Logo;
