import { Button } from "@/components/ui/button";
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import useAxios from "@/hooks/useAxios";
import type { IBook } from "types";
import Swal from 'sweetalert2';
import { NavLink } from "react-router";

interface IBookProp{
  book: IBook;
  refetch: () => void
}
    
const SingleBook = ({ book, refetch }: IBookProp) => {
    const { _id, title, author, genre, isbn, copies, available } = book || {}
    const axiosPublic = useAxios();

  
    // Delete book with confirmation dialog 
    const handleBookDelete = async() => {
        Swal.fire({
            title: "Are you sure you want to delete this book?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              axiosPublic.delete(`/books/delete-book/${_id}`)
                .then(res => {
                  refetch();
                  if (res) {
                    Swal.fire({
                      title: "Deleted!",
                      text: `Book name "${title}" is deleted!`,
                      icon: "success"
                    });
                  }
                })
              
            }
          });
    }

    return (
        <TableRow>
            <TableCell className="font-medium">{title}</TableCell>
            <TableCell className="font-medium">{author}</TableCell>
            <TableCell className="font-medium">{genre}</TableCell>
            <TableCell className="font-medium">{isbn}</TableCell>
            <TableCell className="font-medium">{copies}</TableCell>
            <TableCell className="font-medium">{available ? "Available": "Unavailable"}</TableCell>
            <TableCell className="font-medium text-right">
                <div className="space-x-3">
                    <Button>
                        <NavLink to={`/edit-book/${_id}`}>Edit Book</NavLink>
                    </Button>
                    <Button onClick={() => handleBookDelete()}>Delete Book</Button>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default SingleBook;