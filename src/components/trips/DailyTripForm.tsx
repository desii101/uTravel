import { useTranslations } from "@/hooks/useTranslations";
import type { IDailyTripFetchedData } from "@/pages/dashboard/dailyTrips/Edit";
import { showCalendar } from "@/utils/dashUtils";
import { formatDT, isValidDate } from "@/utils/time";
import { validateSchemaField, ZodFlatMap, type FormValidationError } from "@/utils/zodUtils";
import { addDays } from "date-fns";
import { useState, type FormEvent } from "react";
import * as z from "zod";
import { ZodError } from "zod";
import { Calendar } from "../Calendar";
import { Button, Input, Label } from "../NiceElements";

interface DailyTripFormProps {
    purpose: 'create' | 'edit'
    tripFetchedData?: IDailyTripFetchedData,
    isLoading?: boolean
};

export default function DailyTripForm({ purpose, tripFetchedData }: DailyTripFormProps) {
    const { t } = useTranslations('dashboard.dailyTrips.form');
    const schema = z.object({
        title: z.string().min(3, t('errors.title')).max(64, t('errors.title')),
        ticket_price: z.number({ error: t('errors.ticket_price') }).min(1, t('errors.ticket_price')).max(10000, t('errors.ticket_price')),
        bus_cost: z.number({ error: t('errors.bus_cost') }).min(1, t('errors.bus_cost')).max(10000, t('errors.bus_cost')),
        trip_date: z.iso.date(t('errors.trip_date')),
    });
    const [tripData, setTripData] = useState(tripFetchedData ?? {
        title: "",
        ticket_price: 0,
        bus_cost: 0,
        trip_date: ""
    });
    const handleTripDate = (date: Date) => setTripData(prev => ({ ...prev, trip_date: formatDT(date.toISOString(), 'yyyy-MM-dd') }));
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
                        <Label>{t('trip_date')}</Label>
                        <Input type="text" name="to_date" className="cursor-pointer" readOnly
                            invalid={formErrors.trip_date && !validateSchemaField(schema, 'trip_date', tripData.trip_date)}
                            invalidMessage={formErrors.trip_date} value={isValidDate(tripData.trip_date) ? formatDT(tripData.trip_date, 'd/M/yyyy') : tripData.trip_date} onClick={() => showCalendar('trip_date')} />
                        <Calendar id='trip_date' mode="single" disabled={{ before: new Date(), after: addDays(new Date(), 90) }} handleDaySelect={handleTripDate} wrapperClassName="mt-2" />
                    </div>
                </div>
                <div className="w-full px-4">
                    <div className="mb-4">
                        <Label>{t('ticket_price')}</Label>
                        <Input type="number" inputMode="numeric" name="ticket_price" value={tripData.ticket_price?.toString()}
                            invalid={formErrors.ticket_price && !validateSchemaField(schema, 'ticket_price', tripData.ticket_price)}
                            invalidMessage={formErrors.ticket_price} onChange={e => setTripData(prev => ({ ...prev, ticket_price: parseInt(e.target.value) }))} />
                    </div>
                    <div className="mb-4">
                        <Label>{t('bus_cost')}</Label>
                        <Input type="number" inputMode="numeric" name="bus_cost" value={tripData.bus_cost?.toString()}
                            invalid={formErrors.bus_cost && !validateSchemaField(schema, 'bus_cost', tripData.bus_cost)}
                            invalidMessage={formErrors.bus_cost} onChange={e => setTripData(prev => ({ ...prev, bus_cost: parseInt(e.target.value) }))} />
                    </div>
                </div>
            </div>
            <div className="mx-4">
                <Button className="w-full md:w-auto">{purpose === 'create' ? t('createSubmit') : t('editSubmit')}</Button>
            </div>
        </form>
    </>)
}