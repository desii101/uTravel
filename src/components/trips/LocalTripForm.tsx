import { useTranslations } from "@/hooks/useTranslations";
import type { ILocalTripFetchedData } from "@/pages/dashboard/localTrips/Edit";
import { showCalendar } from "@/utils/dashUtils";
import { formatDT, isValidDate } from "@/utils/time";
import { validateSchemaField, ZodFlatMap, type FormValidationError } from "@/utils/zodUtils";
import { addDays, parseISO } from "date-fns";
import { useState, type FormEvent } from "react";
import * as z from "zod";
import { ZodError } from "zod";
import { Calendar } from "../Calendar";
import { Button, Input, Label } from "../NiceElements";

interface LocalTripFormProps {
    purpose: 'create' | 'edit'
    tripFetchedData?: ILocalTripFetchedData,
    isLoading?: boolean
};

export default function LocalTripForm({ purpose, tripFetchedData }: LocalTripFormProps) {
    const { t } = useTranslations('dashboard.localTrips.form');
    const schema = z.object({
        title: z.string().min(3, t('errors.title')).max(64, t('errors.title')),
        bus_cost: z.number({ error: t('errors.bus_cost') }).min(1, t('errors.bus_cost')).max(10000, t('errors.bus_cost')),
        adult_price: z.number({ error: t('errors.price') }).min(1, t('errors.price')).max(10000, t('errors.price')),
        child_price: z.number({ error: t('errors.price') }).min(1, t('errors.price')).max(10000, t('errors.price')),
        baby_price: z.number({ error: t('errors.price') }).min(1, t('errors.price')).max(10000, t('errors.price')),
        from_date: z.iso.date(t('errors.from_date')),
        to_date: z.iso.date(t('errors.to_date')),
    }).refine(s => parseISO(s.from_date) <= parseISO(s.to_date), {
        error: t('errors.toDateIsLess'),
        path: ["to_date"],
    });;;
    const [tripData, setTripData] = useState(tripFetchedData ?? {
        title: "",
        bus_cost: 0,
        adult_price: 0,
        child_price: 0,
        baby_price: 0,
        from_date: "",
        to_date: ""
    });
    const handleStartDate = (date: Date) => setTripData(prev => ({ ...prev, from_date: formatDT(date.toISOString(), 'yyyy-MM-dd') }));
    const handleEndDate = (date: Date) => setTripData(prev => ({ ...prev, to_date: formatDT(date.toISOString(), 'yyyy-MM-dd') }));
    const [formErrors, setFormErrors] = useState<FormValidationError>({});
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            schema.parse(tripData);
        } catch (error) {
            if (error instanceof ZodError)
                setFormErrors(ZodFlatMap(error));
        }
    }
    return (<>
        <h1 className="text-2xl font-medium pt-4 pb-2">{t(purpose === 'edit' ? 'editTitle' : 'createTitle')}</h1>
        <form onSubmit={handleSubmit} className="w-full py-4 shadow-md rounded-xl bg-gray-100 dark:bg-subbackground text-gray-700 dark:text-gray-400">
            <div className="flex flex-col md:flex-row ">
                <div className="w-full px-4">
                    <div className="mb-4">
                        <Label>{t('title')}</Label>
                        <Input type="text" name="title" onChange={e => setTripData(prev => ({ ...prev, title: e.target.value }))}
                            invalid={formErrors.title && !validateSchemaField(schema, 'title', tripData.title)}
                            invalidMessage={formErrors.title} value={tripData.title} />
                    </div>
                    <div className="w-full mb-4 relative">
                        <Label>{t('from_date')}</Label>
                        <Input type="text" name="from_date" className="cursor-pointer" readOnly
                            invalid={formErrors.from_date && !validateSchemaField(schema, 'from_date', tripData.from_date)}
                            invalidMessage={formErrors.from_date} value={isValidDate(tripData.from_date) ? formatDT(tripData.from_date, 'd/M/yyyy') : tripData.from_date} onClick={() => showCalendar('from_date')} />
                        <Calendar id='from_date' mode="single" disabled={{ before: new Date(), after: addDays(new Date(), 90) }} handleDaySelect={handleStartDate} wrapperClassName="mt-2" />
                    </div>
                    <div className="w-full mb-4 relative">
                        <Label>{t('to_date')}</Label>
                        <Input type="text" name="to_date" className="cursor-pointer" readOnly
                            invalid={formErrors.to_date && (!validateSchemaField(schema, 'to_date', tripData.to_date) || parseISO(tripData.from_date) > parseISO(tripData.to_date))}
                            invalidMessage={formErrors.to_date} value={isValidDate(tripData.to_date) ? formatDT(tripData.to_date, 'd/M/yyyy') : tripData.to_date} onClick={() => showCalendar('to_date')} />
                        <Calendar id='to_date' mode="single" disabled={{ before: new Date(), after: addDays(new Date(), 90) }} handleDaySelect={handleEndDate} wrapperClassName="mt-2" />
                    </div>
                </div>
                <div className="w-full px-4">
                    <div className="mb-4">
                        <Label>{t('bus_cost')}</Label>
                        <Input type="number" inputMode="numeric" name="bus_cost" value={tripData.bus_cost?.toString()}
                            invalid={formErrors.bus_cost && !validateSchemaField(schema, 'bus_cost', tripData.bus_cost)}
                            invalidMessage={formErrors.bus_cost} onChange={e => setTripData(prev => ({ ...prev, bus_cost: parseInt(e.target.value) }))} />
                    </div>
                    <div className="mb-4">
                        <Label>{t('price')}</Label>
                        <div className="prices flex gap-3">
                            <div>
                                <Label>{t('adult')}</Label>
                                <Input type="number" inputMode="numeric" name="adult_price" value={tripData.adult_price?.toString()}
                                    invalid={formErrors.adult_price && !validateSchemaField(schema, 'adult_price', tripData.adult_price)}
                                    invalidMessage={formErrors.adult_price} onChange={e => setTripData(prev => ({ ...prev, adult_price: parseInt(e.target.value) }))} />
                            </div>
                            <div>
                                <Label>{t('child')}</Label>
                                <Input type="number" inputMode="numeric" name="child_price" value={tripData.child_price?.toString()}
                                    invalid={formErrors.child_price && !validateSchemaField(schema, 'child_price', tripData.child_price)}
                                    invalidMessage={formErrors.child_price} onChange={e => setTripData(prev => ({ ...prev, child_price: parseInt(e.target.value) }))} />
                            </div>
                            <div>
                                <Label>{t('baby')}</Label>
                                <Input type="number" inputMode="numeric" name="baby_price" value={tripData.baby_price?.toString()}
                                    invalid={formErrors.baby_price && !validateSchemaField(schema, 'baby_price', tripData.baby_price)}
                                    invalidMessage={formErrors.baby_price} onChange={e => setTripData(prev => ({ ...prev, baby_price: parseInt(e.target.value) }))} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-4">
                <Button className="w-full md:w-auto">{purpose === 'create' ? t('createSubmit') : t('editSubmit')}</Button>
            </div>
        </form>
    </>)
}