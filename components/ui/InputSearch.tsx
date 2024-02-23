"use client";

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useSearchProvider } from '@/hooks/useSearch';

const InputSearch = () => {

    const { inputValue, setInputValue } = useSearchProvider();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
    };

    return (
        <div className='mx-2 flex gap-x-2 justify-center items-center p-1 bg-[#eee] shadow-md w-[300px] rounded-sm'>
            <Search size={20} />
            <input
                placeholder='Pesquisar livros...'
                type='text'
                className='w-full bg-[#eee]'
                value={inputValue}
                onChange={handleChange}
            />
        </div>
    );
};

export default InputSearch;