"use client"

import React from 'react';
import { Author, Publisher } from '@/types';
import Button from '@/components/ui/Button';
import { Menu, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import IconButton from '@/components/ui/iconButton';
import { usePathname } from 'next/navigation';
import { Category } from '@/types';

interface MainNavMobileProps {
    data:Category[],
}


const MainNavMobile:React.FC<MainNavMobileProps> = ({data}) => {

    const [open,setOpen] = React.useState(false);
    
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    const pathname = usePathname();

    const routes = data.map((route) => ({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`,
    }));

    return(
        <div className=''>
            <Button onClick={onOpen} className='flex items-center gap-x-1 lg:hidden text-sm bg-transparent'>
                Categorias
                <Menu  size={28} />
            </Button>

            <Dialog open={open} as='div' className='relative z-40 lg:hidden' onClose={onClose}>
                
                <div className='fixed inset-0 bg-black bg-opacity-25'>

                    <div className='fixed inset-0 z-40 flex'>
                        <Dialog.Panel className='relative flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl'>

                            <div className='flex items-center justify-end px-2'>
                                <IconButton icon={<X size={15} />} onClick={onClose} />
                            </div>

                            <nav
                                className='flex flex-col items-center space-y-4 px-4 mt-5'
                            >
                                {routes.map((route) => (
                                    <Link 
                                        key={route.href}
                                        href={route.href}
                                        className={cn(
                                            'text-lg font-medium trasition-colors hover:text-black border-b w-full',
                                            route.active ? 'text-blue-300' : 'text-black-300',
                                        )}
                                    >
                                        {route.label}
                                    </Link>
                                ))}
                            </nav>

                        </Dialog.Panel>
                    </div>

                </div>

            </Dialog>
        </div>
    );
}

export default MainNavMobile;