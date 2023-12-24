import getCategory from "@/actions/getCategory";
import getColors from "@/actions/getColors";
import getProducts from "@/actions/getProducts";
import getSizes from "@/actions/getSizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import MobileFilters from "./components/mobileFilters";
import Filter from "./components/filter";
import NoResults from "@/components/ui/noResults";
import ProductCard from "@/components/ui/productCard";
import getAuthors from "@/actions/getColors";
import getPublishers from "@/actions/getSizes";

export const revalidate = 0;

interface CategoryPageProps {
    params: {
        categoryId: string;
    },
    searchParams: {
        authorId?: string;
        publisherId?: string;
    }
}

const CategoryPage: React.FC<CategoryPageProps> = async({params, searchParams}) => {
    

    const products = await getProducts({
        categoryId: params.categoryId,
        authorId: searchParams.authorId,
        publisherId: searchParams.publisherId
    })
    const authors = await getAuthors();
    const publishers = await getPublishers();
    const category = await getCategory(params.categoryId);

    return(
        <div className="bg-white">
            <Container>
                <Billboard 
                    data={category.billboard}
                />
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        
                        <MobileFilters authors={authors} publishers={publishers} />

                        <div className="hidden lg:block">
                            <Filter 
                                valueKey="publisherId"
                                name="Publishers"
                                data={publishers}
                            />
                              <Filter 
                                valueKey="authorId"
                                name="Authors"
                                data={authors}
                            />
                        </div>

                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {products.length === 0 && <NoResults />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {products.map((item) => (
                                    <ProductCard 
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </Container>
        </div>
    )
} 

export default CategoryPage;