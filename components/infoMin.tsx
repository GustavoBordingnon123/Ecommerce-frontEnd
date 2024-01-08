import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import { MouseEventHandler, useState } from "react";
import { cn } from '@/lib/utils';
import Button from "./ui/Button";
import useCart from "@/hooks/useCart";

interface InfoProps {
    data: Product;
}

const InfoMin: React.FC<InfoProps> = ({ data }) => {
    const [readMore, setReadMore] = useState(false);
    const cart = useCart();

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        cart.addItem(data);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">
                {data.name}
            </h1>

            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900">
                    <Currency value={data?.price} />
                </p>
            </div>

            <hr className="my-4" />

            <div className="flex flex-col gap-y-4">
                <div className="flex flex-col">
                    <div className="flex items-center gap-x-2">
                        <h3 className="font-semibold text-black">Autor(a):</h3>
                        <div>{data?.author?.name}</div>
                    </div>

                    <div className="flex items-center gap-x-2">
                        <h3 className="font-semibold text-black">Editora:</h3>
                        <div>{data?.publisher.name}</div>
                    </div>

                    <div className="flex items-center gap-x-2">
                        <h3 className="font-semibold text-black">Categoria:</h3>
                        <div>{data?.category.name}</div>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-x-4 gap-y-1">
                    <h3 className="font-semibold text-black">Descrição:</h3>
                    <div
                        className={cn(
                            'max-h-200', // Set a default maximum height
                            { 'max-h-5': !readMore }, // Apply when readMore is false
                            'overflow-y-hidden'
                        )}
                    >
                        {data?.description}
                    </div>
                    <p
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={() => setReadMore(!readMore)}
                    >
                        {readMore ? 'Ler menos...' : 'Ler mais...'}
                    </p>
                </div>
            </div>

            <div className="mt-12 flex items-center gap-x-3">
                <Button className="flex items-center gap-x-2" onClick={onAddToCart}>
                    Add to Cart
                    <ShoppingCart />
                </Button>
            </div>
        </div>
    );
};

export default InfoMin;
