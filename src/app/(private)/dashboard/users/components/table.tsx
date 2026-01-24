'use client';

import { Badge, Card, Flex, IconButton, Text } from '@radix-ui/themes';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Circle,
  Edit,
  Mail,
  Shield,
  Trash2,
  User,
} from 'lucide-react';
import { Employee, EmployeeRole, EmployeeStatus } from '../../../../core/types';

interface EmployeesTableProps {
  data: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export function EmployeesTable({
  data,
  onEdit,
  onDelete,
}: EmployeesTableProps) {
  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <div
          className="flex items-center cursor-pointer hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          NAME
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="ml-1 h-3 w-3" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="ml-1 h-3 w-3" />
          ) : (
            <ArrowUpDown className="ml-1 h-3 w-3 opacity-30" />
          )}
        </div>
      ),
      cell: ({ row }) => (
        <Flex align="center" gap="3">
          <div className="bg-blue-100 p-2 rounded-full ring-2 ring-white shadow-sm">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <Text weight="medium">{row.original.name}</Text>
        </Flex>
      ),
    },
    {
      accessorKey: 'email',
      header: 'EMAIL ADDRESS',
      cell: ({ row }) => (
        <Flex align="center" gap="2" className="text-gray-600">
          <Mail className="w-3.5 h-3.5" />
          <Text size="2">{row.original.email}</Text>
        </Flex>
      ),
    },
    {
      accessorKey: 'role',
      header: 'ROLE',
      cell: ({ row }) => {
        const isLvlAdmin = row.original.role === EmployeeRole.ADMIN;
        return (
          <Badge
            color={isLvlAdmin ? 'orange' : 'blue'}
            variant="soft"
            size="1"
            radius="large"
            className="px-2.5 py-0.5"
          >
            <Shield className="w-3 h-3 mr-1" />
            {row.original.role}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'STATUS',
      cell: ({ row }) => {
        const isActive = row.original.status === EmployeeStatus.ACTIVE;
        return (
          <Badge
            color={isActive ? 'green' : 'gray'}
            variant="soft"
            size="1"
            radius="large"
            className="px-2.5 py-0.5"
          >
            <Circle
              className={`w-2 h-2 mr-1.5 fill-current ${isActive ? 'text-green-500' : 'text-gray-400'}`}
            />
            {row.original.status}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: 'ACTIONS',
      cell: ({ row }) => (
        <Flex gap="2">
          <IconButton
            variant="ghost"
            color="gray"
            onClick={() => onEdit(row.original)}
            size="2"
          >
            <Edit className="w-4 h-4" />
          </IconButton>
          <IconButton
            variant="ghost"
            color="red"
            onClick={() => onDelete(row.original.id)}
            size="2"
          >
            <Trash2 className="w-4 h-4" />
          </IconButton>
        </Flex>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card
      variant="surface"
      className="p-0 overflow-hidden border-none shadow-lg"
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-gray-50/50 border-b border-gray-100"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest"
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
          <tbody className="divide-y divide-gray-50">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-blue-50/30 transition-all duration-200"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-5 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <Flex
                    direction="column"
                    align="center"
                    gap="2"
                    className="text-gray-400"
                  >
                    <User className="w-10 h-10 mb-2 opacity-20" />
                    <Text size="3" weight="medium">
                      No employees found
                    </Text>
                    <Text size="1">Add your team members to get started</Text>
                  </Flex>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
