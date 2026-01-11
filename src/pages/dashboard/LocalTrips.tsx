import { Notice } from "@/components/NiceElements";
import Pagination from "@/components/Pagination";
import LocalTripCard from "@/components/trips/LocalTripCard";
import { useTranslations } from "@/hooks/useTranslations";
import { useState } from "react";
import { useSearchParams } from "react-router";

interface ILocalTrips {
  total_count: number,
  total_pages: number,
  local_trips: {
    id: string,
    title: string,
    people_count: number,
    people_breakeven: number,
    price: {
      adult: number,
      child: number,
      baby: number,
    },
    date: {
      from: string,
      to: string,
    }
  }[]
};

export default function LocalTrips() {
  const { t } = useTranslations('dashboard.localTrips');
  const [searchParams] = useSearchParams();
  const localTripsData: ILocalTrips = {
    total_count: 0, total_pages: 1, local_trips: []
  };
  const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams.get('page') as string) || 1);;
  const tripsPerPage = 10;
  const handlePagination = (page: number) => setCurrentPage(page);
  //  const handleRefresh = () => console.log('refresh');

  return (
    <div className="localTrips">
      <h1 className="text-2xl font-medium">{t('title')}</h1>
      {/* <SearchBar handleRefresh={handleRefresh} handlePagination={handlePagination} currentPage={currentPage} /> */}
      <div className={`local-trips grid grid-cols-1 ${localTripsData.local_trips.length > 0 && 'md:grid-cols-2'} rounded-xl py-4 gap-4`}>
        {localTripsData.local_trips.length === 0 ?
          <div className="w-full px-6 py-4 rounded-xl bg-subbackground">
            <Notice className="!text-lg text-center !text-simple">{t('noTrips')}</Notice>
          </div>
          : localTripsData.local_trips.map((trip, key) =>
            <LocalTripCard key={key} id={trip.id} title={trip.title} peopleCount={trip.people_count}
              peopleBreakeven={trip.people_breakeven} price={trip.price} date={trip.date} />
          )}
      </div>
      <Pagination currentPage={currentPage} totalCount={localTripsData.total_count} pageSize={tripsPerPage} onPageChange={page => handlePagination(page)} />
    </div>
  )
}