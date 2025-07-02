import Footer from "@/pages/shared/Footer";
import Header from "@/pages/shared/Header";
import { Outlet } from "react-router";

const Root = () => {
    return (
        <>
            <Header></Header>
            <main>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Root;