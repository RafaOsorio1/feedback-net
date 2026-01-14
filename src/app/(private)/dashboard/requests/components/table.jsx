import { Badge } from '@radix-ui/themes';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CheckCircle,
  Clock,
  Eye,
  MessageSquare,
  XCircle,
} from 'lucide-react';
import { DateTime } from 'luxon';
import { usePathname, useRouter } from 'next/navigation';

import { RequestStatus } from '../../../../core/constants/requestTypes';

const statusConfig = {
  [RequestStatus.PENDING]: {
    label: 'Pending',
    color: 'blue',
    icon: <Clock className="w-3 h-3" />,
  },
  [RequestStatus.IN_PROGRESS]: {
    label: 'In Progress',
    color: 'yellow',
    icon: <Clock className="w-3 h-3" />,
  },
  [RequestStatus.RESOLVED]: {
    label: 'Resolved',
    color: 'green',
    icon: <CheckCircle className="w-3 h-3" />,
  },
  [RequestStatus.CANCELED]: {
    label: 'Canceled',
    color: 'red',
    icon: <XCircle className="w-3 h-3" />,
  },
};

// Configuración de tipos
const typeConfig = {
  COMPLAINT: {
    label: 'Complaint',
    color: 'red',
  },
  SUGGESTION: {
    label: 'Suggestion',
    color: 'blue',
  },
  CLAIM: {
    label: 'Claim',
    color: 'orange',
  },
};

// Columnas de la tabla
const columns = [
  {
    accessorKey: 'referenceNumber',
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          REFERENCE NUMBER
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="ml-1 h-3 w-3" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="ml-1 h-3 w-3" />
          ) : (
            <ArrowUpDown className="ml-1 h-3 w-3 opacity-30" />
          )}
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.referenceNumber}</span>
          <span className="text-xs text-gray-500">{row.original.subject}</span>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          REQUESTER
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="ml-1 h-3 w-3" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="ml-1 h-3 w-3" />
          ) : (
            <ArrowUpDown className="ml-1 h-3 w-3 opacity-30" />
          )}
        </div>
      );
    },
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
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          TYPE
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="ml-1 h-3 w-3" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="ml-1 h-3 w-3" />
          ) : (
            <ArrowUpDown className="ml-1 h-3 w-3 opacity-30" />
          )}
        </div>
      );
    },
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
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          STATUS
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="ml-1 h-3 w-3" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="ml-1 h-3 w-3" />
          ) : (
            <ArrowUpDown className="ml-1 h-3 w-3 opacity-30" />
          )}
        </div>
      );
    },
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
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          DATES
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="ml-1 h-3 w-3" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="ml-1 h-3 w-3" />
          ) : (
            <ArrowUpDown className="ml-1 h-3 w-3 opacity-30" />
          )}
        </div>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      const updatedAt = row.original.updatedAt;

      return (
        <div>
          <div>
            <span className="text-xs text-gray-500">Created: </span>
            <span className="text-sm">
              {DateTime.fromISO(createdAt)
                .setLocale('en')
                .toFormat('MM/dd/yyyy')}
            </span>
          </div>
          <div>
            <span className="text-xs text-gray-500">Updated: </span>
            <span className="text-sm">
              {DateTime.fromISO(updatedAt)
                .setLocale('en')
                .toFormat('MM/dd/yyyy')}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    header: 'RESPONSIBLE',
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
            <p className="text-sm text-gray-500">Unassigned</p>
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
    header: 'ACTIONS',
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
            aria-label="View details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              const params = new URLSearchParams();
              params.set('requestId', row.original.id);
              params.set('responseId', 'new');
              router.push(`${pathname}?${params.toString()}`);
            }}
            className="text-gray-500 hover:text-blue-600 transition-colors"
            aria-label="Respond to request"
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
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          PQR/S Request Management
        </h2>
      </div>

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
