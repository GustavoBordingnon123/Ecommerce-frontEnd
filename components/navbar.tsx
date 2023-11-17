import GetCategories from "@/actions/getCategories";
import GetCategory from "@/actions/getCategories";
import Container from "@/components/ui/container";
import MainNav from "@/components/ui/mainNav";
import NavBarActions from "@/components/navBarActions";
import Link from "next/link";

const Navbar = async() => {

    const categories = await GetCategories();

    return(
        <div className="border-b">
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                    <Link href='/' className="ml-4 flex lg:ml-0 gap-x-2">
                        <p className="font-bold text-xl">
                            Store
                        </p>
                    </Link>
                    <MainNav data={categories}/>
                    <NavBarActions />
                </div>
            </Container>
        </div>
    );
}

export default Navbar;