'use client';

import { usePqrForm } from '../core/hooks/usePqrForm';

export function TrackerForm({ children }) {
  const { form } = usePqrForm();
  return (
    <section className="bg-gray-200">
      <div className="max-w-4xl p-4 mx-auto">
        <div className="bg-blue-600 text-white py-5 rounded-t-lg p-7">
          <h2 className="font-bold text-2xl mb-2">
            Consultar Estado de Solicitud
          </h2>
          <p className="">
            Ingrese su CUN para consultar el estado de su solicitud PQR/S{' '}
          </p>
        </div>
      </div>
      {children}
    </section>
  );
}
