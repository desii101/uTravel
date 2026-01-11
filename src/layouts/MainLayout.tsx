import { Outlet } from 'react-router';

export default function MainLayout() {
  return (
    <div className="w-full h-screen flex flex-col justify-center text-center">
      <Outlet />
    </div>
  )
}