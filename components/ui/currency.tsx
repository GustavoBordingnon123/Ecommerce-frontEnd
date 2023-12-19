"use client";

import React from "react";

const formatter = new Intl.NumberFormat("en-US", {
    style:'currency',
    currency:'USD'
})

interface CurrencyProps{
    value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({value}) => {

    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted){ return null;}

    return(
        <div className="font-semibold">
            {formatter.format(Number(value))}
        </div>
    )
}

export default Currency;