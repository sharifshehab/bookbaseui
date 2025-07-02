// react icons
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { NavLink } from "react-router";

const Header = () => {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const menuItems =
                        <>
                            <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">home</li>
                            <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize"><NavLink to={'/books'}>All Books</NavLink></li>
                            <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">Add Book</li>
                            <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">Borrow Summary</li>
        </>;
    
    return (
        <header>
            <nav
                className="flex items-center justify-between w-full relative bg-red-300 px-[10px] py-[8px]">

                {/* logo */}
                <img src="https://i.ibb.co/0BZfPq6/darklogo.png" alt="logo" className="w-[55px] " />

                {/* nav links */}
                <ul className="items-center gap-[20px] text-[1rem] text-[#424242] md:flex hidden">
                        {menuItems}
                </ul>

                {/* action buttons */}
                <div className="items-center gap-[10px] flex">
                    <CiMenuFries
                        className="text-[1.8rem] dark:text-[#abc2d3] mr-1 text-[#424242]c cursor-pointer md:hidden flex"
                        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
                </div>

                {/* mobile sidebar */}
                <aside
                    className={` ${mobileSidebarOpen ? "translate-y-0 opacity-100 z-20" : "translate-y-[200px] opacity-0 z-[-1]"} md:hidden bg-white p-4 text-center absolute top-[65px] dark:bg-slate-700 right-0 w-full sm:w-[50%] rounded-md transition-all duration-300`}>
                    <ul className="items-center gap-[20px] text-[1rem] text-gray-600 flex flex-col">
                        {menuItems}
                    </ul>
                </aside>
            </nav>
        </header>
    );
};

export default Header;