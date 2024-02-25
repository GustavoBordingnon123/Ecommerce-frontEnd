"use client";

import React from 'react'
import HomeData from "./HomeData";
import { useSearchProvider } from '@/hooks/useSearch';

const HomeContent = async() => {
    const { inputValue } = useSearchProvider();

    return (
        <div>
            <HomeData filtros={inputValue}/>
        </div>
    )
}

export default HomeContent;
