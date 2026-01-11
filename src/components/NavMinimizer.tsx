import { useDirection } from "@/hooks/useDirection";
import { minimizeNav } from "@/utils/dashUtils";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function NavMinimizer({ title }: { title: string }) {
    const direction = useDirection();
    return (
        <span role="button" tabIndex={0} onClick={() => minimizeNav()} className={`hidden md:flex group-[.mini]:justify-center group-[.mini]:px-0 items-center gap-4 mt-14 px-3 h-10 rounded-xl text-gray-400 dark:text-white hover:text-primary hover:bg-primary/15 hover:cursor-pointer`}>
            <FontAwesomeIcon className="minimizer-icon transition duration-300" icon={direction === 'ltr' ? faChevronLeft : faChevronRight} size="lg" />
            <span className="text-lg font-normal group-[.mini]:hidden">{title}</span>
        </span>
    )
}

export { NavMinimizer };
