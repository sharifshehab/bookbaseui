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
import { HeadProvider, Title} from 'react-head';

const AllBooks = () => {
    const { data, refetch } = useGetAllBooksQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    });
    const allBooks = data?.data;

    return (
        <HeadProvider>
            <Title>BookBase - All Books</Title>
            <section className="pb-20 min-h-screen">
                <Banner></Banner>
                <Container>
                    <h2 className="text-3xl text-center pt-20 pb-8 underline underline-offset-8 decoration-[#e92939]">Discover Your <span className="text-[#e92939]">Next Book</span></h2>
                    <Table className="border-b-2 border-[#ded3ca]">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-[#e92939]">Title</TableHead>
                                <TableHead className="text-[#e92939]">Author</TableHead>
                                <TableHead className="text-[#e92939]">Genre</TableHead>
                                <TableHead className="text-[#e92939]">ISBN</TableHead>
                                <TableHead className="text-[#e92939]">Copies</TableHead>
                                <TableHead className="text-[#e92939]">Availability</TableHead>
                                <TableHead className="text-center text-[#e92939]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allBooks?.map(book => <SingleBook key={book._id} book={book} refetch={refetch}></SingleBook>)}
                        </TableBody>
                    </Table>
                </Container>
            </section>
        </HeadProvider>
    );
};

export default AllBooks;