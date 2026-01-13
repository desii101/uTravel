import LocalTripForm from "@/components/trips/LocalTripForm";

export interface ILocalTripFetchedData {
    title: string,
    bus_cost: number,
    adult_price: number,
    child_price: number,
    baby_price: number,
    from_date: string,
    to_date: string
};

export default function LocalTripEdit() {
    const tripFetchedData: ILocalTripFetchedData = {
        title: "", bus_cost: 0, adult_price: 0, child_price: 0, baby_price: 0, from_date: "", to_date: ""
    };
    return (
        <div className="localtrip-edit">
            <LocalTripForm purpose="edit" tripFetchedData={tripFetchedData} />
        </div>
    )
}