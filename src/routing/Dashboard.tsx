import DashboardLayout from "@/layouts/DashboardLayout";
import Clients from "@/pages/dashboard/Clients";
import DailyTripsCreate from "@/pages/dashboard/dailyTrips/Create";
import DailyTripsEdit from "@/pages/dashboard/dailyTrips/Edit";
import DailyTrips from "@/pages/dashboard/dailyTrips/Index";
import Index from "@/pages/dashboard/Index";
import LocalTripsCreate from "@/pages/dashboard/localTrips/Create";
import LocalTripsEdit from "@/pages/dashboard/localTrips/Edit";
import LocalTrips from "@/pages/dashboard/localTrips/Index";
import { Route, Routes } from "react-router";

export default function Dashboard() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Index />} />
        <Route path="dailyTrips" element={<DailyTrips />} />
        <Route path="dailyTrips/create" element={<DailyTripsCreate />} />
        <Route path="dailyTrips/:id/edit" element={<DailyTripsEdit />} />
        <Route path="dailyTrips/:id/registeration" element={<DailyTrips />} />
        <Route path="localTrips" element={<LocalTrips />} />
        <Route path="localTrips/create" element={<LocalTripsCreate />} />
        <Route path="localTrips/:id/edit" element={<LocalTripsEdit />} />
        <Route path="localTrips/:id/registeration" element={<LocalTrips />} />
        <Route path="clients" element={<Clients />} />
      </Route>
    </Routes>
  );
}