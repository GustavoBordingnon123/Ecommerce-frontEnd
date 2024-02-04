// Overlay.tsx
import React, { useState, useEffect } from 'react';
import useSign from '@/hooks/useSign';
import Button from '@/components/ui/Button';

const Overlay = () => {
  const [texts, setTexts] = useState(['']);
  const { isSignUp, toggleSign } = useSign();

  useEffect(() => {
    function setButtonTexts(isSignUp: boolean) {
      if (isSignUp) {
        setTexts([
          'Já possui alguma conta?',
          'Clique abaixo para poder logar no nosso site!',
          'Logar',
        ]);
      } else {
        setTexts([
          'É sua primeira vez acessando nosso site?',
          'Clique abaixo para criar uma conta e usar nossos serviços!',
          'registrar-se',
        ]);
      }
    }

    setButtonTexts(isSignUp);
  }, [isSignUp]);

  const handleButtonClick = () => {
    toggleSign();
  };

  return (
    <div className="h-full w-full">
      <div
        className="bg-gradient-to-r from-[#0f7f9e] to-[#3db8d7] bg-no-repeat bg-cover bg-center text-white relative 
        h-full w-full transform translate-x-0 transition-transform duration-600 ease-in-out flex justify-center items-center"
      >
        <div className="flex flex-col justify-center items-center gap-5 text-center">
          <h1 className="text-4xl">{texts[0]}</h1>

          <p className="text-[18px] max-w-xs">{texts[1]}</p>

          <Button
            className="w-50 h-10 flex items-center justify-center bg-transparent border border-white-500 border-solid p-4
             hover:bg-white hover:text-black transition-all duration-300 ease-in-out font-bold uppercase tracking-wider"
            onClick={handleButtonClick}
          >
            {texts[2]}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
