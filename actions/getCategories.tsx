import React from 'react';
import { Category } from '@/types';

const url = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const GetCategories = async() => {

    const res = await fetch(url);

    return res.json();

}

export default GetCategories;
