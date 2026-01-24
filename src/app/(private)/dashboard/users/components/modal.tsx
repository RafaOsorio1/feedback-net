'use client';

import {
  AlertDialog,
  Button,
  Flex,
  IconButton,
  Select,
  Text,
  TextField,
} from '@radix-ui/themes';
import { Lock, Mail, Shield, User, X } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Employee, EmployeeRole } from '../../../../core/types';

interface UserModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee | null;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export function UserModal({
  isOpen,
  onOpenChange,
  employee,
  onSubmit,
  isLoading,
}: UserModalProps) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'EMPLOYEE' as EmployeeRole,
    },
  });

  useEffect(() => {
    if (employee) {
      reset({
        name: employee.name,
        email: employee.email,
        password: '',
        role: employee.role,
      });
    } else {
      reset({
        name: '',
        email: '',
        password: '',
        role: 'EMPLOYEE' as EmployeeRole,
      });
    }
  }, [employee, reset, isOpen]);

  const onFormSubmit = (data: any) => {
    // If editing, password might be empty, so handle that
    if (employee && !data.password) {
      delete data.password;
    }
    onSubmit(data);
  };

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Content
        maxWidth="450px"
        className="p-0 overflow-hidden rounded-xl shadow-2xl"
      >
        <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
          <AlertDialog.Title className="m-0 text-xl font-bold">
            {employee ? 'Edit Team Member' : 'Add Team Member'}
          </AlertDialog.Title>
          <AlertDialog.Cancel>
            <IconButton variant="ghost" color="blue" size="2" radius="full">
              <X
                size={20}
                className="text-white opacity-80 hover:opacity-100 transition-opacity"
              />
            </IconButton>
          </AlertDialog.Cancel>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-5">
          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <Text as="label" size="2" weight="bold" className="text-gray-700">
                Full Name
              </Text>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Name is required' }}
                render={({ field, fieldState }) => (
                  <TextField.Root
                    {...field}
                    placeholder="e.g. John Doe"
                    size="3"
                    className={fieldState.error ? 'ring-1 ring-red-500' : ''}
                  >
                    <TextField.Slot>
                      <User size={16} className="text-gray-400" />
                    </TextField.Slot>
                  </TextField.Root>
                )}
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Text as="label" size="2" weight="bold" className="text-gray-700">
                Email Address
              </Text>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                }}
                render={({ field, fieldState }) => (
                  <TextField.Root
                    {...field}
                    type="email"
                    placeholder="john@example.com"
                    size="3"
                    className={fieldState.error ? 'ring-1 ring-red-500' : ''}
                  >
                    <TextField.Slot>
                      <Mail size={16} className="text-gray-400" />
                    </TextField.Slot>
                  </TextField.Root>
                )}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Text as="label" size="2" weight="bold" className="text-gray-700">
                Password{' '}
                {employee && (
                  <span className="font-normal text-xs text-gray-500">
                    (Leave blank to keep current)
                  </span>
                )}
              </Text>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: !employee ? 'Password is required' : false,
                  minLength: 6,
                }}
                render={({ field, fieldState }) => (
                  <TextField.Root
                    {...field}
                    type="password"
                    placeholder="••••••••"
                    size="3"
                    className={fieldState.error ? 'ring-1 ring-red-500' : ''}
                  >
                    <TextField.Slot>
                      <Lock size={16} className="text-gray-400" />
                    </TextField.Slot>
                  </TextField.Root>
                )}
              />
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <Text as="label" size="2" weight="bold" className="text-gray-700">
                Role
              </Text>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select.Root
                    value={field.value}
                    onValueChange={field.onChange}
                    size="3"
                  >
                    <Select.Trigger className="w-full">
                      <Flex align="center" gap="2">
                        <Shield size={16} className="text-gray-400" />
                        {field.value}
                      </Flex>
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="EMPLOYEE">Employee</Select.Item>
                      <Select.Item value="ADMIN">Admin</Select.Item>
                    </Select.Content>
                  </Select.Root>
                )}
              />
            </div>
          </div>

          <Flex
            gap="3"
            justify="end"
            mt="6"
            pt="4"
            className="border-t border-gray-100"
          >
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray" size="3">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <Button type="submit" size="3" loading={isLoading}>
              {employee ? 'Update Member' : 'Create Member'}
            </Button>
          </Flex>
        </form>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
