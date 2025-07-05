// react icons
import Container from "@/components/elements/Container";
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { NavLink } from "react-router";

const Header = () => {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const menuItems =
        <>
            <li className="before:w-0 hover:before:w-full before:bg-[#e92939] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#e92939] transition-all duration-300 before:left-0 cursor-pointer capitalize"><NavLink to={'/books'} end>All Books</NavLink></li>
            <li className="before:w-0 hover:before:w-full before:bg-[#e92939] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#e92939] transition-all duration-300 before:left-0 cursor-pointer capitalize"><NavLink to={'/create-book'}>Add Book</NavLink></li>
            <li className="before:w-0 hover:before:w-full before:bg-[#e92939] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#e92939] transition-all duration-300 before:left-0 cursor-pointer capitalize"><NavLink to={'/borrow-summary'}>Borrow Summary</NavLink></li>
        </>;

    return (
        <header className="bg-[#DED3CA]">
            <Container>
                <nav
                    className="flex items-center justify-between w-full relative py-3">

                    {/* logo */}
                    <h2 className="text-2xl text-[#e92939] font-medium"><span className="text-gray-500 underline decoration-[#e92939]">Book</span>Base</h2>

                    {/* nav links */}
                    <ul className="items-center gap-8 text-gray-500 font-medium md:flex hidden">
                        {menuItems}
                    </ul>

                    {/* action buttons */}
                    <div className="items-center gap-[10px] flex">
                        <CiMenuFries
                            className="text-3xl mr-1 text-[#e92939] cursor-pointer md:hidden flex"
                            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
                    </div>

                    {/* mobile sidebar */}
                    <aside
                        className={` ${mobileSidebarOpen ? "translate-y-0 opacity-100 z-20" : "translate-y-[200px] opacity-0 z-[-1]"} md:hidden bg-[#eedfcc] p-4 text-center absolute top-14 right-0 w-full sm:w-[50%]  transition-all duration-300`}>
                        <ul className="items-center gap-[20px]  flex flex-col">
                            {menuItems}
                        </ul>
                    </aside>
                </nav>
            </Container>
        </header>
    );
};

export default Header;