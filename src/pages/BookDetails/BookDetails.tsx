import { useGetBookByIdQuery } from "@/redux/features/book/bookApi";
import { useParams } from "react-router";

const BookDetails = () => {
    const { bookID } = useParams<{bookID: string}>();
    const { data: bookDetails } = useGetBookByIdQuery(bookID!);
    console.log('details', bookDetails?.data);
    const { title, author, genre, description } = bookDetails?.data || {};

    return (
        <section className="min-h-screen flex items-center justify-center py-10 px-5">
 
        <div className="w-full md:w-[70%] bg-gray-500 rounded-sm ">
            <img
                src="https://images.unsplash.com/photo-1697029749544-ffa7f15f9dd0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-full h-64 object-cover"
            />
            <div className="flex flex-col justify-center items-center p-4 space-y-2">
                        <h2 className="font-semibold text-3xl text-[#ded3ca]">{title}</h2>
                        <div><h3 className="font-medium text-black">By: {author}</h3></div>
            </div>

            <p className="text-white p-4">{description}</p>

            <div className="flex items-center justify-between w-full p-4 ">
                <div className="flex flex-col items-center gap-4 ">
                    <div className="flex flex-row gap-2">
                        Genre: {genre}
                    </div>
                </div>
            </div>
        </div>

    </section>
    );
};

export default BookDetails;

/* 
{




    "copies": 10,
    "available": true,
    "createdAt": "2025-07-03T14:47:54.138Z",
    "updatedAt": "2025-07-03T14:48:00.322Z"
}
*/