import Header from "@/components/Header";
import Nav from "@/components/Nav";
import { minimizeNav } from "@/utils/dashUtils";
import { Outlet } from "react-router";


export default function DashboardLayout() {
    return (
        <div className="dashboard flex flex-col min-h-screen">
            <Header />
            <div role="button" tabIndex={-1} onClick={() => minimizeNav()} className="mobile-outside active fixed hidden z-10 opacity-100 w-[200vh] h-[200vh] [&.active]:flex md:[&.active]:hidden bg-black/20"></div>
            <div className="flex flex-row flex-grow mt-[74px]">
                <Nav />
                <div className="peer-[.mini]:md:ms-[84px] md:ms-[220px] flex-1 py-5 px-4 transition-all duration-200">
                    <main className="text-simple mx-auto max-w-screen-xl w-full h-full">
                        <Outlet/>
                    </main>
                </div>
            </div>
        </div >
    );
}