'use client';

import { Button, Flex, Heading, Section, Text } from '@radix-ui/themes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Users as UsersIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { useAuth } from '../../../core/AuthContext/context';
import EmployeeServices from '../../../core/services/employees/services';
import { Employee } from '../../../core/types';
import { UserModal } from './components/modal';
import { EmployeesTable } from './components/table';

export default function UsersPage() {
  const { isp } = useAuth();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Employee | null>(null);

  // Fetch Employees
  const { data: employeesData } = useQuery({
    queryKey: ['employees', isp?.id],
    queryFn: () => EmployeeServices.getEmployees(isp?.id || ''),
    enabled: !!isp?.id,
  });

  const employees = employeesData?.data || [];

  // Create Employee Mutation
  const createMutation = useMutation({
    mutationFn: (data: any) =>
      EmployeeServices.createEmployee({ ...data, ispId: isp?.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success('Team member added successfully');
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to add team member');
    },
  });

  // Update Employee Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      EmployeeServices.updateEmployee(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success('Team member updated successfully');
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update team member');
    },
  });

  // Delete Employee Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => EmployeeServices.deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success('Team member removed successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to remove team member');
    },
  });

  const handleCreateOrUpdate = (formData: any) => {
    if (selectedUser) {
      updateMutation.mutate({ id: selectedUser.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const openAddModal = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (employee: Employee) => {
    setSelectedUser(employee);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <Section p="0" className="space-y-8 animate-in fade-in duration-500">
      <Flex justify="between" align="center" className="mb-2">
        <div className="space-y-1">
          <Flex align="center" gap="3">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-200">
              <UsersIcon className="text-white w-6 h-6" />
            </div>
            <Heading
              size="8"
              weight="bold"
              className="text-gray-900 tracking-tight"
            >
              Team Management
            </Heading>
          </Flex>
          <Text color="gray" size="2" className="ml-14 block">
            Manage your employees, roles and access permissions.
          </Text>
        </div>

        <Button
          size="3"
          radius="large"
          onClick={openAddModal}
          className="cursor-pointer shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <Plus size={18} className="mr-1" />
          Add Team Member
        </Button>
      </Flex>

      <div className="mt-8">
        <EmployeesTable
          data={employees}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      </div>

      <UserModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        employee={selectedUser}
        onSubmit={handleCreateOrUpdate}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </Section>
  );
}
