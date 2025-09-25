import { ChartColumnIncreasing, Clock, Plus, TrendingUp } from 'lucide-react';
import { Fragment } from 'react';
import { CustomButton } from '../../components/trackerForm';
import { Pqrs } from './components/RecentActivity';
import { StatsSection } from './components/statsSection';

export default function DashboardPage() {
  return (
    <Fragment>
      <header className="flex flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard - ISP Colombia SA</h1>
        <CustomButton
          size="3"
          radius="large"
          Icon={<Plus />}
          text="Nueva Solicitud"
        />
      </header>
      <StatsSection />
      <section className="grid grid-cols-12 gap-4">
        <section className="col-span-8">
          <div className="mt-4 border border-gray-200 rounded-2xl shadow-sm">
            <header className="flex flex-row items-center gap-4 w-full border-b border-gray-200 p-4">
              <Clock className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold">Actividad Reciente</h3>
            </header>
            <div className="flex flex-col gap-4 m-4">
              <Pqrs
                title="Nueva Queja: Internet muy lento"
                userName="Usuario 123"
                status="Recibido"
                priority="Critica"
                date="2025-09-23T21:39:16-05:00"
              />
              <Pqrs
                title="Nueva Queja: Internet muy lento"
                userName="Usuario 123"
                status="Recibido"
                priority="Critica"
                date="2022-03-23T21:39:16-05:00"
              />
              <Pqrs
                title="Nueva Queja: Internet muy lento"
                userName="Usuario 123"
                status="Recibido"
                priority="Critica"
                date="2022-03-23T21:39:16-05:00"
              />
              <CustomButton
                size="3"
                radius="large"
                Icon={<Plus />}
                variant="outline"
                text="Ver Mas"
              />
            </div>
          </div>
        </section>
        <section className="col-span-4 mt-4 flex flex-col gap-4 border border-gray-200 rounded-2xl shadow-sm p-4">
          <h3 className="text-lg font-semibold">Acciones Rápidas</h3>
          <CustomButton
            size="3"
            radius="large"
            variant="soft"
            Icon={<Plus />}
            text="Nueva Solicitud PQR/S"
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
            }}
          />
          <CustomButton
            size="3"
            radius="large"
            variant="soft"
            Icon={<ChartColumnIncreasing />}
            text="Generar reporte"
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
            }}
          />
          <CustomButton
            size="3"
            radius="large"
            variant="soft"
            Icon={<TrendingUp />}
            text="Ver Analítica"
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
            }}
          />
        </section>
      </section>
    </Fragment>
  );
}
