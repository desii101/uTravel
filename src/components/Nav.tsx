import { useTranslations } from "@/hooks/useTranslations"
import { mobileNavMinimizer } from "@/utils/dashUtils"
import { faBusSide, faDesktop, faUmbrellaBeach, faUsers } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"
import { NavItem } from "./NavItems"
import { NavMinimizer } from "./NavMinimizer"

const navDropdownCheck = () => {
    const dropdown = document.querySelector('nav .nav-dropdown .nav-dropdown-item.active')?.parentElement?.parentElement;
    if (dropdown) {
        const chevron = dropdown?.querySelector('.chevron');
        const ul = dropdown?.querySelector('ul');
        chevron?.classList.replace('rotate-0', 'rotate-180');
        ul?.classList.replace('hidden', 'flex');
    }
}

export default function Nav() {
    const { t } = useTranslations('dashboard.nav');
    useEffect(() => {
        navDropdownCheck();
        mobileNavMinimizer();
    }, []);
    return (
        <nav className="dash-nav select-none group peer transition-all duration-200 px-5 py-3 z-20 [&.mini]:w-[84px] w-[220px] ltr:[&.mini]:-translate-x-full ltr:md:[&.mini]:transform-none rtl:[&.mini]:translate-x-full rtl:md:[&.mini]:transform-none h-full bottom-0 pt-[86px] overflow-y-auto overflow-x-hidden fixed bg-subbackground md:border-e-2 border-e-gray-300 dark:border-e-gray-600">
            <div className="dashboard-nav mt-6">
                <NavItem href="/dashboard" icon={faDesktop} title={t('overview')} />
                <NavItem href="/dashboard/dailyTrips" icon={faBusSide} title={t('dailyTrips')} />
                <NavItem href="/dashboard/localTrips" icon={faUmbrellaBeach} title={t('localTrips')} />
                <NavItem href="/dashboard/clients" icon={faUsers} title={t('clients')} />
            </div>
            <NavMinimizer title={t('minimize')} />
        </nav>
    )
}