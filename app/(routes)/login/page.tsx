"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/container";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import getUser from "@/actions/getUser";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();

  const imageUrl = "/resources/images/bookGif.gif";
  const [email, setEmail] = useState("none");
  const [password, setPassword] = useState("none");
  const [isMounted, setIsMounted] = useState(false);

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
    <div className="bg-[#f5f5f5] h-screen">
      <Container>
        <div className="flex flex-col md:flex-row lg:flex-row">
          <div className="hidden md:flex w-full flex-col h-screen justify-center items-center items-center">
            <p className="uppercase font-black text-xl">
              Os melhores livros é com a gente!
            </p>
            <Image
              width={350}
              height={350}
              src={imageUrl}
              alt="Product Image"
              className=""
            />
          </div>

          <div className="h-screen w-full flex items-center justify-center">
            <form className="border border-gray-300 my-8 flex flex-col items-center justify-center gap-y-5 py-5 w-[330px] md:w-full py-6">
              <p className="uppercase font-black border-b-2 border-blue-300 mb-3">
                Fazer login!
              </p>

              <div className="flex flex-col gap-y-8">
                <Input
                  icon={<User size={20} />}
                  label="Email:"
                  placeholder="digite seu email"
                  onChange={(e) => handleInputChange(e, setEmail)}
                />

                <Input
                  icon={<Lock size={20} />}
                  label="Senha:"
                  placeholder="digite sua senha"
                  type="password"
                  onChange={(e) => handleInputChange(e, setPassword)}
                />

                <Button onClick={login}>Entrar</Button>
              </div>

              <p className="text-sm">
                Novo na bookstore? &nbsp;
                <span
                  className="hover:underline cursor-pointer"
                  onClick={() => router.push("/register")}
                >
                  CADASTRE-SE
                </span>
              </p>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
