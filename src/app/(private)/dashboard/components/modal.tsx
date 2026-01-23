'use client';

import {
  AlertDialog,
  Card,
  Flex,
  IconButton,
  Select,
  Separator,
  Text,
  TextArea,
} from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import React from 'react';
import { Controller } from 'react-hook-form';
import { InputField } from '../../../components/input';
import { CustomButton } from '../../../components/trackerForm';
import {
  RequestType,
  RequestTypeLabels,
  RequestTypeValue,
} from '../../../core/constants/requestTypes';
import { useRequestForm } from '../../../core/hooks/useRequestForm';
import ISPsService from '../../../core/services/ISPs/services';

interface ModalProps {
  button: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Modal({ button, isOpen, onOpenChange }: ModalProps) {
  const { form, onSubmit, isSubmitting } = useRequestForm({
    defaultValues: {
      type: '',
      fullName: '',
      email: '',
      phone: '',
      address: '',
      subject: '',
      details: '',
      ispId: '',
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['get-isps'],
    queryFn: ISPsService.getISPs,
  });

  const isps = data?.data ?? [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading ISPs</div>;

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Trigger>{button}</AlertDialog.Trigger>

      <AlertDialog.Content size="3" className="max-w-3xl rounded-xl shadow-2xl">
        {/* Header */}
        <Flex
          align="center"
          justify="between"
          className="p-4 border-b border-gray-200"
        >
          <AlertDialog.Title>New PQR/S Request</AlertDialog.Title>
          <AlertDialog.Cancel>
            <IconButton variant="ghost" color="gray" size="2" radius="full">
              <X size={18} />
            </IconButton>
          </AlertDialog.Cancel>
        </Flex>

        {/* Form Body */}
        <Card variant="surface" className="p-6 mt-2">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Request Type */}
            <div className="space-y-2 mb-5 flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="type">
                Request Type *
              </label>
              <Controller
                name="type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <Select.Root
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isSubmitting}
                    >
                      <Select.Trigger
                        placeholder="Select a request type"
                        variant={fieldState.error ? 'soft' : 'surface'}
                        id="type"
                      />
                      <Select.Content>
                        {Object.entries(RequestType).map(([key, value]) => (
                          <Select.Item key={key} value={value as string}>
                            {RequestTypeLabels[value as RequestTypeValue]}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                    {fieldState.error && (
                      <Text size="2" color="red">
                        {fieldState.error.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </div>

            {/* Personal Information */}
            <Flex gap="4" direction={{ initial: 'column', md: 'row' }} mb="4">
              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <InputField
                    {...field}
                    label="Full name *"
                    placeholder="Your full name"
                    error={fieldState.error}
                    helperText={fieldState.error?.message}
                    disabled={isSubmitting}
                  />
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <InputField
                    {...field}
                    type="email"
                    label="Email address *"
                    placeholder="your.email@example.com"
                    error={fieldState.error}
                    helperText={fieldState.error?.message}
                    disabled={isSubmitting}
                  />
                )}
              />
            </Flex>

            <Flex gap="4" direction={{ initial: 'column', md: 'row' }} mb="4">
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <InputField
                    {...field}
                    type="tel"
                    label="Phone *"
                    placeholder="3001234567"
                    error={fieldState.error}
                    helperText={fieldState.error?.message}
                    disabled={isSubmitting}
                  />
                )}
              />
            </Flex>

            <Separator size="4" my="5" />

            {/* Request Details */}
            <Flex gap="4" direction={{ initial: 'column', md: 'row' }} mb="4">
              <div className="flex-1">
                <Controller
                  name="subject"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <InputField
                      {...field}
                      label="Subject *"
                      placeholder="Brief summary of your request"
                      error={fieldState.error}
                      helperText={fieldState.error?.message}
                      disabled={isSubmitting}
                    />
                  )}
                />
              </div>

              <div className="flex-1">
                <Controller
                  name="ispId"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="w-full flex flex-col space-y-2 ">
                      <label className="mb-2 font-semibold" htmlFor="ispId">
                        ISP *
                      </label>
                      <Select.Root
                        value={field.value ?? ''}
                        onValueChange={field.onChange}
                        disabled={isLoading}
                        size="3"
                      >
                        <Select.Trigger
                          id="ispId"
                          placeholder="Select an ISP"
                        />
                        <Select.Content>
                          {Array.isArray(isps) &&
                            isps.map((isp: any) => (
                              <Select.Item key={isp.id} value={isp.id}>
                                {isp.name}
                              </Select.Item>
                            ))}
                        </Select.Content>
                      </Select.Root>
                      {fieldState.error && (
                        <Text size="2" color="red">
                          {fieldState.error.message}
                        </Text>
                      )}
                    </div>
                  )}
                />
              </div>
            </Flex>

            <div className="mb-6">
              <Text as="label" size="3" weight="medium">
                Detailed description *
              </Text>
              <Controller
                name="details"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <TextArea
                      {...field}
                      placeholder="Describe your request, problem or suggestion in detail..."
                      disabled={isSubmitting}
                      size="3"
                      className={`mt-2 ${
                        fieldState.error ? 'border-red-500' : ''
                      }`}
                    />
                    {fieldState.error && (
                      <Text size="2" color="red">
                        {fieldState.error.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </div>

            {/* Buttons */}
            <Flex
              justify="end"
              gap="3"
              pt="3"
              mt="6"
              className="border-t border-gray-200"
            >
              <AlertDialog.Cancel>
                <CustomButton
                  variant="soft"
                  color="gray"
                  text="Cancel"
                  disabled={isSubmitting}
                />
              </AlertDialog.Cancel>
              {/* Note: Submit button inside AlertDialog.Action might trigger form submit if typed correctly */}
              <CustomButton
                type="submit"
                text="Submit Request"
                disabled={isSubmitting}
              />
            </Flex>
          </form>
        </Card>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
