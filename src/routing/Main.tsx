import MainLayout from "@/layouts/MainLayout";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import { Route, Routes } from "react-router";

export default function Main() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}