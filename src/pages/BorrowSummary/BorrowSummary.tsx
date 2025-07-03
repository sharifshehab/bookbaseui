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


const BorrowSummary = () => {
    const { data: BorrowSummary } = useGetBorrowSummeryQuery(undefined, {
        refetchOnFocus: true,               
        refetchOnMountOrArgChange: true,     
        refetchOnReconnect: true, 
    });
    const totalSummary = BorrowSummary?.data;
    console.log(totalSummary);

    return (
        <section>
        <Container>
            <Table className="border-b-2 border-amber-950 py-2">
                <TableHeader>
                    <TableRow>
                        <TableHead>Book Title</TableHead>
                        <TableHead>ISBN</TableHead>
                        <TableHead>Total Quantity Borrowed</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {totalSummary?.map((summary, idx) => <SingleSummary key={idx} summary={summary}></SingleSummary>)}
                </TableBody>
            </Table>
        </Container>
    </section>
    );
};

export default BorrowSummary;