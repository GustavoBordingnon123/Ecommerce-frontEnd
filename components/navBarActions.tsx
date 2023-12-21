"use client";

import Button from "@/components/ui/Button";
import useCart from "@/hooks/useCart";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect} from "react";

const NavBarActions = () => {

    const router = useRouter();
    const cart = useCart();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted){ return null;}

    return (
        <div className='ml-auto flex items-center gap-x-4'>
            <Button
                className="flex items-center rounded-full bg-black px-4 py-2"
                onClick={() => router.push('/cart')}
            >
                <ShoppingBag 
                    size={20}
                    color="white"
                />
                <span className="ml-2 text-sm font-medium text-white">
                    {cart.items.length}
                </span>
            </Button>
        </div>
    )
}

export default NavBarActions;
