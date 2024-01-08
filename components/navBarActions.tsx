"use client";

import Button from "@/components/ui/Button";
import useCart from "@/hooks/useCart";
import { ShoppingBag, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const NavBarActions = () => {
  const router = useRouter();
  const cart = useCart();
  const removeAll = useCart((state) => state.removeAll);
  
  const userData = typeof window !== 'undefined' ? localStorage.getItem('user') : null; 

  const [user, setUser] = useState("Faça seu login ou cadastre-se!");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const userData = localStorage.getItem('user');

    if (userData) {
      const user = JSON.parse(userData);
      setUser(`Olá, ${user.name}`);
    }
  }, [userData]);

  if (!isMounted) {
    return null;
  }


  const goToProfile = () => {
    if (userData) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  };

  const logOut = async () => {
    await localStorage.removeItem('user');
    setUser("Faça seu login ou cadastre-se!");
    removeAll();
    router.push('/login');
    toast.success('Logout foi realizado com sucesso');
  };

  const handleLogout = async () => {
    toast((t) => (
      <span>
        Tem certeza que deseja <b>sair?</b>
        <br />

        <div className="flex items-center justify-center gap-x-5 mt-1">
          <button
            onClick={() => { logOut(); toast.dismiss(t.id); }}
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
  };

  return (
    <div className='lg:ml-auto flex items-center gap-x-4'>
      <div className="flex justify-center items-center gap-1">
        <User
          size={32}
          color="white"
          className="border-2 border-white rounded-full cursor-pointer"
          onClick={goToProfile}
        />
        <p className="hidden md:block lg:block md:px-1 lg:px-1 text-sm text-white font-sm max-w-[150px]">
          <p onClick={goToProfile} className="cursor-pointer">{user}</p>
          {userData ? (
            <div className="flex items-center gap-x-1">
              <span
                className="text-sm text-white font-medium cursor-pointer hover:underline"
                onClick={goToProfile}
              >
                Minha conta
              </span>
              |
              <span
                className="text-sm text-white font-medium cursor-pointer hover:underline"
                onClick={handleLogout}
              >
                Sair
              </span>
            </div>
          ) : null}
        </p>
      </div>

      <Button
        className="flex items-centerrounded-full bg-transparent px-3 lg:px-4 py-2 border border-white border-2"
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
  );
};

export default NavBarActions;
