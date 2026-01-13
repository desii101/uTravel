import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchBarProps {
    placeholder: string
};

export default function SearchBar({ placeholder }: SearchBarProps) {
    return (
        <div className="flex flex-col lg:flex-row gap-3">
            <div className="content-center relative block w-full lg:w-[300px]">
                <FontAwesomeIcon icon={faSearch} className="absolute top-[calc(50%-0.5em)] ltr:left-4 rtl:right-4 text-simple" />
                <input type="text" name="search" placeholder={placeholder} className="transition-all duration-200 py-2 ps-12 pe-6 rounded-lg bg-subbackground text-simple text-base font-light w-full ring-2 ring-transparent focus:outline-none hover:ring-primary-700 focus:ring-primary-600" />
            </div>
            <button className="font-medium bg-primary hover:bg-primary-600 text-white px-3 py-2 rounded-xl whitespace-nowrap max-lg:w-full" >
                <FontAwesomeIcon icon={faSearch} className="pe-2" />
                <span>{placeholder}</span>
            </button>
        </div>
    )
}