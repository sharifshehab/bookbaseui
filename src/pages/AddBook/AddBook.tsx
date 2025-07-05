import Container from "@/components/elements/Container";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBookMutation } from "@/redux/features/book/bookApi";
import { SelectTrigger } from "@radix-ui/react-select";
import { HeadProvider, Title } from "react-head";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { Slide, toast, ToastContainer } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const AddBook = () => {
    const [serverErr, setServerErr] = useState();
    const [createBook] = useCreateBookMutation();
    const navigate = useNavigate();
    const notify = () => toast.success('Book Added Successfully!', {
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

    // form schema with zod
    const addBookFormSchema = z.object({
        title: z.string().regex(/[^\d]+/, "Book title cannot be only numbers"),
        author: z.string().regex(/[^\d]+/, "Author name cannot be only numbers"),
        genre: z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]),
        isbn: z.string().regex(/^\d{13}$/, "ISBN must be exactly 13 digits number"),
        copies: z.number().nonnegative().min(1, { message: "Copies must be at least 1" }),
        description: z.string().optional(),
    });

    const form = useForm<z.infer<typeof addBookFormSchema>>({
        resolver: zodResolver(addBookFormSchema)
    });

    const onSubmit: SubmitHandler<z.infer<typeof addBookFormSchema>> = async (formData) => {
        const bookData = {
            ...formData,
            isbn: +formData.isbn,
            available: true
        }
        try {
            await createBook(bookData).unwrap();
            form.reset();
            notify();
            setTimeout(() => {
                navigate("/books");
            }, 2500);
        } catch (err: any) {
            console.log(err);
            setServerErr(err?.data?.error[0]?.message);
        }
    }

    return (
        <HeadProvider>
            <Title>BookBase - Add Books</Title>
            <section className="min-h-screen flex items-center justify-center py-10">
                <Container>
                    <h2 className="text-3xl text-center pt-20 pb-8 underline underline-offset-8 decoration-[#e92939]">Add <span className="text-[#e92939]">Book</span></h2>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full bg-gray-500 p-12 rounded-sm">
                            <div className="flex items-center justify-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel className="text-white">Title</FormLabel>
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
                                            <FormLabel className="text-white">Author</FormLabel>
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
                                            <FormLabel className="text-white">Genres</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger className="border-1 py-1.5 rounded-sm text-left ps-3 text-[14px] bg-[#ded3ca]">
                                                        <SelectValue placeholder="Select book genre" {...field} />
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
                                            <FormLabel className="text-white">Isbn</FormLabel>
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
                                            <FormLabel className="text-white">Copies</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Book copies"
                                                    {...field}
                                                    min={1}
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
                                            <FormLabel className="text-white">Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Book description" {...field} className="h-40 bg-[#ded3ca] rounded-sm" />
                                            </FormControl>
                                            <FormMessage className="text-black" />
                                        </FormItem>
                                    )}
                                />
                            </div>{/* third row */}
                            <Button type="submit" className="bg-white text-black hover:bg-[#fff5e8] cursor-pointer">Add Book</Button>
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

export default AddBook;