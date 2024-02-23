import getBillboard from "@/actions/getBillboard";
import getProducts from "@/actions/getProducts";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import ProductList from "@/components/productList";
import FilteredBooks from "@/components/filteredBooks";

export const revalidate = 0;

const HomePage = async() => {

    const allProducts = await getProducts({});
    const products = await getProducts({ isFeatured: true, count: 4 });
    const popularProducts = await getProducts({ count: 4, publisherId: 'c5bde29b-5cd7-41be-8430-89cccb6a799c' });
    const popularProducts2 = await getProducts({ count: 4, authorId: 'd3703245-90a5-4c2a-9d4c-18871e95def5' });
    const billboard = await getBillboard("dccb33e0-e524-4293-b96b-f5c2a6fd7d4d");
    const secondBillboard = await getBillboard("3acdf805-4eb0-4e64-8949-ebbce711bc51");

    return (
        <Container>
            <div className="space-y-10 pb-10">

                <FilteredBooks items={allProducts}/>

                <Billboard data={billboard} />
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                    <ProductList title="Livros recomendados" items={products} />
                </div>
                <Billboard data={secondBillboard} />
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                    <ProductList title="Popular entre jovens" items={popularProducts} />
                </div>
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                    <ProductList title="Autores famosos" items={popularProducts2} />
                </div>
            </div>
        </Container>
    );
}

export default HomePage;
