import { TableCell, TableRow } from "@/components/ui/table";

// interface ISummaryProp{
//     summary: {
//         book:{
//             title: string;
//             isbn: string;
//         };
//         totalQuantity: number
//     }
// }
const SingleSummary = ({ summary }: {summary: any}) => {
    const { book, totalQuantity } = summary || {} 
    const { title, isbn } = book || {} 
    
    return (
        <TableRow className="border-y-2 border-[#ded3ca]">
            <TableCell className="font-medium">{title}</TableCell>
            <TableCell className="font-medium">{isbn}</TableCell>
            <TableCell className="font-medium">{totalQuantity}</TableCell>
        </TableRow>
    );
};

export default SingleSummary;

