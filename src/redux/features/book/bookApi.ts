import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBook, IBorrow } from "types";

interface ICommon{
    success: boolean;
    message: string;
}
interface IBookResponse extends ICommon{
    data: IBook[]
}
interface IBookByIdResponse extends ICommon{
    data: IBook
}
interface IDeleteResponse extends ICommon{
    data: null
}
interface IBorrowResponse extends ICommon{
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
    baseQuery: fetchBaseQuery({ baseUrl: 'https://new-book-base.vercel.app' }),
    tagTypes: ['book'],
    endpoints: (builder) => ({
        
        // Add book
        createBook: builder.mutation<IBookResponse,IBook>({
            query: (bookData) => ({
                url: '/books/create-book',
                method: 'POST',
                body: bookData,
                }),
        }),
        
        // Get all the books
        getAllBooks: builder.query<IBookResponse, void>({
            query: () => '/books/all-books',
            providesTags: ['book']
        }),

        // Get book by id
        getBookById: builder.query<IBookByIdResponse, string>({
            query: (bookID) => ({
                url: `/books/single-book/${bookID}`,
                method: 'GET'
                }),
        }),

        // Update book
        updateBook: builder.mutation<IBookByIdResponse, {bookID: string, updateData: Partial<IBook>}>({
            query: ({bookID, updateData}) => ({
                url: `/books/edit-book/${bookID}`,
                method: 'PATCH',
                body: updateData,
                }),
        }),

        // Delete book
        deleteBook: builder.mutation<IDeleteResponse, string>({
            query: (bookID) => ({
                url: `/books/delete-book/${bookID}`,
                method: 'DELETE',
                }),
            }),


        // Borrow books
        createBookBorrow: builder.mutation<IBorrowResponse, IBorrow>({
            query: (borrowData) => ({
                url: '/borrow/borrow-books',
                method: 'POST',
                body: borrowData,
                }),
        }),
                
        // Borrow summery
        getBorrowSummery: builder.query<IBookResponse, void>({
            query: () => '/borrow/borrowed-summary',
        })
    })

});
export const { useCreateBookMutation, useGetAllBooksQuery, useGetBookByIdQuery, useUpdateBookMutation, useDeleteBookMutation, useCreateBookBorrowMutation, useGetBorrowSummeryQuery } = bookApi

