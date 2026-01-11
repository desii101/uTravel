import { Notice } from "@/components/NiceElements";
import Pagination from "@/components/Pagination";
import DailyTripCard from "@/components/trips/DailyTripCard";
import { useTranslations } from "@/hooks/useTranslations";
import { useState } from "react";
import { useSearchParams } from "react-router";

interface IDailyTrips {
  total_count: number,
  total_pages: number,
  daily_trips: {
    id: string,
    title: string,
    people_count: number,
    people_breakeven: number,
    price: number,
    trip_date: string,
  }[]
};

export default function DailyTrips() {
  const { t } = useTranslations('dashboard.dailyTrips');
  const [searchParams] = useSearchParams();
  const dailyTripsData: IDailyTrips = {
    total_count: 0, total_pages: 1, daily_trips: []
  };
  const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams.get('page') as string) || 1);;
  const tripsPerPage = 10;
  const handlePagination = (page: number) => setCurrentPage(page);
  //  const handleRefresh = () => console.log('refresh');

  return (
    <div className="dailyTrips">
      <h1 className="text-2xl font-medium">{t('title')}</h1>
      {/* <SearchBar handleRefresh={handleRefresh} handlePagination={handlePagination} currentPage={currentPage} /> */}
      <div className={`daily-trips grid grid-cols-1 ${dailyTripsData.daily_trips.length > 0 && 'md:grid-cols-2'} rounded-xl py-4 gap-4`}>
        {dailyTripsData.daily_trips.length === 0 ?
          <div className="w-full px-6 py-4 rounded-xl bg-subbackground">
            <Notice className="!text-lg text-center !text-simple">{t('noTrips')}</Notice>
          </div>
          : dailyTripsData.daily_trips.map((trip, key) =>
            <DailyTripCard key={key} id={trip.id} title={trip.title} peopleCount={trip.people_count}
              peopleBreakeven={trip.people_breakeven} price={trip.price} tripDate={trip.trip_date} />
          )}
      </div>
      <Pagination currentPage={currentPage} totalCount={dailyTripsData.total_count} pageSize={tripsPerPage} onPageChange={page => handlePagination(page)} />
    </div>
  )
}