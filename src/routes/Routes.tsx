
import Root from "@/layout/Root";
import AddBook from "@/pages/AddBook/AddBook";
import AllBooks from "@/pages/AllBooks/AllBooks";
import BorrowSummary from "@/pages/BorrowSummary/BorrowSummary";
import EditBook from "@/pages/EditBook/EditBook";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        // errorElement: <Error></Error>
        children: [
            {
                index: true,
                element: <AllBooks/>
            },
            {
                path: "books",
                element: <AllBooks/>
            },
            {
                path: "create-book",
                element: <AddBook></AddBook>
            },
            {
                path: "edit-book/:bookID",
                element: <EditBook></EditBook>
            },
            {
                path: "borrow-summary",
                element: <BorrowSummary></BorrowSummary>
            }
        ]
    },
]);