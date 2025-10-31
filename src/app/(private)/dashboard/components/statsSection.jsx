'use client';

import { useQuery } from '@tanstack/react-query';
import {
  CheckCircle,
  Clock,
  MessageSquare,
  TrendingUp,
  TriangleAlert,
  Users,
} from 'lucide-react';
import { useAuth } from '../../../core/AuthContext/context';

import RequestServices from '../core/request.services';
import { StatCard } from './statsCard';

export function StatsSection() {
  const { isp } = useAuth();

  const requestQuery = useQuery({
    queryKey: ['request', isp?.id || ''],
    queryFn: () => RequestServices.getRequests(isp?.id),
  });

  if (requestQuery.isLoading) {
    //skeleton similar to the cards
    return (
      <section>
        <div className="flex flex-col gap-4 flex-wrap mb-4">
          <div className="flex flex-row flex-1 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-24 bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-wrap">
          <div className="flex flex-row flex-1 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index + 23}
                className="w-full h-24 bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Inicializar con un array vacío si no hay datos
  const data = requestQuery.data?.data || [];

  // Crear un mapa para agrupar por estado
  const requestsByStatus = data.reduce((acc, request) => {
    const status = request.status || 'SIN_ESTADO';
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(request);
    return acc;
  }, {});

  // Contar las solicitudes por estado
  const statusCounts = Object.entries(requestsByStatus).reduce(
    (acc, [status, requests]) => {
      acc[status] = requests.length;
      return acc;
    },
    {},
  );

  console.log('statusCounts', statusCounts);
  // Obtener los totales
  const totalRequests = data.length;
  const pendingRequests = statusCounts['PENDING'] || 0;
  const completedRequests = statusCounts['RESOLVED'] || 0;
  const canceledRequests = statusCounts['CANCELED'] || 0;
  const inProgressRequests = statusCounts['IN_PROGRESS'] || 0;

  return (
    <section>
      <div className="flex flex-col gap-4 flex-wrap">
        <div className="flex flex-row flex-1 gap-4">
          <StatCard
            name="Total de Solicitudes"
            value={totalRequests}
            icon={<MessageSquare />}
            iconColor="bg-blue-600"
            lastValue={totalRequests}
            newValue={totalRequests}
          />
          <StatCard
            name="Pendientes"
            value={pendingRequests}
            icon={<Clock />}
            iconColor="bg-yellow-400"
            lastValue={totalRequests}
            newValue={pendingRequests}
          />
          <StatCard
            name="Completadas"
            value={completedRequests}
            icon={<CheckCircle />}
            iconColor="bg-green-500"
            lastValue={totalRequests}
            newValue={completedRequests}
          />
        </div>
        <div className="flex flex-row flex-1 gap-4">
          <StatCard
            name="Canceladas"
            value={canceledRequests}
            icon={<TriangleAlert />}
            iconColor="bg-red-500"
            lastValue={totalRequests}
            newValue={canceledRequests}
          />
          <StatCard
            name="En Progreso"
            value={inProgressRequests}
            icon={<TrendingUp />}
            iconColor="bg-purple-600"
            lastValue={totalRequests}
            newValue={inProgressRequests}
          />
          <StatCard
            name="Usuarios activos"
            value="3"
            icon={<Users />}
            iconColor="bg-pink-500"
            lastValue="2"
            newValue="2"
          />
        </div>
      </div>
    </section>
  );
}
