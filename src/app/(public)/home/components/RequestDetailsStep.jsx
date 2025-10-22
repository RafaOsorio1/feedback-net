'use client';

import { Building2, FileText, MessageCircle } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { InputField } from '../../../components/input';

export function RequestDetailsStep() {
  return (
    <section>
      <h4 className="font-semibold text-2xl mb-4">Detalles de la Solicitud</h4>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Controller
            name="isp"
            render={({ field, fieldState }) => (
              <InputField
                {...field}
                icon={<Building2 size={20} />}
                label="ISP *"
                placeholder="Seleccione su ISP"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="text-gray-600" size={20} />
            <label className="text-sm font-medium text-gray-700">
              Descripción detallada *
            </label>
          </div>
          <Controller
            name="message"
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
