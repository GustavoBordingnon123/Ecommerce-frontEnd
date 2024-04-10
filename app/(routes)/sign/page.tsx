"use client";

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import SignUp from './components/signUp';
import SignIn from './components/signIn';
import Overlay from './components/overlay';
import useSign from '@/hooks/useSign';

const SignPage = () => {
  const { isSignUp } = useSign();
  const controlsOverlay = useAnimation();
  const controlsSign = useAnimation();

  useEffect(() => {
    function setButtonTexts(isSignUp: boolean) {
      if (typeof window !== 'undefined') {
        const isMobile = window.innerWidth <= 768; // Defina o breakpoint para dispositivos móveis

        if (!isMobile) {
          if (isSignUp) {
            // Reset para a posição original
            controlsOverlay.start({ x: 0 }, { duration: 0.8 });
            controlsSign.start({ x: 0 }, { duration: 0.8 });
          } else {
            // Movimenta para a esquerda ou direita
            controlsOverlay.start({ x: isSignUp ? '-100%' : '100%' }, { duration: 0.8 });
            controlsSign.start({ x: isSignUp ? '100%' : '-100%' }, { duration: 0.8 });
          }
        }
      }
    }

    setButtonTexts(isSignUp);
  }, [isSignUp, controlsOverlay]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div 
        className='h-auto md:h-[600px] w-[80%] md:w-[1000px] flex flex-col md:flex-row 
        shadow-2xl py-2 md:py-0 rounded-2xl md:rounded-none'
      >  
        {!isMobile && (
          <motion.div
            animate={controlsOverlay}
            className='w-full h-full'
          >
            <Overlay />
          </motion.div>
        )}

        <motion.div
          animate={controlsSign}
          className='w-full h-full'
        >
          {isSignUp ? <SignUp /> : <SignIn />}
        </motion.div>
      </div>
    </div>
  );
}

export default SignPage;
