import Container from "@/components/elements/Container";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useAxios from "@/hooks/useAxios";
import { SelectTrigger } from "@radix-ui/react-select";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import type { IBook } from "types";

const AddBook = () => {
    const axiosPublic = useAxios();
    const navigate = useNavigate();

    const form = useForm<IBook>();

    const onSubmit: SubmitHandler<IBook> = async(formData) => {
        const data = {
            ...formData,
            available: true
        }

        try {
            await axiosPublic.post('/books/create-book', data);
            navigate("/books");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section>
        <Container>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="flex items-center justify-center gap-4">
                        <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Book title" {...field} className="w-full"/>
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
                                <Input type="text" placeholder="Book author" {...field} className="w-full"/>
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
                                        <SelectTrigger className="border-1 py-1 rounded-sm text-left ps-3 text-[14px]">
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
                                        {...field}
                                        // value={field.value}
                                        onChange={(e) => field.onChange(e.target.value === "" ? "" : +e.target.value)}
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
                                    <Textarea placeholder="Book description" {...field}  className="h-40"/>
                            </FormControl>
                            {/* <FormMessage /> */}
                            </FormItem>
                        )}
                        />
                    </div>{/* third row */}

                    <Button type="submit">Add Book</Button>
                </form>
            </Form>
        </Container>
    </section>
    );
};

export default AddBook;