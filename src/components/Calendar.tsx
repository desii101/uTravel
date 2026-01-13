import { useTranslations } from '@/hooks/useTranslations'
import {
    addDays,
    differenceInDays,
    endOfDay, endOfMonth, endOfYear,
    formatDate,
    isSameDay,
    isSameMonth,
    isSameWeek,
    parseISO,
    startOfDay,
    startOfMonth,
    startOfWeek,
    startOfYear,
    subDays
} from 'date-fns'
import { ar, enUS, he, type Locale } from 'date-fns/locale'
import type { TFunction } from 'i18next'
import { useEffect, useState } from "react"
import { type DateRange, DayPicker, getDefaultClassNames, type Matcher, type PropsBase } from "react-day-picker"
import "react-day-picker/style.css"

interface CalendarProps {
    id: string,
    mode: "single" | "range",
    defaultRange?: DateRange,
    handleDaySelect?: (date: Date) => void,
    handleRangeSelect?: (range: DateRange) => void,
    handleSelectedRangeText?: (text: string) => void,
    staticRanges?: boolean
    max?: number,
    wrapperClassName?: string,
    disabled?: Matcher | Matcher[]
};
type dateLocales = 'en' | 'ar' | 'he';
const locales: Record<dateLocales, Locale> = {
    en: enUS,
    ar: ar,
    he: he
};

// good luck with this function :D
const calculateRange = (range: DateRange, t: TFunction<"translation", string>): string => {
    const beginDate = range.from as Date;
    const endDate = range.to as Date;
    const allTimeBegin = '2024-01-01T00:00:00';
    const today = new Date();
    const formattedDate = `${formatDate(beginDate, 'dd/MM/yyyy')} - ${formatDate(endDate, 'dd/MM/yyyy')}`;
    let text = "";
    if (isSameDay(beginDate, allTimeBegin) && isSameDay(endDate, today))
        return t('allTime');
    if (isSameDay(beginDate, startOfYear(today)) && isSameDay(endDate, endOfYear(today)))
        return t('thisYear');
    const selectedDateDifference = differenceInDays(endDate, beginDate);
    switch (selectedDateDifference) {
        case 30:
        case 29:
            text = isSameMonth(endDate, today) ? t('thisMonth') : formattedDate;
            break;
        case 7:
        case 6:
            text = isSameWeek(endDate, today, { weekStartsOn: 1 }) ? t('thisWeek') : formattedDate;
            break;
        case 1:
        case 0:
            if (isSameDay(endDate, today))
                text = t('today');
            else if (isSameDay(subDays(today, 1), endDate))
                text = t('yesterday');
            else if (isSameDay(endDate, beginDate))
                text = formatDate(beginDate, 'dd/MM/yyyy');
            else
                text = formattedDate
            break;
        default:
            text = formattedDate;
            break;
    }
    return text;
};


export const Calendar = ({ id, mode, wrapperClassName, handleDaySelect, handleRangeSelect, handleSelectedRangeText, defaultRange, staticRanges, max, disabled }: CalendarProps) => {
    const { t } = useTranslations('calendar');
    const defaultClassNames = getDefaultClassNames();
    const locale = locales[document.documentElement.lang as dateLocales];
    const isRTL = [ar, he].includes(locale);
    const [selected, setSelected] = useState<Date | DateRange | undefined>(defaultRange ? defaultRange : undefined);
    const handleSelectSingle = (date: Date) => {
        if (handleDaySelect) handleDaySelect(date);
        setSelected(date);
    };
    const handleSelectRange = (range: DateRange) => {
        const rng = { from: range.from, to: range.to ? endOfDay(range.to) : range.to };
        if (handleRangeSelect) handleRangeSelect(rng);
        setSelected(rng);
        if (handleSelectedRangeText && (rng.from && rng.to)) handleSelectedRangeText(calculateRange(rng, t));
    }
    const classes: PropsBase['classNames'] = {
        root: `${defaultClassNames.root} ${staticRanges ? 'rounded-ee-xl md:rounded-se-xl max-md:rounded-es-xl' : 'rounded-xl'} py-5 px-2 md:px-5 bg-subbackground text-simple w-fit`,
        weekday: `${defaultClassNames.weekday}`,
        dropdown: `${defaultClassNames.dropdown} dark:bg-subbackground !cursor-pointer`,
        caption_label: `${defaultClassNames.caption_label} gap-0.5`
    };
    const wrapperClasses = `rdp-wrapper shadow-lg border-2 border-zinc-300 dark:border-[#323232] rounded-xl z-[9] w-fit absolute hidden flex-col md:flex-row ${wrapperClassName ?? ''}`.trim();
    useEffect(() => {
        if (defaultRange && handleSelectedRangeText)
            handleSelectedRangeText(calculateRange(selected as DateRange, t));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (<div id={id} className={wrapperClasses}>
        {mode === 'single' ? (
            <DayPicker mode={mode} disabled={disabled} captionLayout={'dropdown'} selected={selected as Date} onSelect={handleSelectSingle} classNames={classes} dir={isRTL ? 'rtl' : 'ltr'} locale={locale} required ISOWeek />
        ) : (
            <>
                {staticRanges && <div className="flex flex-col md:py-5 w-full md:w-32 rounded-s-xl max-md:rounded-se-xl max-md:rounded-es-none bg-subbackground max-md:border-b-2 md:border-e-2 border-background dark:border-[#323232]">
                    <button onClick={() => handleSelectRange({ from: startOfDay(new Date()), to: endOfDay(new Date()) })} className="h-10 ps-4 text-start text-simple hover:bg-gray-200 hover:dark:bg-zinc-700 max-md:rounded-t-xl">{t('today')}</button>
                    <button onClick={() => handleSelectRange({ from: startOfDay(subDays(new Date(), 1)), to: endOfDay(subDays(new Date(), 1)) })} className="h-10 ps-4 text-start text-simple hover:bg-gray-200 hover:dark:bg-zinc-700">{t('yesterday')}</button>
                    <button onClick={() => handleSelectRange({ from: startOfWeek(new Date(), { weekStartsOn: 1 }), to: endOfDay(addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 6)) })} className="h-10 ps-4 text-start text-simple hover:bg-gray-200 hover:dark:bg-zinc-700">{t('thisWeek')}</button>
                    <button onClick={() => handleSelectRange({ from: startOfMonth(new Date()), to: endOfMonth(new Date()) })} className="h-10 ps-4 text-start text-simple hover:bg-gray-200 hover:dark:bg-zinc-700">{t('thisMonth')}</button>
                    <button onClick={() => handleSelectRange({ from: startOfYear(new Date()), to: endOfYear(new Date()) })} className="h-10 ps-4 text-start text-simple hover:bg-gray-200 hover:dark:bg-zinc-700">{t('thisYear')}</button>
                    <button onClick={() => handleSelectRange({ from: parseISO('2026-01-01T00:00:00Z'), to: endOfDay(new Date()) })} className="h-10 ps-4 text-start text-simple hover:bg-gray-200 hover:dark:bg-zinc-700">{t('allTime')}</button>
                </div>}
                <DayPicker min={1} max={max} mode={mode} disabled={disabled} captionLayout={'dropdown'} selected={selected as DateRange} onSelect={handleSelectRange} classNames={classes} dir={isRTL ? 'rtl' : 'ltr'} locale={locale} required ISOWeek excludeDisabled />
            </>
        )} </div>
    );
}