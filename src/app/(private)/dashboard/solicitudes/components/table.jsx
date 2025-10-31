import { Badge } from '@radix-ui/themes';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { CheckCircle, Clock, Eye, MessageSquare, XCircle } from 'lucide-react';
import { DateTime } from 'luxon';
import { usePathname, useRouter } from 'next/navigation';
import { RequestStatus } from '../../../../core/constants/requestTypes';

// Configuración de estados
const statusConfig = {
  [RequestStatus.PENDING]: {
    label: 'Pendiente',
    color: 'blue',
    icon: <Clock className="w-3 h-3" />,
  },
  [RequestStatus.IN_PROGRESS]: {
    label: 'En Progreso',
    color: 'yellow',
    icon: <Clock className="w-3 h-3" />,
  },
  [RequestStatus.RESOLVED]: {
    label: 'Resuelto',
    color: 'green',
    icon: <CheckCircle className="w-3 h-3" />,
  },
  [RequestStatus.CANCELED]: {
    label: 'Cancelado',
    color: 'red',
    icon: <XCircle className="w-3 h-3" />,
  },
};

// Configuración de tipos
const typeConfig = {
  COMPLAINT: {
    label: 'Queja',
    color: 'red',
  },
  SUGGESTION: {
    label: 'Sugerencia',
    color: 'blue',
  },
  CLAIM: {
    label: 'Reclamo',
    color: 'orange',
  },
};

// Columnas de la tabla
const columns = [
  {
    header: 'REFERENCIA / ASUNTO',
    cell: ({ row }) => {
      const referenceNumber = row.original.referenceNumber;
      const subject = row.original.subject;
      const details = row.original.details;

      return (
        <div className="min-w-[250px]">
          <p className="font-medium">{referenceNumber}</p>
          <p className="font-semibold">{subject}</p>
          <p className="text-sm text-gray-500 line-clamp-2">{details}</p>
        </div>
      );
    },
  },
  {
    header: 'SOLICITANTE',
    cell: ({ row }) => {
      const fullName = row.original.fullName;
      const email = row.original.email;
      const phone = row.original.phone;

      return (
        <div>
          <p className="font-medium">{fullName}</p>
          <p className="text-sm text-gray-600">{email}</p>
          <p className="text-sm text-gray-500">{phone}</p>
        </div>
      );
    },
  },
  {
    header: 'TIPO',
    cell: ({ row }) => {
      const type = row.original.type;
      const config = typeConfig[type] || { label: type, color: 'gray' };

      return (
        <Badge color={config.color} size="1" radius="large">
          {config.label}
        </Badge>
      );
    },
  },
  {
    header: 'ESTADO',
    cell: ({ row }) => {
      const status = row.original.status;
      const config =
        statusConfig[status] || statusConfig[RequestStatus.PENDING];

      return (
        <Badge
          // @ts-ignore
          color={config.color}
          size="1"
          radius="large"
          className="flex items-center gap-1 min-w-[120px]"
        >
          {config.icon}
          {config.label}
        </Badge>
      );
    },
  },
  {
    header: 'FECHAS',
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      const updatedAt = row.original.updatedAt;

      return (
        <div>
          <div>
            <span className="text-xs text-gray-500">Creada: </span>
            <span className="text-sm">
              {DateTime.fromISO(createdAt)
                .setLocale('es')
                .toFormat('dd/MM/yyyy')}
            </span>
          </div>
          <div>
            <span className="text-xs text-gray-500">Actualizada: </span>
            <span className="text-sm">
              {DateTime.fromISO(updatedAt)
                .setLocale('es')
                .toFormat('dd/MM/yyyy')}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    header: 'RESPONSABLE',
    cell: ({ row }) => {
      const respondedBy = row.original.respondedBy;
      const isp = row.original.isp;

      return (
        <div>
          {respondedBy ? (
            <>
              <p className="font-medium">{respondedBy.name}</p>
              <p className="text-sm text-gray-600">{respondedBy.email}</p>
            </>
          ) : (
            <p className="text-sm text-gray-500">Sin asignar</p>
          )}
          {isp?.name && (
            <div className="mt-1">
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                {isp.name}
              </span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    header: 'ACCIONES',
    cell: ({ row }) => {
      const router = useRouter();
      const pathname = usePathname();

      const handleViewDetails = () => {
        const params = new URLSearchParams();
        params.set('requestId', row.original.id);
        router.push(`${pathname}?${params.toString()}`);
      };

      return (
        <div className="flex flex-row gap-3">
          <button
            onClick={handleViewDetails}
            className="text-blue-500 hover:text-blue-700 transition-colors"
            aria-label="Ver detalles"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Enviar mensaje"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      );
    },
  },
];

export function RequestsTable({ data = [] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Gestión de Solicitudes PQR/S
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
