import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBook } from "types";

interface IBookResponse {
    success: boolean;
    message: string;
    data: IBook[]
}

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['book'],
    endpoints: (builder) => ( {
        getAllBooks: builder.query<IBookResponse, void>({
            query: () => '/books/all-books',
            providesTags: ['book']
        }),
    })

});
export const { useGetAllBooksQuery } = bookApi


