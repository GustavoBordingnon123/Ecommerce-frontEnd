import React from 'react';
import qs from 'query-string'
import { Product } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
    categoryId?: string;
    authorId?: string;
    publisherId?: string;
    isFeatured?: boolean;
    price?: number;
    count?: number;
}

const getProducts = async(query:Query): Promise<Product[]> => {

    const url = qs.stringifyUrl({
        url: URL,
        query:{
            categoryId: query.categoryId,
            authorId: query.authorId,
            price: query.price,
            publisherId: query.publisherId,
            isFeatured: query.isFeatured,
            count: query.count,
        }
    })

    const res = await fetch(url);

    return res.json();

}

export default getProducts;
