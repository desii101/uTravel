import type { MultiSelectElement } from '@/components/NiceElements';
import {
    type FormatDistanceStrictUnit, addDays,
    eachDayOfInterval,
    format, formatDate,
    formatDistance,
    formatDistanceStrict,
    formatISO,
    isAfter,
    isDate,
    isEqual,
    isValid,
    parse,
    parseISO,
    startOfISOWeek
} from 'date-fns';
import { type Locale, ar, enUS, he } from 'date-fns/locale';

type dateLocales = 'en' | 'ar' | 'he';
const locales: Record<dateLocales, Locale> = {
    en: enUS,
    ar: ar,
    he: he,
};

const dateTimeISOMatcher = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])([T\s])([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](?:\.[0-9]{1,9})?(Z|[+-]([01][0-9]|2[0-3]):[0-5][0-9])/i;

/**
 * 
 * @param text - text that contains datetime in ISO format
 * @param format - format of datetime
 * @returns datetime in given format
 */
export const formatDateTimeInText = (text: string, format: string) => {
    return text.replace(dateTimeISOMatcher, (match) => formatDT(match, format));
}

/**
 * 
 * @param time - given in ISO format
 * @returns time from now. e.g. 10 days ago
 */
export const fromNow = (time: string): string => {
    const locale = locales[document.documentElement.lang as dateLocales];
    return formatDistance(parseISO(time), new Date(), { addSuffix: true, locale: locale });
}

/**
 * 
 * @param time - given in ISO format
 * @param format - format of date
 * @returns datetime in given format
 */
export const formatDT = (time: string, format: string): string => {
    const locale = locales[document.documentElement.lang as dateLocales];
    return formatDate(parseISO(time), format, { locale: locale })
};

/**
 * 
 * @param time - given in ISO format
 * @returns datetime in ISO format
 */
export const formatISODate = (time: string | Date): string => {
    const date = formatISO(time);
    return date.split('+')[0];
}

/**
 * 
 * @param time - given in ISO format
 * @returns time in formatted string
 */
export const formatTime = (time: string, schema: string): string => {
    const locale = locales[document.documentElement.lang as dateLocales];
    const date = parse(time, 'HH:mm', new Date());
    return format(date, schema, { locale: locale });
};


/**
 * 
 * @returns days of the week
 */
export const getWeekDays = (): MultiSelectElement[] => {
    const locale = locales[document.documentElement.lang as dateLocales];
    const today = startOfISOWeek(new Date());
    const daysOfWeek = eachDayOfInterval({ start: today, end: addDays(today, 6) });
    return daysOfWeek.map((day, i) => ({ id: i + 1, name: format(day, 'EEEE', { locale: locale }) }));
}

/**
 * 
 * @returns formatted minutes in provided unit
 */
export const getFormattedMinutes = (minutes: number, unit: FormatDistanceStrictUnit): string => {
    const locale = locales[document.documentElement.lang as dateLocales];
    const date = new Date(0, 0, 0, 0, 0, 0);
    const laterDate = new Date(0, 0, 0, 0, minutes, 0);
    return formatDistanceStrict(laterDate, date, { unit: unit, locale: locale });
}

/**
 * 
 * @returns true if time is after or equal comparedTime
 */
export const isAfterOrEqual = (time: string, comparedTime: string | Date) => {
    const parsedTime = parseISO(time);
    return isAfter(parsedTime, comparedTime) || isEqual(parsedTime, comparedTime)
}

/**
 * 
 * @returns true for valid date and false for invalid one
 */
export const isValidDate = (date: string) => {
    if (!isDate(parseISO(date)) || !isValid(parseISO(date))) {
        return false;
    }
    return true;
}

/**
 * 
 * @returns true for valid timezone and false for invalid one
 */
export const isValidTimeZone = (timezone: string): boolean => {
    return Intl.supportedValuesOf('timeZone').some(x => x === timezone);
}

/**
 * 
 * @returns list of timezones
 */
export const TimeZonesList = (): { key: string, value: string, offset: string }[] => {
    function parseOffset(offset: string) {
        const parts = offset.replace('GMT', '').split(':');
        const hours = parseInt(parts[0]) || 0;
        const minutes = parseInt(parts[1]) || 0;
        return hours * 60 + minutes;
    }
    const timeZonesList: { key: string, value: string, offset: string }[] = [];
    const locale = document.documentElement.lang;
    const date = new Date();
    const timeZones = Intl.supportedValuesOf('timeZone');
    timeZones.forEach(t => {
        const timezoneParts = new Intl.DateTimeFormat(locale, { timeZone: t, timeZoneName: 'long' }).formatToParts(date);
        const offsetParts = new Intl.DateTimeFormat('en', { timeZone: t, timeZoneName: 'longOffset' }).formatToParts(date);
        const timeZoneName = timezoneParts.find(part => part.type === 'timeZoneName')?.value;
        const offset = offsetParts.find(part => part.type === 'timeZoneName')?.value;
        timeZonesList.push({ key: timeZoneName as string, value: t, offset: offset as string });
    })
    return timeZonesList.sort((a, b) => parseOffset(a.offset) - parseOffset(b.offset));
}
