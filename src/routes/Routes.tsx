
import Root from "@/layout/Root";
import AddBook from "@/pages/AddBook/AddBook";
import AllBooks from "@/pages/AllBooks/AllBooks";
import EditBook from "@/pages/EditBook/EditBook";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        // errorElement: <Error></Error>
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "books",
                element: <AllBooks/>
            },
            {
                path: "add-book",
                element: <AddBook></AddBook>
            },
            {
                path: "edit-book/:bookID",
                loader: async ({params})=> {
                    return fetch(`http://localhost:5000/books/single-book/${params.bookID}`);
               },
                element: <EditBook></EditBook>
            }
        ]
    },
]);