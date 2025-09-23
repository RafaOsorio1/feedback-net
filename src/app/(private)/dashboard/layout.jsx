import {
  Bell,
  ChartColumn,
  CircleAlert,
  FileText,
  Home,
  House,
  LogOut,
  MessageCircle,
  MessageSquare,
  Settings,
  Users,
} from 'lucide-react';
import { Fragment } from 'react';

export default function DashboardLayout() {
  const navItem = [{ icon: <Home />, label: 'Dashboard', notificaciones: 0 }];
  return (
    <Fragment>
      <header className="flex justify-between items-center-safe  px-6 py-5 ">
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

      <aside className="bg-blue-950 fixed inset-y-0 left-0 w-64 top-12">
        <AsideButton Icon={<House />} Text={'Dashboard'} notificaciones={0} />

        <AsideButton
          Icon={<MessageSquare />}
          Text={'Solicitudes PQR/S'}
          notificaciones={3}
        />

        <AsideButton
          Icon={<ChartColumn />}
          Text={'Analitica'}
          notificaciones={0}
        />

        <AsideButton Icon={<FileText />} Text={'Reportes'} notificaciones={0} />

        <AsideButton
          Icon={<MessageCircle />}
          Text={'Plantillas'}
          notificaciones={0}
        />

        <AsideButton
          Icon={<CircleAlert />}
          Text={'Alertas'}
          notificaciones={0}
        />

        <AsideButton Icon={<Users />} Text={'Usuarios'} notificaciones={0} />

        <AsideButton
          Icon={<Settings />}
          Text={'Configuración'}
          notificaciones={0}
        />
      </aside>
    </Fragment>
  );
}

function AsideButton({ Icon, Text, notificaciones }) {
  return (
    <button className="flex flex-row justify-between items-center text-white bg-blue-950 w-full p-4 px-5 ">
      <div className="flex flex-row gap-4">
        {Icon}
        {Text}
      </div>
      {notificaciones}
    </button>
  );
}
