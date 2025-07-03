import Container from "@/components/elements/Container";
import { useGetAllBooksQuery } from "@/redux/features/book/bookApi";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import SingleBook from "./SingleBook/SingleBook";
import Banner from "./Banner/Banner";


const AllBooks = () => {
    const { data, refetch } = useGetAllBooksQuery(undefined, {
        refetchOnFocus: true,               
        refetchOnMountOrArgChange: true,     
        refetchOnReconnect: true, 
    });
    const allBooks = data?.data;

    return (
        <section>
            <Banner></Banner>
            <Container>
                <Table className="border-b-2 border-amber-400 py-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Genre</TableHead>
                            <TableHead>ISBN</TableHead>
                            <TableHead>Copies</TableHead>
                            <TableHead>Availability</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allBooks?.map(book => <SingleBook  key={book._id} book={book} refetch={refetch}></SingleBook>)}
                    </TableBody>
                </Table>
            </Container>
        </section>
    );
};

export default AllBooks;