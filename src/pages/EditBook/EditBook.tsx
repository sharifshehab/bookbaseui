import Container from "@/components/elements/Container";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetBookByIdQuery, useUpdateBookMutation } from "@/redux/features/book/bookApi";
import { SelectTrigger } from "@radix-ui/react-select";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {  useNavigate, useParams } from "react-router";
import type { IBook } from "types";

const EditBook = () => {
    const navigate = useNavigate();

    // Getting the old data
    const { bookID } = useParams<{bookID: string}>();
    const { data: book }= useGetBookByIdQuery(bookID!);

    const form = useForm<IBook>();

    // Placing default data
    useEffect(() => {
        if (book?.data) {
            form.reset(book?.data)
        }
    }, [book, form]);


    // Updating new data
    const [updateBook] = useUpdateBookMutation();

    const onSubmit: SubmitHandler<IBook> = async(formData) => {
        const { _id, createdAt, updatedAt, available, ...updateData } = formData;
        void _id; void createdAt; void updatedAt; void available;
        
        try {
            await updateBook({bookID: bookID!, updateData}).unwrap();
            navigate("/books");
            form.reset();
        } catch (err) {
            console.log(err);
        }
    }

    
    return (
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
                                    <Input type="text" placeholder="Book title" {...field} className="w-full bg-[#ded3ca] rounded-sm"/>
                                </FormControl>
                                {/* <FormMessage /> */}
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
                                    <Input type="text" placeholder="Book author" {...field} className="w-full bg-[#ded3ca] rounded-sm"/>
                                </FormControl>
                                {/* <FormMessage /> */}
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
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="border-1 py-1 bg-[#ded3ca] rounded-sm text-left ps-3 text-[14px]">
                                                <SelectValue placeholder="Select book genre" {...field}/>
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
                                {/* <FormMessage /> */}
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
                                            placeholder="Book isbn number"
                                            {...field}
                                            className="bg-[#ded3ca] rounded-sm"
                                        />
                                </FormControl>
                                {/* <FormMessage /> */}
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
                                            // {...field}
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value === "" ? "" : +e.target.value)}
                                            className="bg-[#ded3ca] rounded-sm"
                                        />
                                </FormControl>
                                {/* <FormMessage /> */}
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
                                        <Textarea placeholder="Book description" {...field}  className="h-40 bg-[#ded3ca] rounded-sm"/>
                                </FormControl>
                                {/* <FormMessage /> */}
                                </FormItem>
                            )}
                            />
                        </div>{/* third row */}

                        <Button type="submit" className="bg-white text-black hover:bg-[#fff5e8]">Update Book</Button>
                    </form>
                </Form>
            </Container>
        </section>
    );
};

export default EditBook;