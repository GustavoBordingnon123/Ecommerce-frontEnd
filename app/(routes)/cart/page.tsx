"use client";

import { useEffect, useState } from "react";

import Container from "@/components/ui/container";
import CartItem from "./components/cartItem";
import Summary from "./components/summary";
import useCart from "@/hooks/useCart";

const cartPage = () => {

    const cart = useCart();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted){ return null;}

    return(
        <div className="bg-white">
            <Container>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bol text-black">Shopping Cart</h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                        <div className="lg:col-span-7">
                            {cart.items.length === 0 && 
                                <p className="text-neutral-500">
                                    No items added to cart
                                </p>
                            }
                            <ul>
                                {cart.items.map((item) => (
                                   <CartItem 
                                        key={item.id}
                                        data={item}
                                   />
                                ))}
                            </ul>
                        </div>
                        <Summary />
                    </div>
                </div>
            </Container>
        </div>
    )   
}

export default cartPage;