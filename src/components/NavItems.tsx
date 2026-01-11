import { mobileNavMinimizer } from "@/utils/dashUtils"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { KeyboardEvent, MouseEvent, ReactNode } from "react"
import { Link, useLocation } from "react-router"

interface NavItemProps {
    href: string,
    icon: IconDefinition,
    title: string
};

export function NavItem({ href, icon, title }: NavItemProps) {
    const { pathname } = useLocation();
    const slices = 3;
    const pathCheck = pathname.split("/").slice(0, slices).join("/");
    const isActive = href === pathCheck;
    return (
        <Link onClick={mobileNavMinimizer} to={href} className={`flex group-[.mini]:justify-center group-[.mini]:px-0 items-center gap-4 mt-4 px-3 h-10 rounded-xl ${isActive ? 'bg-primary text-white' : 'text-gray-400 dark:text-white hover:text-primary hover:bg-primary/15'} hover:cursor-pointer`}>
            <FontAwesomeIcon icon={icon} size="lg" className="w-6" />
            <span className="text-lg font-normal text-nowrap group-[.mini]:hidden">{title}</span>
        </Link>
    )
}
interface NavDropdownItemProps {
    title: string,
    href: string
};

export function NavDropdownItem({ href, title }: NavDropdownItemProps) {
    const { pathname } = useLocation();
    const slices = 4;
    const pathCheck = pathname.split('/').slice(0, slices).join('/'); // resolves long paths to /{panel}/{navItem}
    const isActive: boolean = href === pathCheck;
    return (
        <Link onClick={mobileNavMinimizer} to={href} className={`nav-dropdown-item flex w-4/5 group-[.mini]:w-full items-center my-1 px-3 h-10 rounded-xl ${isActive ? 'active bg-primary text-white' : 'text-gray-400 dark:text-white hover:text-primary hover:bg-primary/15'} hover:cursor-pointer`}>
            <span className="text-base font-normal">{title}</span>
        </Link>
    )
}

interface NavDropdownProps {
    icon: IconDefinition,
    title: string,
    children: ReactNode
};

export function NavDropdown({ icon, title, children }: NavDropdownProps) {
    function foldDropdown(e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) {
        const dropdowns = document.querySelectorAll('nav .nav-dropdown');
        const navDiv = e.currentTarget.parentElement;
        dropdowns.forEach((d) => { // Close all open dropdowns except for selected dropdown
            if (d === navDiv)
                return;
            const chevron = d.querySelector('.chevron');
            const ul = d.querySelector('ul');
            chevron?.classList.replace('rotate-180', 'rotate-0');
            ul?.classList.replace('flex', 'hidden');
        });
        const chevron = navDiv?.querySelector('.chevron');
        const ul = navDiv?.querySelector('ul');
        const isOpen = chevron?.classList.contains('rotate-180');
        if (isOpen) {
            chevron?.classList.replace('rotate-180', 'rotate-0');
            ul?.classList.replace('flex', 'hidden');
        } else {
            chevron?.classList.replace('rotate-0', 'rotate-180');
            ul?.classList.replace('hidden', 'flex');
        }
    }
    return (
        <div className="nav-dropdown">
            <div onClick={(e) => foldDropdown(e)} className="flex group-[.mini]:justify-center group-[.mini]:px-0 items-center gap-4 mt-4 px-3 h-10 rounded-xl text-gray-400 dark:text-white hover:text-primary hover:bg-primary/15 hover:cursor-pointer"
                role="button" tabIndex={0}>
                <FontAwesomeIcon icon={icon} size="lg" className="w-6" />
                <span className="text-lg font-normal group-[.mini]:hidden">{title}</span>
                <FontAwesomeIcon icon={faChevronDown} size="xs" className="chevron absolute group-[.mini]:hidden ltr:right-8 rtl:left-8 transition-transform rotate-0" />
            </div>
            <ul className="nav-dropdown-items flex-col items-end hidden [&.flex]:mt-2 group-[.mini]:bg-subbackground group-[.mini]:ring-2 ring-gray-300 dark:ring-gray-600 rounded-xl group-[.mini]:fixed group-[.mini]:overflow-hidden group-[.mini]:px-2 group-[.mini]:py-1 group-[.mini]:me-2.5 group-[.mini]:mb-2.5 group-[.mini]:ms-20 group-[.mini]:min-w-fit">
                {children}
            </ul>
        </div>
    )
}