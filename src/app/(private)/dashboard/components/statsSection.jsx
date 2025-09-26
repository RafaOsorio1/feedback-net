import {
  CheckCircle,
  Clock,
  MessageSquare,
  TrendingUp,
  TriangleAlert,
  Users,
} from 'lucide-react';
import { StatCard } from './statsCard';

export function StatsSection() {
  return (
    <section>
      <div className="flex flex-col gap-4 flex-wrap">
        <div className="flex flex-row flex-1 gap-4">
          <StatCard
            name="Total de Solicitudes"
            value="10"
            icon={<MessageSquare />}
            iconColor="bg-blue-600"
            lastValue="15"
            newValue="15"
          />
          <StatCard
            name="Pendientes"
            value="2"
            icon={<Clock />}
            iconColor="bg-yellow-400"
            lastValue="2"
            newValue="2"
          />
          <StatCard
            name="Completadas"
            value="1"
            icon={<CheckCircle />}
            iconColor="bg-green-500"
            lastValue="2"
            newValue="2"
          />
        </div>
        <div className="flex flex-row flex-1 gap-4">
          <StatCard
            name="Vencidas"
            value="0"
            icon={<TriangleAlert />}
            iconColor="bg-red-500"
            lastValue="2"
            newValue="2"
          />
          <StatCard
            name="Tiempo Promedio"
            value="1.0 dias"
            icon={<TrendingUp />}
            iconColor="bg-purple-600"
            lastValue="2"
            newValue="2"
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
