import Container from "@/components/elements/Container";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetBookByIdQuery, useUpdateBookMutation } from "@/redux/features/book/bookApi";
import { SelectTrigger } from "@radix-ui/react-select";
import { HeadProvider, Title } from "react-head";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { Slide, toast, ToastContainer } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const EditBook = () => {
    const [serverErr, setServerErr] = useState();
    const navigate = useNavigate();
    const notify = () => toast.success('Book Updated Successfully!', {
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

    // Getting the old data
    const { bookID } = useParams<{ bookID: string }>();
    const { data: book, isFetching, isLoading } = useGetBookByIdQuery(bookID!);
    const oldBookData = book?.data;


    // Updating new data on the server
    const [updateBook] = useUpdateBookMutation();

    // form schema with zod
    const addBookFormSchema = z.object({
        _id: z.string().optional(),
        title: z.string().regex(/[^\d]+/, "Book title cannot be only numbers"),
        author: z.string().regex(/[^\d]+/, "Author name cannot be only numbers"),
        genre: z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]),
        isbn: z.string().regex(/^\d{13}$/, "ISBN must be exactly 13 digits number"),
        description: z.string().optional(),
        copies: z.number().nonnegative(),
        available: z.boolean(),
    });

    const form = useForm<z.infer<typeof addBookFormSchema>>({
        resolver: zodResolver(addBookFormSchema)
    });


    // Placing default data
    useEffect(() => {
        if (oldBookData) {
            form.reset({
                ...oldBookData,
                isbn: oldBookData?.isbn + "",
                genre: oldBookData?.genre
            });
        }
    }, [oldBookData, form]);



    const onSubmit: SubmitHandler<z.infer<typeof addBookFormSchema>> = async (formData) => {
        const { _id, ...rest } = formData;
        void _id
        const updateData = {
            ...rest,
            isbn: +formData.isbn,
            available: true
        }
        try {
            await updateBook({ bookID: bookID!, updateData }).unwrap();
            notify();
            form.reset();
            setTimeout(() => {
                navigate("/books");
            }, 2500);
        } catch (err: any) {
            console.log(err);
            setServerErr(err?.data?.error[0]?.message);
        }
    }

    if (isFetching || isLoading) {
        return <div className="min-h-screen flex items-center justify-center"><p className="text-xl text-[#e92939]">Loading data...</p></div>
    }
    return (
        <HeadProvider>
            <Title>BookBase - Update Books</Title>
            <section className="min-h-screen flex items-center justify-center py-10">
                <Container>
                    <h2 className="text-3xl text-center pt-20 pb-8 underline underline-offset-8 decoration-[#e92939]">Update <span className="text-[#e92939]">Book</span></h2>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full bg-gray-500 p-12 rounded-sm">
                            <div className="flex items-center justify-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Book title" {...field} className="w-full bg-[#ded3ca] rounded-sm" />
                                            </FormControl>
                                            <FormMessage className="text-black" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="author"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Author</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Book author" {...field} className="w-full bg-[#ded3ca] rounded-sm" />
                                            </FormControl>
                                            <FormMessage className="text-black" />
                                        </FormItem>
                                    )}
                                />
                            </div>{/* first row */}

                            <div className="flex items-center justify-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="genre"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Genres</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    
                                                    <SelectTrigger className="border-1 py-1 bg-[#ded3ca] rounded-sm text-left ps-3 text-[14px]">
                                                        <SelectValue placeholder="Select book genre" />

                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="FICTION">FICTION</SelectItem> 
                                                            <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                                                            <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                                                            <SelectItem value="HISTORY">HISTORY</SelectItem>
                                                            <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                                                            <SelectItem value="FANTASY">FANTASY</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage className="text-black" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="isbn"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Isbn</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Book isbn number (E.g: 1234567891234)"
                                                    {...field}
                                                    className="bg-[#ded3ca] rounded-sm"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-black" />
                                        </FormItem>
                                    )}
                                />
                            </div>{/* second row */}

                            <div className="space-y-9">
                                <FormField
                                    control={form.control}
                                    name="copies"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Copies</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Book copies"
                                                    {...field}
                                                    min={0}
                                                    onChange={(e) => field.onChange(e.target.value === "" ? "" : +e.target.value)}
                                                    className="bg-[#ded3ca] rounded-sm"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-black" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Book description" {...field} className="h-40 bg-[#ded3ca] rounded-sm" />
                                            </FormControl>
                                            <FormMessage className="text-black" />
                                        </FormItem>
                                    )}
                                />
                            </div>{/* third row */}
                            <Button type="submit" className="bg-white text-black hover:bg-[#fff5e8] cursor-pointer">Update Book</Button>
                            {
                                serverErr && <p className="text-black">Validation failed: {serverErr}</p>
                            }
                        </form>
                    </Form>
                </Container>
            </section>
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
        </HeadProvider>
    );
};

export default EditBook;