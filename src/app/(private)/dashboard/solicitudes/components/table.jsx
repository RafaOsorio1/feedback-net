import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Eye, SquarePen } from 'lucide-react';

// Mocap de datos para mostrar en la tabla
const mockData = [
  {
    id: '1',
    cun: '2024-01-15-143022-001',
    solicitud: 'Internet muy lento',
    usuario: 'Juan Perez',
    usuarioEmail: 'juan.perez@email.com',
    tipo: 'Queja',
    Estado: 'En Proceso',
    prioridad: 'Alta',
    vencimiento: '8 dias restantes',
    tiempo: 'hace mas de 1 año',
    acciones: <Eye />,
    accion: <SquarePen />,
  },
  {
    id: '2',
    cun: '2024-01-14-091547-002',
    solicitud: 'Solicitud de informacion sobre planes',
    usuario: 'Maria Garcia',
    usuarioEmail: 'maria.garcia@email.com',
    tipo: 'Petición',
    Estado: 'Respondido',
    prioridad: 'Media',
    vencimiento: '9 dias restantes',
    tiempo: 'hace mas de 1 año',
    acciones: <Eye />,
    accion: <SquarePen />,
  },
  {
    id: '3',
    cun: '2024-01-13-162033-003',
    solicitud: 'Facturación incorrecta',
    usuario: 'Carlos López',
    usuarioEmail: 'carlos.lopez@email.com',
    tipo: 'Reclamo',
    Estado: 'Recibido',
    prioridad: 'Critica',
    vencimiento: '10 dias restantes',
    tiempo: 'hace mas de 1 año',
    acciones: <Eye />,
    accion: <SquarePen />,
  },
];

// Columnas simples para mostrar la data
const columns = [
  {
    header: 'CUN / SOLICITUD',
    cell: ({ row }) => {
      const cun = row.original.cun;
      const solicitud = row.original.solicitud;

      return (
        <div>
          <p className="font-medium">{cun}</p>
          <p>{solicitud}</p>
        </div>
      );
    },
  },
  {
    header: 'USUARIO',
    cell: ({ row }) => {
      const usuario = row.original.usuario;
      const usuarioEmail = row.original.usuarioEmail;
      return (
        <div>
          <p className="font-medium">{usuario}</p>
          <p>{usuarioEmail}</p>
        </div>
      );
    },
  },
  {
    header: 'TIPO',
    cell: ({ row }) => {
      const tipo = row.original.tipo;

      return (
        <div>
          <p className="font-medium">{tipo}</p>
        </div>
      );
    },
  },
  {
    header: 'ESTADO',
    cell: ({ row }) => {
      const Estado = row.original.Estado;
      return (
        <div>
          <p>{Estado}</p>
        </div>
      );
    },
  },
  {
    header: 'PRIORIDAD',
    cell: ({ row }) => {
      const prioridad = row.original.prioridad;
      return (
        <div>
          <p className="text-orange-500 font-medium">{prioridad}</p>
        </div>
      );
    },
  },
  {
    header: 'VENCIMIENTO',
    cell: ({ row }) => {
      const vencimiento = row.original.vencimiento;
      const tiempo = row.original.tiempo;
      return (
        <div>
          <p className="font-medium">{vencimiento}</p>
          <p>{tiempo}</p>
        </div>
      );
    },
  },
  {
    header: 'ACCIONES',
    cell: ({ row }) => {
      const acciones = row.original.acciones;
      const accion = row.original.accion;
      return (
        <div className="flex flex-row gap-3">
          <p className="text-blue-500">{acciones}</p>
          <p className="text-gray-500">{accion}</p>
        </div>
      );
    },
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
