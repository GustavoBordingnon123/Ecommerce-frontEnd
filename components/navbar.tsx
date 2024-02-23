import GetCategories from "@/actions/getCategories";
import Container from "@/components/ui/container";
import MainNavMobile from "@/components/ui/mainNavMobile";
import MainNav from "@/components/ui/mainNav";
import NavBarActions from "@/components/navBarActions";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import InputSearch from "./ui/InputSearch";

const Navbar = async() => {

    const categories = await GetCategories();

    return(
        <div className="border-b bg-[#19a7ce] shadow-sm fixed w-full z-10">
            <Container>
                <div className="relative md:px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                    <Link href='/' className="ml-2 md:ml-4 flex lg:ml-0 gap-x-2">
                        <p className="flex justify-center items-center font-bold text-md md:text-xl text-white gap-x-1">
                            <BookOpen size={32} />
                            BookStore
                        </p>
                    </Link>

                    <InputSearch />

                    <MainNavMobile data={categories} />

                    <div className="hidden lg:block">
                        <MainNav data={categories}/>   
                    </div>
                    
                    <NavBarActions />
                    
                </div>
            </Container>
        </div>
    );
}


export default Navbar;