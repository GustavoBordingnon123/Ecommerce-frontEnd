"use client"

import React from 'react';
import { Author, Publisher } from '@/types';
import Button from '@/components/ui/Button';
import { Plus, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import IconButton from '@/components/ui/iconButton';
import Filter from './filter';

interface MobileFiltersProps {
    authors: Author[];
    publishers: Publisher[];
    category?: string;
}


const MobileFilters:React.FC<MobileFiltersProps> = ({ authors,publishers, category }) => {

    const [open,setOpen] = React.useState(false);
    
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    return(
        <>
            <Button onClick={onOpen} className='flex items-center gap-x-2 lg:hidden'>
                Filters
                <Plus  size={20} />
            </Button>

            <Dialog open={open} as='div' className='relative z-40 lg:hidden' onClose={onClose}>
                
                <div className='fixed inset-0 bg-black bg-opacity-25'>

                    <div className='fixed inset-0 z-40 flex'>
                        <Dialog.Panel className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl'>

                            <div className='flex items-center justify-end px-4'>
                                <IconButton icon={<X size={15} />} onClick={onClose} />
                            </div>

                            <div className='p-4'>
                                <Filter
                                    valueKey="authorId"
                                    name="Authors"
                                    data={authors}
                                    category={category}
                                />
                                <Filter 
                                    valueKey="publisherId"
                                    name="Publishers"
                                    data={publishers}
                                    category={category}
                                />
                            </div>

                        </Dialog.Panel>
                    </div>

                </div>

            </Dialog>
        </>
    );
}

export default MobileFilters;