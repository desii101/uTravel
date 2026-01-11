import { minimizeNav } from "@/utils/dashUtils"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router"
import { HeaderUtilityButtons } from "./HeaderUtilityItems"

export default function Header() {
    return (
        <header className="bg-subbackground transition-all duration-200 border-b-2 md:border-b-0 border-b-gray-300 dark:border-b-gray-600 h-[74px] w-full text-lg flex justify-between fixed top-0 z-30">
            <div className="flex ps-3 sm:ps-6 gap-6 max-sm:gap-3 transition-all duration-200 items-center content-center text-3xl text-primary md:border-e-2 border-e-gray-300 dark:border-e-gray-600 md:min-w-[220px] md:flex md:has-[.mini]:min-w-[84px] md:has-[.mini]:justify-center md:has-[.mini]:ps-0">
                <FontAwesomeIcon onClick={() => minimizeNav()} icon={faBars} className="md:hidden flex cursor-pointer w-8 text-simple" />
                <Link to="/" className="logo group/logo">
                    <span className="min-w-20 font-medium block md:group-[.mini]/logo:hidden">uTravel</span>
                    <span className="min-w-12 font-medium hidden md:group-[.mini]/logo:block text-center">T</span>
                </Link>
            </div>
            <div className="flex justify-end w-full ps-2 pe-3 sm:pe-6 md:border-b-2 border-b-gray-300 dark:border-b-gray-600">
                <HeaderUtilityButtons />
            </div>
        </header>
    )
}