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
import { Controller } from 'react-hook-form';
import { InputField } from '../../../components/input';
import { CustomButton } from '../../../components/trackerForm';
import {
  RequestType,
  RequestTypeLabels,
} from '../../../core/constants/requestTypes';
import { usePqrForm } from '../../../core/hooks/usePqrForm';
import ISPsService from '../../../core/services/ISPs/services';

export function Modal({ button, isOpen, onOpenChange }) {
  const { form, onSubmit, isSubmitting } = usePqrForm({
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

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar ISPs</div>;

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
          <AlertDialog.Title>Nueva Solicitud PQR/S</AlertDialog.Title>
          <AlertDialog.Cancel>
            <IconButton variant="ghost" color="gray" size="2" radius="full">
              <X size={18} />
            </IconButton>
          </AlertDialog.Cancel>
        </Flex>

        {/* Form */}
        <Card variant="surface" className="p-6 mt-2">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Tipo de solicitud */}
            <div className="space-y-2 mb-5 flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="type">
                Tipo de Solicitud *
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
                        placeholder="Seleccione un tipo de solicitud"
                        variant={fieldState.error ? 'soft' : 'surface'}
                        id="type"
                      />
                      <Select.Content>
                        {Object.entries(RequestType).map(([key, value]) => (
                          <Select.Item key={key} value={value}>
                            {RequestTypeLabels[value]}
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

            {/* Info personal */}
            <Flex gap="4" direction={{ initial: 'column', md: 'row' }} mb="4">
              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <InputField
                    {...field}
                    label="Nombre completo *"
                    placeholder="Su nombre completo"
                    error={fieldState.invalid}
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
                    label="Correo electrónico *"
                    placeholder="su.email@ejemplo.com"
                    error={fieldState.invalid}
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
                    label="Teléfono *"
                    placeholder="3001234567"
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    disabled={isSubmitting}
                  />
                )}
              />
            </Flex>

            <Separator size="4" my="5" />

            {/* Detalle solicitud */}
            <Flex gap="4" direction={{ initial: 'row' }} mb="4">
              <Controller
                name="subject"
                control={form.control}
                render={({ field, fieldState }) => (
                  <InputField
                    {...field}
                    label="Asunto *"
                    placeholder="Resumen breve de su solicitud"
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    disabled={isSubmitting}
                  />
                )}
              />

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
                        placeholder="Seleccione un ISP"
                      />
                      <Select.Content>
                        {Array.isArray(isps) &&
                          isps.map((isp) => (
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
            </Flex>

            <div className="mb-6">
              <Text as="label" size="3" weight="medium">
                Descripción detallada *
              </Text>
              <Controller
                name="details"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <TextArea
                      {...field}
                      placeholder="Describa detalladamente su solicitud, problema o sugerencia..."
                      disabled={isSubmitting}
                      size="3"
                      className={`mt-2 ${
                        fieldState.invalid ? 'border-red-500' : ''
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

            {/* Botones */}
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
                  text="Cancelar"
                  disabled={isSubmitting}
                  Icon={undefined}
                />
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <CustomButton
                  type="submit"
                  text="Enviar Solicitud"
                  disabled={isSubmitting}
                  Icon={undefined}
                />
              </AlertDialog.Action>
            </Flex>
          </form>
        </Card>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
