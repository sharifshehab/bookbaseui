import { useGetBorrowSummeryQuery } from "@/redux/features/book/bookApi";
import Container from "@/components/elements/Container";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import SingleSummary from "./SingleSummary/SingleSummary";
import { HeadProvider, Title } from "react-head";


const BorrowSummary = () => {
    const { data: BorrowSummary } = useGetBorrowSummeryQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    });
    const totalSummary = BorrowSummary?.data;

    return (
        <HeadProvider>
            <Title>BookBase - Borrow Summary</Title>
            <section className="pb-20 min-h-screen">
                <Container>
                    <h2 className="text-3xl text-center pt-20 pb-8 underline underline-offset-8 decoration-[#e92939]">Borrowed Books <span className="text-[#e92939]">Summary</span></h2>
                    <Table className="border-b-2 border-[#ded3ca]">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-[#e92939]">Book Title</TableHead>
                                <TableHead className="text-[#e92939]">ISBN</TableHead>
                                <TableHead className="text-[#e92939]">Total Quantity Borrowed</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {totalSummary?.map((summary, idx) => <SingleSummary key={idx} summary={summary}></SingleSummary>)}
                        </TableBody>
                    </Table>
                </Container>
            </section>
        </HeadProvider>
    );
};

export default BorrowSummary;