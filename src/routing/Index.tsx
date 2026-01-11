import { useDirection } from "@/hooks/useDirection";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Dashboard";
import Main from "./Main";

export default function Routing() {
  const dir = useDirection();
  return (
    <>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
      <ToastContainer rtl={dir === 'rtl'} position={dir === 'rtl' ? 'top-left' : 'top-right'} />
    </>
  )
}