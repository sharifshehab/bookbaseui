
import Root from "@/layout/Root";
import AddBook from "@/pages/AddBook/AddBook";
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
                path: "add-book",
                element: <AddBook></AddBook>
            }
        ]
    },
]);