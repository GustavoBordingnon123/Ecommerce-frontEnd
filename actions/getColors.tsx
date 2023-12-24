import React from 'react';
import { Author} from '@/types';

const url = `${process.env.NEXT_PUBLIC_API_URL}/authors`;

const getAuthors = async(): Promise<Author[]> => {

    const res = await fetch(url);

    return res.json();

}

export default getAuthors;
