'use client';

import {
  Bell,
  ChartColumn,
  CircleAlert,
  FileText,
  House,
  LogOut,
  MessageCircle,
  MessageSquare,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const navItem = [
    {
      icon: <House />,
      label: 'Dashboard',
      notificaciones: 0,
      href: '/dashboard',
    },
    {
      icon: <MessageSquare />,
      label: 'Solicitudes PQR/S',
      notificaciones: 3,
      href: '/dashboard/solicitudes',
    },
    {
      icon: <ChartColumn />,
      label: 'Analitica',
      notificaciones: 0,
      href: '/dashboard/analitica',
    },
    {
      icon: <FileText />,
      label: 'Reportes',
      notificaciones: 0,
      href: '/dashboard/reportes',
    },
    {
      icon: <MessageCircle />,
      label: 'Plantillas',
      notificaciones: 0,
      href: '/dashboard/plantillas',
    },
    {
      icon: <CircleAlert />,
      label: 'Alertas',
      notificaciones: 0,
      href: '/dashboard/alertas',
    },
    {
      icon: <Users />,
      label: 'Usuarios',
      notificaciones: 0,
      href: '/dashboard/usuarios',
    },
    {
      icon: <Settings />,
      label: 'Configuración',
      notificaciones: 0,
      href: '/dashboard/configuracion',
    },
  ];

  return (
    <Fragment>
      <header className="fixed top-0 justify-between flex flex-row left-0 right-0 p-4 px-8 h-20 border-b border-gray-200 shadow-sm">
        <div className="flex flex-col">
          <h1 className="text-blue-600 font-bold  text-3xl">FeedbackNet</h1>
          <p className="text-gray-500 ">Sistema de Gestion PQR/S</p>
        </div>
        <div className="flex flex-row gap-9 justify-center items-center">
          {/**todo: notificaciones */}
          <Bell className="text-gray-500" />
          <div className="flex flex-col items-center-last">
            <h3 className=" font-medium text-base">Administrador ISP</h3>
            <p className="text-gray-500">ISP Colombia SA</p>
          </div>
          <Settings className="text-gray-500" />
          <div className="flex flex-row items-center gap-2">
            <LogOut />
            <p>Salir</p>
          </div>
        </div>
      </header>

      <aside className="bg-blue-950 fixed top-20 inset-y-0 left-0 w-72 px-1.5 shadow-sm">
        {navItem.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <AsideButton
              key={index}
              Icon={item.icon}
              Text={item.label}
              notificaciones={item.notificaciones}
              href={item.href}
              isActive={isActive}
            />
          );
        })}
      </aside>
      <main className="fixed top-20 inset-y-0 left-72 right-0 p-8 overflow-y-auto">
        {children}
      </main>
    </Fragment>
  );
}

function AsideButton({ Icon, Text, notificaciones, href, isActive }) {
  return (
    <Link href={href}>
      <div
        className={`
          flex flex-row justify-between my-1.5 rounded-lg text-white items-center
          w-full p-4 px-5
          transition-all duration-300 ease-out
          ${
            isActive
              ? 'bg-blue-700 shadow-md'
              : 'bg-blue-950 hover:bg-blue-900 hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02]'
          }
        `}
      >
        <div className="flex flex-row gap-4 items-center">
          {Icon}
          <span>{Text}</span>
        </div>
        {notificaciones > 0 && (
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {notificaciones}
          </span>
        )}
      </div>
    </Link>
  );
}
