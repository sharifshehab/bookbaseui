import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBook, IBorrow } from "types";

interface IBookResponse {
    success: boolean;
    message: string;
    data: IBook[]
}

interface IBorrowResponse {
    success: boolean;
    message: string;
    data: {
        _id: string;
        bookID: string;
        quantity: number;
        dueDate: string;
        createdAt: string;
        updatedAt: string;
    }
} 

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['book'],
    endpoints: (builder) => ({
        // Get all the books
        getAllBooks: builder.query<IBookResponse, void>({
            query: () => '/books/all-books',
            providesTags: ['book']
        }),

        createBookBorrow: builder.mutation<IBorrowResponse, IBorrow>({
            query: (borrowData) => ({
                url: '/borrow/borrow-books',
                method: 'POST',
                body: borrowData,
                }),
            })
    })

});
export const { useGetAllBooksQuery,  useCreateBookBorrowMutation } = bookApi


