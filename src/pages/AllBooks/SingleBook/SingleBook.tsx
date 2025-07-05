import { Button } from "@/components/ui/button";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import type { IBorrow, IResBook } from "types";
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from "react-router";
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
import { useCreateBookBorrowMutation, useDeleteBookMutation } from "@/redux/features/book/bookApi";
import { endOfYear, startOfToday } from "date-fns";
import { Slide, ToastContainer, toast } from 'react-toastify';

interface IBookProp {
  book: IResBook;
  refetch: () => void
}


const SingleBook = ({ book, refetch }: IBookProp) => {
  const { _id, title, author, genre, isbn, copies, available } = book || {};
  const navigate = useNavigate();


  // Borrow book with dialog form
  const [createBookBorrow] = useCreateBookBorrowMutation();
  
  /* notify toast */
  const notify = () => toast.success('Book Borrowed Successfully!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
  });

  const [calenderOpen, setCalenderOpen] = useState(false);   /* Date calender */
  const [openDialog, setOpenDialog] = useState(false);      /* Dialog box  */
  const [availableError, setAvailableError] = useState();  /* Dialog box  */

  const form = useForm<IBorrow>();

  const onSubmit: SubmitHandler<IBorrow> = async (formData) => {
    const borrowData = {
      ...formData,
      bookID: _id
    }

    try {
      await createBookBorrow(borrowData).unwrap();
      refetch();
      setOpenDialog(false); /* Close Dialog box */
      notify();
      setTimeout(() => {
        navigate("/borrow-summary");
      }, 2500);
      form.reset();
    } catch (err: any) {
      console.log('err', err);
      setAvailableError(err?.data?.message)
    }
  }


  // Delete book with confirmation dialog 
  const [deleteBook] = useDeleteBookMutation();

  const handleBookDelete = () => {
    Swal.fire({
      title: "Are you sure you want to delete this book?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e92939",
      cancelButtonColor: "#6a7282",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBook(_id).unwrap()
          .then(res => {
            refetch();
            if (res) {
              Swal.fire({
                title: "Deleted!",
                text: `Book name "${title}" is deleted!`,
                icon: "success",
                confirmButtonColor: "#6a7282",
              });
            }
          })
      }
    });
  }

  return (
    <>
      <TableRow className="border-y-2 border-[#ded3ca] py-2">
        <NavLink to={`/books/${_id}`}><TableCell className="font-medium">{title}</TableCell></NavLink>
        <TableCell className="font-medium">{author}</TableCell>
        <TableCell className="font-medium">{genre}</TableCell>
        <TableCell className="font-medium">{isbn}</TableCell>
        <TableCell className="font-medium">{copies}</TableCell>
        <TableCell className="font-medium">{available ? "Available" : "Unavailable"}</TableCell>
        <TableCell className="font-medium text-right">
          <div className="space-x-3">
            <Button className="bg-[#ded3ca] text-black hover:text-white">
              <NavLink to={`/edit-book/${_id}`}>Edit Book</NavLink>
            </Button>
            <Button onClick={() => handleBookDelete()} className="text-[#e92939] bg-[#ded3ca] cursor-pointer">Delete Book</Button>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>

              <Form {...form}>

                <DialogTrigger asChild>
                  <Button variant="outline" className="cursor-pointer hover:bg-gray-500 hover:text-white">Borrow Book</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px] bg-[#ded3ca]">
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
                                  disabled={[
                                    { before: startOfToday() },
                                    { after: endOfYear(new Date()) },
                                  ]}
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
                              className="bg-white"
                            />
                          </FormControl>
                          {/* <FormMessage /> */}
                        </FormItem>
                      )}
                    /> {/* quantity [Number] */}
                    <Button type="submit" className="bg-gray-500 text-white">Borrow Book</Button>
                  </form>

                  {availableError && <p className="text-red-500">{availableError}</p>}
                </DialogContent>
              </Form>
            </Dialog>
          </div> {/* button's wrap */}
        </TableCell>
      </TableRow>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </>
  );
};

export default SingleBook;