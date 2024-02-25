import Container from "@/components/ui/container";
import FilteredContent from "@/components/FilteredContent";

export const revalidate = 0;

const HomePage = async() => {


    return (
        <Container>
            <FilteredContent />
        </Container>
    );
}

export default HomePage;
