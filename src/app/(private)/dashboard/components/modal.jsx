// src/app/(private)/dashboard/components/modal.jsx
'use client';

import { AlertDialog, Flex, Select, TextArea } from '@radix-ui/themes';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { InputField } from '../../../components/input';
import { CustomButton } from '../../../components/trackerForm';

export function Modal({ button }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      // Aquí iría la lógica para enviar el formulario
      console.log('Datos del formulario:', data);
      // Simulamos un envío exitoso
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('Solicitud creada exitosamente');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{button}</AlertDialog.Trigger>

      <AlertDialog.Content
        style={{
          maxWidth: '650px',
          maxHeight: '90vh',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          padding: '0',
        }}
      >
        <AlertDialog.Title
          style={{
            borderBottom: '2px solid #ccc',
            padding: '20px',
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            zIndex: 10,
          }}
        >
          Nueva Solicitud PQR/S
        </AlertDialog.Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-5 flex flex-col gap-5">
            <div className="flex flex-col md:flex-row gap-5">
              <Controller
                name="requestType"
                control={control}
                rules={{ required: 'El tipo de solicitud es requerido' }}
                render={({ field }) => (
                  <div className="flex-1">
                    <label className="block mb-1 text-base font-medium">
                      Tipo de Solicitud *
                    </label>
                    <Select.Root
                      size="3"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <Select.Trigger
                        placeholder="Tipo de Solicitud"
                        className={errors.requestType ? 'border-red-500' : ''}
                      />
                      <Select.Content>
                        <Select.Item value="Petición">Petición</Select.Item>
                        <Select.Item value="Queja">Queja</Select.Item>
                        <Select.Item value="Reclamo">Reclamo</Select.Item>
                        <Select.Item value="Sugerencia">Sugerencia</Select.Item>
                      </Select.Content>
                    </Select.Root>
                    {errors.requestType && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.requestType?.message?.toString()}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="receptionChannel"
                control={control}
                render={({ field }) => (
                  <div className="flex-1">
                    <label className="block mb-1 text-base font-medium">
                      Canal de Recepción
                    </label>
                    <Select.Root
                      size="3"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <Select.Trigger placeholder="Canal de Recepción" />
                      <Select.Content>
                        <Select.Item value="Formulario Web">
                          Formulario Web
                        </Select.Item>
                        <Select.Item value="Email">Email</Select.Item>
                        <Select.Item value="Telefono">Teléfono</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </div>
                )}
              />
            </div>

            <Controller
              name="priority"
              control={control}
              rules={{ required: 'La prioridad es requerida' }}
              render={({ field }) => (
                <div className="flex flex-col">
                  <label className="block mb-1 text-base font-medium">
                    Prioridad *
                  </label>
                  <Select.Root
                    size="3"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Select.Trigger
                      placeholder="Prioridad"
                      className={errors.priority ? 'border-red-500' : ''}
                    />
                    <Select.Content>
                      <Select.Item value="Baja">Baja</Select.Item>
                      <Select.Item value="Media">Media</Select.Item>
                      <Select.Item value="Alta">Alta</Select.Item>
                      <Select.Item value="Critica">Crítica</Select.Item>
                    </Select.Content>
                  </Select.Root>
                  {errors.priority && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.priority?.message?.toString()}
                    </p>
                  )}
                </div>
              )}
            />

            <h2 className="font-medium text-xl">Información del Usuario</h2>

            <Controller
              name="fullName"
              control={control}
              rules={{ required: 'El nombre completo es requerido' }}
              render={({ field, fieldState }) => (
                <InputField
                  {...field}
                  label="Nombre Completo *"
                  placeholder="Nombre Completo del usuario"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: 'El correo electrónico es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido',
                },
              }}
              render={({ field, fieldState }) => (
                <InputField
                  {...field}
                  type="email"
                  label="Email *"
                  placeholder="correo@ejemplo.com"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              rules={{
                required: 'El teléfono es requerido',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Número de teléfono inválido',
                },
              }}
              render={({ field, fieldState }) => (
                <InputField
                  {...field}
                  label="Teléfono *"
                  placeholder="3001234567"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="address"
              control={control}
              render={({ field, fieldState }) => (
                <InputField
                  {...field}
                  label="Dirección"
                  placeholder="Dirección completa"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <h2 className="font-medium text-xl">Detalles de la Solicitud</h2>

            <Controller
              name="subject"
              control={control}
              rules={{ required: 'El asunto es requerido' }}
              render={({ field, fieldState }) => (
                <InputField
                  {...field}
                  label="Asunto *"
                  placeholder="Resumen breve del problema o solicitud"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              rules={{
                required: 'La descripción es requerida',
                minLength: {
                  value: 10,
                  message: 'La descripción debe tener al menos 10 caracteres',
                },
              }}
              render={({ field, fieldState }) => (
                <div>
                  <label className="block mb-1 text-base font-medium">
                    Descripción Detallada *
                  </label>
                  <TextArea
                    {...field}
                    placeholder="Describa detalladamente su solicitud, queja, reclamo o sugerencia..."
                    className={`w-full min-h-[120px] ${
                      fieldState.invalid ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {fieldState.error && (
                    <p className="mt-1 text-sm text-red-600">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <Flex
            gap="3"
            justify="end"
            style={{
              padding: '20px',
              position: 'sticky',
              bottom: 0,
              backgroundColor: 'white',
              borderTop: '1px solid #e5e7eb',
            }}
          >
            <AlertDialog.Cancel>
              <CustomButton
                size="3"
                radius="large"
                text="Cancelar"
                variant="outline"
                color="gray"
                type="button"
                disabled={isSubmitting}
                Icon={undefined}
              />
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <CustomButton
                size="3"
                radius="large"
                Icon={isSubmitting ? null : <Send size={16} />}
                text={isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                type="submit"
                disabled={isSubmitting}
              />
            </AlertDialog.Action>
          </Flex>
        </form>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
