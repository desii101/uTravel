import { useTheme } from "@/hooks/useTheme"
import { useTranslations } from "@/hooks/useTranslations"
import { handleHeaderDropdown } from "@/utils/dashUtils"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { faGlobe, faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { MouseEventHandler } from "react"
import LangSwitcher from "./LangSwitcher"

interface HeaderDropdownProps {
    title?: string,
    className?: string,
    children: Readonly<React.ReactNode>
}
interface AccountDropdownItemProps {
    icon: IconDefinition,
    title: string,
    onClick: MouseEventHandler<HTMLDivElement>
}

/**
 * A dropdown menu for a header icon
 * @param {string} title Name of dropdown menu
 * @param {string} className adds classes to dropdown
 * @param {React.ReactNode} children Dropdown items 
 */
export const HeaderDropdown = ({ title, className, children }: HeaderDropdownProps) => {
    return (<div className={`hidden top-[84px] ltr:left-4 rtl:right-4 ltr:md:left-[unset] rtl:md:right-[unset] ltr:right-4 rtl:left-4 absolute md:w-72 rounded-xl bg-subbackground text-gray-200 border-2 border-zinc-300 dark:border-[#323232] shadow-xl ${className ?? ''}`.trim()}>
        <h3 className="py-3 px-5 font-medium text-primary">{title}</h3>
        {children}
    </div>)
}


/**
 * Dropdown item for account dropdown
 * @param {IconDefinition} icon Icon for dropdown item
 * @param {string} title Title of the item
 * @param {string} onClick event triggered once clicked
 */
export const AccountDropdownItem = ({ icon, title, onClick }: AccountDropdownItemProps) => {

    return (<div role="button" tabIndex={0} onClick={onClick} className="block py-3 px-5 text-gray-400 dark:text-simple hover:text-primary hover:bg-primary/15 hover:cursor-pointer last:rounded-b-xl">
        <FontAwesomeIcon className="w-6 pe-4" icon={icon} />
        <span className="text-base font-light">{title}</span>
    </div>
    )
}

/**
 * Language Switch dropdown
 * @param {string} title Title of dropdown
 */
export const LangSwitch = ({ title }: { title: string }) => {
    return (<span>
        <FontAwesomeIcon onClick={(e) => handleHeaderDropdown(e)} className="text-gray-400 block text-center text-xl hover:cursor-pointer" icon={faGlobe} />
        <HeaderDropdown title={title} className="min-w-40 md:max-w-fit">
            <LangSwitcher />
        </HeaderDropdown>
    </span>
    )
}

/**
 * Theme Switch button
 */
export const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();
    const themeToggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');
    return (<span className="w-5 justify-items-center">
        <FontAwesomeIcon onClick={themeToggle} className="transition-colors duration-200 text-gray-400 block text-center text-xl hover:cursor-pointer dark:text-amber-400 rtl:-scale-x-100" icon={theme === 'dark' ? faMoon : faSun} />
    </span>)
}

export const HeaderUtilityButtons = () => {
    const { t } = useTranslations('dashboard.header');
    return (<div className="header-utility-buttons items-center flex gap-4 md:gap-6 ms-5">
        <ThemeSwitch />
        <LangSwitch title={t('language')} />
    </div>)
}