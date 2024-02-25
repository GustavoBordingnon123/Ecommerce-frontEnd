import { CreditCard, DollarSign, Euro, Gem, IndianRupee, JapaneseYen, RussianRuble } from "lucide-react";
import Image from "next/image";

const Footer = () => {

    const imageUrl = "/resources/images/logo.png";

    // style={{backgroundImage: `url(${imageUrl})`}}
    
    return (
        <footer className="bg-white border-t shadow-sm">
            <div className="mx-auto py-10 bg-[#19a7ce] bg-contain flex flex-col gap-4">

                <div className="flex gap-56 items-center justify-center w-full">
                    
                    <div>

                        <p className="bold uppercase text-xl border-b border-white text-white pb-1">intitucional</p>
                        
                        <ul className="mt-3 text-white">
                            <li className="hover:opacity-80 cursor-pointer">Quem somos</li>
                            <li className="hover:opacity-80 cursor-pointer">Fale Conosco</li>
                            <li className="hover:opacity-80 cursor-pointer">Política de Privacidade</li>
                            <li className="hover:opacity-80 cursor-pointer">Cancelamento e Reembolso</li>
                        </ul>

                    </div>

                    <div className="flex flex-col items-center justify-center gap-x-16">
                        <Image
                            width={200}
                            height={200}
                            src={imageUrl}
                            alt="Logo Image"
                            className=""
                        />

                        <p className="text-xs text-white">
                            &copy; 2023 fake BookStore, Inc. all rights reserved.
                        </p>
                    </div>
                    

                    <div>

                        <p className="bold uppercase text-xl border-b border-white text-white pb-1">forma de pagamento</p>

                       <div className="flex gap-4 mt-3">
                            <CreditCard  size={32} color="white"/>
                            <Euro   size={32} color="white"/>
                            <DollarSign size={32}  color="white"/>
                            <RussianRuble size={32}  color="white"/>
                            <Gem  size={32} color="white"/>
                            <br />
                       </div>
                       <div className="flex gap-4 mt-1">
                            <IndianRupee size={32}  color="white"/>
                            <JapaneseYen size={32}  color="white"/>
                       </div>

                    </div>


                </div>

            </div>
        </footer>
    )
}

export default Footer;