"use client";

// SearchContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface SearchContextData {
    searchValue: string;
    setSearchValue: (value: string) => void;
}

const SearchContext = createContext<SearchContextData | undefined>(undefined);

export const SearchProvider: React.FC = ({ children }: any) => {
    
    const [searchValue, setSearchValue] = useState('');

    return (
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};
