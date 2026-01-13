export const mobileNavMinimizer = () => {
    // hide sidebar on smaller displays - (smallWidth px)
    const screenWidth: number = window.innerWidth;
    const smallWidth: number = 768;
    if (screenWidth < smallWidth)
        minimizeNav();
}

/**
 * function that handles the minimizing process for the nav
 * basically minimizing header logo 'uTravel -> T', sidebar minimized (hidden in mobile),
 * mini-icon is the icon that minimizes the nav, it gets rotated with a nice transition
 */
export const minimizeNav = () => {
    const className = document.dir === 'ltr' ? '-rotate-180' : 'rotate-180';
    const miniIcon = document.querySelector('.minimizer-icon');
    const dashNav = document.querySelector('.dash-nav');
    const header = document.querySelector('header .logo');
    const mobileOutside = document.querySelector('.mobile-outside');

    miniIcon?.classList.toggle(className);
    dashNav?.classList.toggle('mini');
    header?.classList.toggle('mini');
    mobileOutside?.classList.toggle('active');
}

/**
 * An eventhandler for dropdown menu outer clicks
 */
export const handleHeaderDropdown = (e: React.MouseEvent) => {
    const menu = e.currentTarget.nextSibling as HTMLElement;
    if (menu.style.display === 'block')
        return;
    else
        menu.style.display = 'block';

    const handleClicks = (x: MouseEvent) => {
        if (x.target === e.target || !menu.contains(x.target as HTMLElement)) {
            setTimeout(() => menu.style.display = 'none', 25);
            document.removeEventListener('click', handleClicks, true);
        }
    }
    document.addEventListener('click', handleClicks, true);
}

export const showCalendar = (id: string) => {
    const calendar = document.querySelector(`.rdp-wrapper#${id}`) as HTMLDivElement;
    if (calendar?.classList.contains('flex'))
        return;
    else
        calendar?.classList.replace('hidden', 'flex');

    // clicking outside the calendar or its button would close calendar
    const clickHandler = (x: MouseEvent) => {
        if (calendar && !calendar?.contains(x.target as HTMLElement)) {
            setTimeout(() => { // prevent calendar from triggering once calendar button is clicked
                calendar?.classList.replace('flex', 'hidden');
            }, 50);
            document.removeEventListener('click', clickHandler, true);
        }
    }
    document.addEventListener('click', clickHandler, true);
}