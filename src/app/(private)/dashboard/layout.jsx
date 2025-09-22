import { Bell, LogOut, Settings } from 'lucide-react';

export default function DashboardLayout() {
  return (
    <header className="flex justify-between items-center-safe  px-6 py-6 ">
      <div className="flex flex-row items-center-safe gap-3">
        <h1 className="text-blue-600 font-bold  text-3xl">FeedbackNet</h1>
        <p className="text-gray-500 ">Sistema de Gestion PQR/S</p>
      </div>
      <Bell className="text-gray-500" />{' '}
      <div className="flex flex-col items-center-last">
        <h3 className=" font-medium text-base">Administrador ISP</h3>
        <p className="text-gray-500">ISP Colombia SA</p>
      </div>
      <Settings className="text-gray-500" />
      <LogOut />
      <p>Salir</p>
    </header>
  );
}
