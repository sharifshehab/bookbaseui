export interface IBook {
    title: string;
    author: string;
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
    isbn: number;
    description?: string;
    copies: number;
    available: boolean;
}
export interface IResBook {
    _id: string;
    title: string;
    author: string;
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
    isbn: number;
    description?: string;
    copies: number;
    available: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface IBorrow {
    bookID: string;
    quantity: number;
    dueDate: Date,
}

