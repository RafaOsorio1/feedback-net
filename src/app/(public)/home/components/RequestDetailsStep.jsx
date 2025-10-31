'use client';

import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { FileText, MessageCircle } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { InputField } from '../../../components/input';
import ISPsService from '../../../core/services/ISPs/services';

export function RequestDetailsStep() {
  // Obtener ISPs
  const { data, isLoading, error } = useQuery({
    queryKey: ['get-isps'],
    queryFn: ISPsService.getISPs,
  });

  const isps = data?.data ?? [];

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar ISPs</div>;
  }

  return (
    <section>
      <h4 className="font-semibold text-2xl mb-4">Detalles de la Solicitud</h4>

      <div className="space-y-6 w-full">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex-1">
            <Controller
              name="subject"
              render={({ field, fieldState }) => (
                <InputField
                  {...field}
                  icon={<FileText size={20} />}
                  label="Asunto *"
                  placeholder="Resumen breve de su solicitud"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </div>
          <div className="flex-1">
            <Controller
              name="ispId"
              render={({ field, fieldState }) => (
                <div>
                  <label className="block mb-2 text-base font-semibold">
                    ISP *
                  </label>

                  <Select.Root
                    size="3"
                    value={field.value ?? ''}
                    onValueChange={field.onChange}
                    disabled={isLoading}
                  >
                    <Select.Trigger
                      radius="large"
                      placeholder="Seleccione un ISP"
                      className="flex-1"
                    />
                    <Select.Content position="popper">
                      {isLoading && (
                        <Select.Item value="loading" disabled>
                          Cargando...
                        </Select.Item>
                      )}
                      {error && (
                        <Select.Item value="error" disabled>
                          Error al cargar ISPs
                        </Select.Item>
                      )}
                      {Array.isArray(isps) &&
                        isps.map((isp) => (
                          <Select.Item key={isp.id} value={isp.id}>
                            {isp.name}
                          </Select.Item>
                        ))}
                    </Select.Content>
                  </Select.Root>

                  {fieldState.error && (
                    <p className="mt-1 text-sm text-red-600">
                      {fieldState.error.message?.toString()}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="text-gray-600" size={20} />
            <label className="text-sm font-medium text-gray-700">
              Descripción detallada *
            </label>
          </div>

          <Controller
            name="details"
            render={({ field, fieldState }) => (
              <div>
                <textarea
                  {...field}
                  rows={5}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    fieldState.error ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describa detalladamente su solicitud, problema o sugerencia..."
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
      </div>
    </section>
  );
}
