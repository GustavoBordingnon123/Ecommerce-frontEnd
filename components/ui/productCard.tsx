"use client";

import Image from "next/image";
import { Product } from "@/types";
import IconButton  from "@/components/ui/iconButton";
import Currency  from "@/components/ui/currency";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import usePreviewModal from "@/hooks/usePreviewModal";
import useCart from "@/hooks/useCart";
import { toast } from "react-hot-toast";

interface ProductCard{
    data: Product;
}

const ProductCard: React.FC<ProductCard> = ({data}) => {

    const router = useRouter();

    const handleClick = () =>{
        router.push(`/product/${data.id}`);
    }

    const previewModal = usePreviewModal();

    const onPreview:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();

        previewModal.onOpen(data);
    }

    const cart = useCart();

    const onAddToCart:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();

        const userData = localStorage.getItem('user');
        if (userData) {
            cart.addItem(data); 
        } else {
            toast((t) => (
                <span className="flex flex-col justify-center items-center gap-1">
                    <span>Para comprar voçê precisar estar logado!<br /></span>
                    <span>Deseja <b>Logar?</b></span>
                    <div className="flex items-center justify-center gap-x-5">
    
                        <button
                            onClick={() => {router.push("/login"); toast.dismiss(t.id)}}
                            className="text-green-600"
                        >
                            Sim
                        </button>
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="text-red-600"
                        >
                            Não
                        </button>
    
                    </div>
    
                </span>
            ));
        }
    }

    return(
        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image 
                    src={data?.images?.[0].url}
                    fill
                    alt="image"
                />
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton 
                            onClick={onPreview} 
                            icon={<Expand size={20} className="text-gray-600"/>}
                        />
                         <IconButton 
                            onClick={onAddToCart}
                            icon={<ShoppingCart size={20} className="text-gray-600"/>}
                        />
                    </div>
                </div>
            </div>

            <div>
                <p className="font-semibold text-lg">
                    {data.name}
                </p>
                <p className="text-sm text-gray-500">
                    {data.category?.name}
                </p>
            </div>

            <div className="flex items-center justify-between">
                <Currency value={data?.price} />
            </div>

        </div>
    );
}

export default ProductCard;