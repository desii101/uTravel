import { Notice } from "@/components/NiceElements";
import Pagination from "@/components/Pagination";
import LocalTripCard from "@/components/trips/LocalTripCard";
import SearchBar from "@/components/trips/SearchBar";
import { useTranslations } from "@/hooks/useTranslations";
import { faCirclePlus, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useSearchParams } from "react-router";

interface ILocalTrips {
  total_count: number;
  total_pages: number;
  local_trips: {
    id: string;
    title: string;
    people_count: number;
    people_breakeven: number;
    price: {
      adult: number;
      child: number;
      baby: number;
    };
    date: {
      from: string;
      to: string;
    };
  }[];
}

export default function LocalTrips() {
  const { t } = useTranslations("dashboard.localTrips");
  const [searchParams] = useSearchParams();
  const localTripsData: ILocalTrips = {
    // mock data
    total_count: 3,
    total_pages: 1,
    local_trips: [
      {
        id: "31333",
        title: "Eilat Trip",
        people_count: 74,
        people_breakeven: 35,
        price: { adult: 850, child: 550, baby: 100 },
        date: { from: "12/1/2026", to: "15/1/2026" },
      },
      {
        id: "12313",
        title: "Golan Trip",
        people_count: 62,
        people_breakeven: 62,
        price: { adult: 700, child: 450, baby: 100 },
        date: { from: "19/1/2026", to: "22/1/2026" },
      },
      {
        id: "21312",
        title: "Tibereas Trip",
        people_count: 15,
        people_breakeven: 40,
        price: { adult: 800, child: 500, baby: 100 },
        date: { from: "17/1/2026", to: "19/1/2026" },
      },
    ],
  };
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.get("page") as string) || 1,
  );
  const tripsPerPage = 10;
  const handlePagination = (page: number) => setCurrentPage(page);
  const handleRefresh = () => console.log("refresh");
  return (
    <div className="localTrips">
      <h1 className="text-2xl font-medium pt-3 pb-2">{t("title")}</h1>
      <div className="flex max-lg:flex-col justify-between">
        <SearchBar placeholder={t("search")} />
        <div className="max-lg:w-full max-lg:pt-3 flex gap-2">
          <span
            role="button"
            tabIndex={0}
            className="bg-primary hover:bg-primary-600 text-white text-center py-2 px-3 rounded-xl cursor-pointer max-lg:w-full"
            onClick={() => handleRefresh()}
          >
            <FontAwesomeIcon icon={faRotate} />
          </span>
          <Link to="create" className="w-full lg:w-auto">
            <button className="font-medium bg-primary hover:bg-primary-600 text-white px-3 py-2 rounded-xl whitespace-nowrap w-full">
              <FontAwesomeIcon icon={faCirclePlus} className="pe-2" />
              <span>{t("create")}</span>
            </button>
          </Link>
        </div>
      </div>
      <div
        className={`local-trips grid grid-cols-1 ${localTripsData.local_trips.length > 0 && "md:grid-cols-2"} rounded-xl py-4 gap-4`}
      >
        {localTripsData.local_trips.length === 0 ? (
          <div className="w-full px-6 py-4 rounded-xl bg-subbackground">
            <Notice className="!text-lg text-center !text-simple">
              {t("noTrips")}
            </Notice>
          </div>
        ) : (
          localTripsData.local_trips.map((trip, key) => (
            <LocalTripCard
              key={key}
              id={trip.id}
              title={trip.title}
              peopleCount={trip.people_count}
              peopleBreakeven={trip.people_breakeven}
              price={trip.price}
              date={trip.date}
            />
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={localTripsData.total_count}
        pageSize={tripsPerPage}
        onPageChange={(page) => handlePagination(page)}
      />
    </div>
  );
}
