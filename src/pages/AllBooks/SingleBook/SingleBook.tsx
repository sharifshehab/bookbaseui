import { Button } from "@/components/ui/button";
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import useAxios from "@/hooks/useAxios";
import type { IBook, IBorrow } from "types";
import Swal from 'sweetalert2';
import { NavLink } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react";
import { useCreateBookBorrowMutation } from "@/redux/features/book/bookApi";

interface IBookProp{
  book: IBook;
  refetch: () => void
}
    
const SingleBook = ({ book, refetch }: IBookProp) => {
  const { _id, title, author, genre, isbn, copies, available } = book || {} 
  
  const axiosPublic = useAxios();

  // Borrow book with dialog form
  const [createBookBorrow] = useCreateBookBorrowMutation(); 

    const [calenderOpen, setCalenderOpen] = useState(false);   /* Date calender */
    const [openDialog, setOpenDialog] = useState(false);      /* Dialog box  */
    const [availableError, setAvailableError] = useState();  /* Dialog box  */
  
      const form = useForm<IBorrow>(); 
  
      const onSubmit: SubmitHandler<IBorrow> = async(formData) => {
          const borrowData = {
              ...formData,
            bookID: _id
        }
        
          try {
            await createBookBorrow(borrowData).unwrap();
            refetch();
            setOpenDialog(false); /* Close Dialog box */
            form.reset();
          } catch (err: any) {
            console.log('err', err);
            setAvailableError(err?.data?.message)
        }
      }
  
  
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

                  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    
                    <Form {...form}>

                      <DialogTrigger asChild>
                        <Button variant="outline">Borrow Book</Button>
                      </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px]">
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                              <FormField
                                  control={form.control}
                                  name="dueDate"
                                  render={({ field }) => (
                                      <FormItem className="flex-1">
                                      <FormLabel>Due Date</FormLabel>
                                      <FormControl>
                                          <Popover open={calenderOpen} onOpenChange={setCalenderOpen}>
                                            <PopoverTrigger asChild>
                                              <Button
                                                variant="outline"
                                                className="w-48 justify-between font-normal"
                                              >
                                                {field.value ? field.value.toLocaleDateString() : "Select date"}
                                                <ChevronDownIcon />
                                              </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                              <Calendar
                                                mode="single"
                                                selected={field.value}
                                                captionLayout="dropdown"
                                                onSelect={(date) => {
                                                  field.onChange(date)
                                                  setCalenderOpen(false)
                                                }}
                                                {...field}
                                              />
                                            </PopoverContent>
                                          </Popover>
                                      </FormControl>
                                      </FormItem>
                                  )}
                              /> {/* Due Date [Select Date] */}
                              
                              <FormField
                                  control={form.control}
                                  name="quantity"
                                  render={({ field }) => (
                                      <FormItem className="flex-1">
                                      <FormLabel>Quantity</FormLabel>
                                      <FormControl>
                                              <Input
                                                  type="number"
                                                  placeholder="Quantity"
                                                  {...field}
                                                  onChange={(e) => field.onChange(e.target.value === "" ? "" : +e.target.value)}
                                              />
                                      </FormControl>
                                      {/* <FormMessage /> */}
                                      </FormItem>
                                  )}
                              /> {/* quantity [Number] */}
                              <Button type="submit">Borrow Book</Button>
                  </form>
                  
                            {availableError && <p className="text-red-500">{availableError}</p>}
                      </DialogContent>
                    </Form>
                  </Dialog>
              </div> {/* button's wrap */}
            </TableCell>
        </TableRow>
    );
};

export default SingleBook;