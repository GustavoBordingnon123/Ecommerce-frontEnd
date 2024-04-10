"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import getUser from "@/actions/getUser";
import { toast } from "react-hot-toast";
import useSign from "@/hooks/useSign";

const SignIn = () => {
  const router = useRouter();
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const imageUrl = "/resources/images/bookGif.gif";
  const [email, setEmail] = useState("none");
  const [password, setPassword] = useState("none");
  const [isMounted, setIsMounted] = useState(false);
  const { isSignUp, toggleSign } = useSign();

  const handleButtonClick = () => {
      toggleSign();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await getUser(email);

      if (user.data !== null) {
        if (user.data.password !== password) {
          toast.error("Senha incorreta");
          return;
        } else {
          // Check if localStorage is available before using it
          if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(user.data));
            router.push("/");
            toast.success("Login foi realizado com sucesso");
            router.refresh();
          }
        }
      } else {
        toast.error("Email não encontrado");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-[#f5f5f5] h-full w-full rounded-br-md rounded-tr-md">
          <div className="h-full w-full flex items-center justify-center">
            <form className="my-8 flex flex-col items-center justify-center gap-y-5 w-[330px] md:w-full py-6">
              <p className="uppercase font-black border-b-2 border-blue-300 mb-3">
                Fazer login!
              </p>

              <div className="flex flex-col justify-center items-center gap-y-4">
                <Input
                  icon={<User size={20} />}
                //   label="Email:"
                  placeholder="digite seu email"
                  onChange={(e) => handleInputChange(e, setEmail)}
                />

                <Input
                  icon={<Lock size={20} />}
                //   label="Senha:"
                  placeholder="digite sua senha"
                  type="password"
                  onChange={(e) => handleInputChange(e, setPassword)}
                />

                <Button onClick={login}
                    className="w-40 h-10 flex items-center justify-center bg-[#19a7ce]"
                >
                    Entrar
                </Button>
                {isMobile && (
                    <div className="w-full text-center">
                      <p>Não possui uma conta?</p>
                      <p className="underline" onClick={handleButtonClick}>Clique aqui!</p>
                    </div>
                )}
              </div>
            </form>
          </div>
    </div>
  );
};

export default SignIn;
