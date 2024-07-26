"use client";

import SearchForm from "@/modules/home/SearchForm";
import Filter from "@/modules/trip/Filter";
import TripList from "@/modules/trip/TripList";
import { useSearchParams } from "next/navigation";
import React, { createContext, useMemo } from "react";

export const TripContext = createContext();

export default function Page({ params }) {
    const searchParams = useSearchParams();
    const queryData = Object.fromEntries(searchParams.entries());
    const [filter, setFilter] = React.useState({});

    const contextValue = useMemo(
        () => ({ filter, setFilter, queryData }),
        [filter, queryData]
    );

    return (
        <TripContext.Provider value={contextValue}>
            <div className='min-h-[100vh] mx-auto flex flex-col items-center gap-5 pb-10'>
                <div className='w-[1200px] bg-white p-5 rounded-2xl'>
                    <SearchForm queryData={queryData} />
                </div>
                <div className='flex w-[1200px] gap-5'>
                    <nav className='w-[260px]'>
                        <Filter queryData={queryData} />
                    </nav>
                    <main className='flex-1'>
                        <TripList queryData={queryData} />
                    </main>
                </div>
            </div>
        </TripContext.Provider>
    );
}
