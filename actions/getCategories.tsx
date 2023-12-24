import React from 'react';
import { Category } from '@/types';

const url = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const GetCategories = async (): Promise<Category[]> => {
    const res = await fetch(url);

    // Log para verificar o corpo da resposta
    // console.log('Url:', url);
    // console.log('Response body:', await res.text());

    return res.json();
};


export default GetCategories;
