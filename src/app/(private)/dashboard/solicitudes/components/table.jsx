import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

// Mocap de datos para mostrar en la tabla
const mockData = [
  {
    id: '1',
    cun: 'CUN12345',
    subject: 'Problema con el servicio',
    userName: 'Juan Pérez',
    userEmail: 'juan@example.com',
    type: 'Peticion',
    status: 'Recibido',
    priority: 'Media',
    daysUntilDeadline: 5,
    createdAt: '2025-09-20',
  },
  {
    id: '2',
    cun: 'CUN54321',
    subject: 'Queja por retraso',
    userName: 'Ana Gómez',
    userEmail: 'ana@example.com',
    type: 'Queja',
    status: 'En Proceso',
    priority: 'Alta',
    daysUntilDeadline: -2,
    createdAt: '2025-09-18',
  },
];

// Columnas simples para mostrar la data
const columns = [
  {
    header: 'CUN',
    accessorKey: 'cun',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Asunto',
    accessorKey: 'subject',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Usuario',
    accessorKey: 'userName',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Email',
    accessorKey: 'userEmail',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Tipo',
    accessorKey: 'type',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Estado',
    accessorKey: 'status',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Prioridad',
    accessorKey: 'priority',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Vencimiento (días)',
    accessorKey: 'daysUntilDeadline',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Creado',
    accessorKey: 'createdAt',
    cell: (info) => info.getValue(),
  },
];

export default function SimpleTanStackTable() {
  const table = useReactTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Tabla de Solicitudes (Demo)
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
