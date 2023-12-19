import getBillboard from "@/actions/getBillboard";
import getProducts from "@/actions/getProducts";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import ProductList from "@/components/productList";

// export const revalidate = 0;

const HomePage = async() => {

    const products = await getProducts({isFeatured: true});
    const billboard = await getBillboard("4fe16b35-9343-4b04-8b52-0d4a8121aeb3");

    return(
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard data={billboard} />

                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                    <ProductList title="Featured Products" items={products} />
                </div>
            </div>
        </Container>
    )
}

export default HomePage;