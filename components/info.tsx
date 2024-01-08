"use client"

import { ShoppingCart } from "lucide-react";

import { Product } from "@/types"
import Currency  from "@/components/ui/currency";
import { MouseEventHandler } from "react";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/useCart";
import { toast } from "react-hot-toast";


interface InfoProps {
    data: Product;
}

const Info :React.FC<InfoProps> = ({data}) => {

    const router = useRouter();

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

                <div className="flex flex-col md:flex-row lg:flex-row gap-x-5"> 

                    <div className="flex items-center gap-x-2">
                        <h3 className="font-semibold text-black">Autor(a):</h3>
                        <div>
                            {data?.author?.name}
                        </div>
                    </div>

                    <div className="flex items-center gap-x-2">
                        <h3 className="font-semibold text-black">Editora:</h3>
                        <div>
                            {data?.publisher.name}
                        </div>
                    </div>

                    <div className="flex items-center gap-x-2">
                        <h3 className="font-semibold text-black">Categoria:</h3>
                        <div>
                            {data?.category.name}
                        </div>
                    </div>

                </div>

                <div className="flex flex-col items-start gap-x-4">
                    <h3 className="font-semibold text-black">Descrição:</h3>
                    <div>
                        {data?.description}
                    </div>
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
}

export default Info;