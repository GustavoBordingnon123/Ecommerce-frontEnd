"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Lock, PersonStanding, Phone, Shell, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";

import createUser from "@/actions/createUser";

export const revalidate = 0;

const RegisterPage = () => {

    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [errorName, setErrorName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorCPF, setErrorCPF] = useState("");
    const [errorPhone, setErrorPhone] = useState("");
    const [errorConfirmarSenha, setErrorConfirmarSenha] = useState("");


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
        setState(e.target.value);
    };

    const newUser = async (e: React.FormEvent) => {
        e.preventDefault();
      
        setErrorName("");
        setErrorEmail("");
        setErrorPassword("");
        setErrorCPF("");
        setErrorPhone("");
        setErrorConfirmarSenha("");
      
        const validateName = (name: string) => /^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(name);
        const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const validatePassword = (password: string) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
        const validateCPF = (cpf: string) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
        const validatePhone = (phone: string) => /^\d{2}-\d{9,10}$/.test(phone);
      
        let error = 0;
      
        if (!validateName(name)) {
          error = 1;
          setErrorName("Preencha corretamente o campo de nome");
        }
      
        if (!validateEmail(email)) {
          error = 1;
          setErrorEmail('Preencha corretamente o campo de e-mail');
        }
      
        if (!validatePassword(password)) {
          error = 1;
          setErrorPassword('A senha deve conter pelo menos uma letra e um número, com um comprimento mínimo de 8 caracteres');
        }
      
        if (!validateCPF(cpf)) {
          error = 1;
          setErrorCPF('Preencha corretamente o campo de CPF, exemplo: XXX.XXX.XXX-XX');
        }
      
        if (!validatePhone(phone)) {
          error = 1;
          setErrorPhone('Preencha corretamente o campo de telefone, exemplo: XX-XXXXXXXXX');
        }

        if(password != confirmarSenha) {
            error = 1;
            setErrorConfirmarSenha("As senhas não coincidem");
        }
      
        if (error === 1) {
          toast.error('Preencha corretamente os campos');
          return;
        }
      
        const data = {
          name,
          email,
          password,
          cpf,
          phone,
        };
      
        try {
          const response = await createUser(data);
          const responseBody = await response.data;
      
          console.log('Response Body:', responseBody);
      
          if (response.status === 200) {
            toast.success('Usuário foi criado com sucesso');
            router.push('/login');
          } else {
            switch (response.status) {
              case 400:
                setErrorName("Nome já está sendo usado");
                setErrorEmail("Email já está sendo usado");
                setErrorPhone("Telefone já está sendo usado");
                setErrorCPF("CPF já está sendo usado");
                break;
              default:
                toast.error("Erro ao criar usuário");
            }
          }
        } catch (error) {
          // Aqui, você pode tratar os erros específicos se necessário
          if (axios.isAxiosError(error)) {

            const axiosError = error as AxiosError;
            console.error("Erro ao processar resposta:", axiosError.response?.data);
            if (axiosError.response?.data == 'Name is already in use' ) {
                setErrorName("Nome já está sendo usado");
            }

            if(axiosError.response?.data == 'Email is already in use') {
                setErrorEmail("Email já está sendo usado");
            }

            if(axiosError.response?.data == 'CPF is already in use') {
                setErrorCPF("CPF já está sendo usado");
            }

            if(axiosError.response?.data == 'Phone is already in use') {
                setErrorPhone("Telefone já está sendo usado");
            }

          } else {
            console.error("Erro ao criar usuário:", error);
          }
          toast.error("Erro ao criar usuário");
        }
    };
    
    

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return(
        <div className="bg-white h-screen flex flex-col items-center justify-center">
            <Container>
               <div className="flex">

                    <div className="h-full w-full">
                        
                        <form className="border my-8 flex flex-col items-center justify-center gap-y-2 py-5 w-[350px] md:w-[800px]">
                            
                            <p className="uppercase font-black">criar conta</p>

                            <div className="flex flex-col gap-y-5">

                                <div>
                                    <Input icon={<User size={20} />} label="Email:" placeholder="digite seu email" onChange={(e) => handleInputChange(e, setEmail)}/>
                                    <p className="text-sm text-red-500 font-bold max-w-[300px]">{errorEmail}</p>
                                </div>

                                <div>
                                    <Input icon={<PersonStanding size={20} />} label="Nome:" placeholder="digite seu nome:" onChange={(e) => handleInputChange(e, setName)}/>
                                    <p className="text-sm text-red-500 font-bold max-w-[300px]">{errorName}</p>
                                </div>

                                <div>
                                    <Input icon={<Shell size={20} />} label="Cpf:" placeholder="digite seu cpf" onChange={(e) => handleInputChange(e, setCpf)}/>                                
                                    <p className="text-sm text-red-500 font-bold max-w-[300px]">{errorCPF}</p>
                                </div>
                                
                                <div>
                                    <Input icon={<Phone size={20} />} label="Telefone:" placeholder="digite seu telefone" onChange={(e) => handleInputChange(e, setPhone)}/>
                                    <p className="text-sm text-red-500 font-bold max-w-[300px]">{errorPhone}</p>
                                </div>

                                <div>
                                    <Input icon={<Lock size={20} />} label="Senha:" placeholder="digite sua senha" type="password" onChange={(e) => handleInputChange(e, setPassword)}/>
                                    <p className="text-sm text-red-500 font-bold max-w-[300px]">{errorPassword}</p>
                                </div>

                                <div>
                                    <Input icon={<Lock size={20} />} label="Confirmar senha:" placeholder="confirme sua senha" type="password" onChange={(e) => handleInputChange(e, setConfirmarSenha)}/>
                                    <p className="text-sm text-red-500 font-bold max-w-[300px]">{errorConfirmarSenha}</p>
                                </div>

                                <Button 
                                    className=""
                                    onClick={newUser}
                                >
                                    Criar conta
                                </Button>
                            </div>
                           

                            <p className="text-sm">
                                Já possui cadastro?  &nbsp; 
                                <span 
                                    className="hover:underline cursor-pointer"
                                    onClick={() => router.push('/login')}
                                > 
                                    Entrar
                                </span>
                            </p>

                        </form>

                    </div>

               </div>
            </Container>
        </div>
    )   
}

export default RegisterPage;