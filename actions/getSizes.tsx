import React from 'react';
import { Publisher } from '@/types';

const url = `${process.env.NEXT_PUBLIC_API_URL}/publishers`;

const getPublishers = async(): Promise<Publisher[]> => {

    const res = await fetch(url);

    return res.json();

}

export default getPublishers;
