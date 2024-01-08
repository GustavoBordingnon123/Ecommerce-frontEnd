"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Lock, PersonStanding, Phone, Shell, Trash2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";

import updateUser from "@/actions/updateUser";
import deleteUser from "@/actions/deleteUser";

export const revalidate = 0;

const ProfilePage = () => {

    const router = useRouter();


    const [isMounted, setIsMounted] = useState(false);

    const userData = localStorage.getItem('user');

    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState('');
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarSenha, setConfirmPassword] = useState("");

    const [errorName, setErrorName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorCPF, setErrorCPF] = useState("");
    const [errorPhone, setErrorPhone] = useState("");
    const [errorConfirmarSenha, setErrorConfirmarSenha] = useState("");


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
        setState(e.target.value);
    };
    
    const deleteFunction = async () => {
      await deleteUser(userId);
      localStorage.removeItem('user');
      router.push("/login");
      toast.success("Usuário excluido com sucesso");
      router.refresh();
    }

    const confirmDelete = async (e: React.FormEvent) => {
      e.preventDefault();

      toast((t) => (
        <span>
          Tem certeza que deseja <b>excluir usuario?</b>
          <br />
  
          <div className="flex items-center justify-center gap-x-5 mt-1">
  
            <button 
              onClick={() => {deleteFunction(); toast.dismiss(t.id);}}
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
    
    const newDataUser = async (e: React.FormEvent) => {
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
        setErrorCPF('Preencha corretamente o campo de CPF, exemplo: 111.111.111-11');
      }
    
      if (!validatePhone(phone)) {
        error = 1;
        setErrorPhone('Preencha corretamente o campo de telefone, exemplo: 11-111111111');
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
        const response = await updateUser(data, userId)
        const responseBody = await response.data;
    
        console.log('Response Body:', responseBody);
    
        if (response.status === 200) {
          
          try {
            const response = await updateUser(data, userId);
            const responseBody = await response.data;
          
            if (response.status === 200) {
              // Atualizar o localStorage após a atualização bem-sucedida
              const userData = JSON.parse(localStorage.getItem('user') || '{}');
              const updatedUserData = { ...userData, ...data };
              localStorage.setItem('user', JSON.stringify(updatedUserData));
          
              toast.success('Usuário foi atualizado com sucesso');
              router.refresh();
            } else {
              toast.error("Erro ao atualizar usuário");
            }
          } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            toast.error("Erro ao atualizar usuário");
          }

        } else {
          toast.error("Erro ao atualizar usuário");
        }
      } catch (error) {
        // Aqui, você pode tratar os erros específicos se necessário
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.error("Erro ao processar resposta:", axiosError.response?.data);
        } else {
          console.error("Erro ao atualizar usuário:", error);
        }
        toast.error("Erro ao atualizar usuário");
      }
    };

    useEffect(() => {
        setIsMounted(true);
        if(userData != null){
          const user = JSON.parse(userData);
          if(user){
            setUserId(user.id);
            setName(user.name);
            setEmail(user.email);
            setCpf(user.cpf);
            setPhone(user.phone);
          }
        }
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
                            
                            <div className="w-full pr-5">
                                <Trash2 onClick={confirmDelete} size={28} color="red" className="cursor-pointer ml-auto" />
                            </div>

                            <p className="uppercase font-black">Atualize sua conta</p>
                              
                            <div className="flex flex-col gap-y-5">

                                <div>
                                    <Input 
                                      icon={<User size={20} />} 
                                      label="Email:" 
                                      value={email} 
                                      placeholder="digite seu email" 
                                      onChange={(e) => handleInputChange(e, setEmail)}
                                    />
                                    <p className="text-sm text-red-500 font-bold max-w-[300px]">{errorEmail}</p>
                                </div>

                                <div>
                                    <Input 
                                      icon={<PersonStanding size={20} />} 
                                      label="Nome:" 
                                      value={name} 
                                      placeholder="digite seu nome:" 
                                      onChange={(e) => handleInputChange(e, setName)}
                                    />
                                    <p className="text-sm text-red-500 font-bold max-w-[300px]">{errorName}</p>
                                </div>

                                <div>
                                    <Input 
                                      icon={<Shell size={20} />} 
                                      label="Cpf:" 
                                      value={cpf}
                                      placeholder="digite seu cpf" 
                                      onChange={(e) => handleInputChange(e, setCpf)}
                                    />                                
                                    <p className="text-sm text-red-500 font-bold max-w-[300px]">{errorCPF}</p>
                                </div>
                                
                                <div>
                                    <Input 
                                      icon={<Phone size={20} />} 
                                      label="Telefone:" 
                                      value={phone}
                                      placeholder="digite seu telefone" 
                                      onChange={(e) => handleInputChange(e, setPhone)}
                                    />
                                    <p className="text-sm text-red-500 font-bold max-w-[300px]">{errorPhone}</p>
                                </div>

                                <div>
                                    <Input 
                                      icon={<Lock size={20} />} 
                                      label="Senha:" 
                                      placeholder="digite sua senha" 
                                      type="password" 
                                      onChange={(e) => handleInputChange(e, setPassword)}
                                    />
                                    <p className="text-sm text-red-500 font-bold max-w-[300px]">{errorPassword}</p>
                                </div>

                                <div>
                                    <Input 
                                      icon={<Lock size={20} />} 
                                      label="Confirmar senha:" 
                                      placeholder="confirme sua senha" 
                                      type="password" 
                                      onChange={(e) => handleInputChange(e, setConfirmPassword)}
                                    />
                                    <p className="text-sm text-red-500 font-bold max-w-[300px]">{errorConfirmarSenha}</p>
                                </div>

                                <Button 
                                    className=""
                                    onClick={newDataUser}
                                >
                                    Salvar
                                </Button>
                            </div>

                        </form>

                    </div>

               </div>
            </Container>
        </div>
    )   
}

export default ProfilePage;