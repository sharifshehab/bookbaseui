import Container from "@/components/elements/Container";
import { useGetAllBooksQuery } from "@/redux/features/book/bookApi";

const AllBooks = () => {
    const { data: allBooks } = useGetAllBooksQuery(undefined, {
        refetchOnFocus: true,               
        refetchOnMountOrArgChange: true,     
        refetchOnReconnect: true, 
    });

    console.log('redux data', allBooks?.data);
    
    return (
        <section>
            <Container><div>AllBooks</div></Container>
        </section>
    );
};

export default AllBooks;