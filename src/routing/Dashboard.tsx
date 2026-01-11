import DashboardLayout from "@/layouts/DashboardLayout";
import Clients from "@/pages/dashboard/Clients";
import DailyTrips from "@/pages/dashboard/DailyTrips";
import Index from "@/pages/dashboard/Index";
import LocalTrips from "@/pages/dashboard/LocalTrips";
import { Route, Routes } from "react-router";

export default function Dashboard() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Index />} />
        <Route path="dailyTrips" element={<DailyTrips />} />
        <Route path="localTrips" element={<LocalTrips />} />
        <Route path="clients" element={<Clients />} />
      </Route>
    </Routes>
  );
}