'use client';

import { FormProvider } from 'react-hook-form';
import { usePqrForm } from '../core/hooks/usePqrForm';

export function PqrForm({ children }) {
  const { form } = usePqrForm();
  return (
    <section className="bg-gray-200">
      <div className="max-w-4xl p-4 mx-auto">
        <div className="bg-blue-600 text-white py-5 rounded-t-lg p-7">
          <h2 className="font-bold text-2xl mb-2">Enviar Solicitud PQR/S</h2>
          <p className="">
            Complete el formulario para enviar su peticion, queja, reclamo o
            sugerencia{' '}
          </p>
        </div>
        <FormProvider {...form}>
          <div className="bg-white">{children} </div>
        </FormProvider>
      </div>
    </section>
  );
}
