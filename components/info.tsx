"use client"

import { ShoppingCart } from "lucide-react";

import { Product } from "@/types"
import Currency  from "@/components/ui/currency";
import { MouseEventHandler } from "react";
import Button from "./ui/Button";
import useCart from "@/hooks/useCart";

interface InfoProps {
    data: Product;
}

const Info :React.FC<InfoProps> = ({data}) => {

    const cart = useCart();

    const onAddToCart:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();

        cart.addItem(data);
    }


    return(
        <div>
            <h1 className="text-3xl font-bold text-gray-900">
                {data.name}
            </h1>

            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900 ">
                    <Currency value={data?.price}/>
                </p>
            </div>

            <hr className="my-4" />

            <div className="flex flex-col gap-y-4">

                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Author:</h3>
                    <div>
                        {data?.author?.name}
                    </div>
                </div>

                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Publisher:</h3>
                    <div 
                        className="h-6 w-6 rounded-full border border-gray-600" 
                        style={{backgroundColor: data?.publisher?.value}} 
                    />
                </div>
            </div>

            <div className="mt-10 flex items-center gap-x-3">

                <Button className="flex items-center gap-x-2" onClick={onAddToCart}>
                    Add to Cart
                    <ShoppingCart />
                </Button>

            </div>

        </div>
    );
}

export default Info;