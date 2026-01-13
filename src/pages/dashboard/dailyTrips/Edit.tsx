import DailyTripForm from "@/components/trips/DailyTripForm";

export interface IDailyTripFetchedData {
    title: string,
    ticket_price: number,
    bus_cost: number,
    trip_date: string
};

export default function DailyTripEdit() {
    const tripFetchedData: IDailyTripFetchedData = { bus_cost: 0, title: "", ticket_price: 0, trip_date: "" };
    return (
        <div className="dailytrip-edit">
            <DailyTripForm purpose="edit" tripFetchedData={tripFetchedData} />
        </div>
    )
}