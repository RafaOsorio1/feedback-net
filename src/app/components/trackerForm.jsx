'use client';

import { Button } from '@radix-ui/themes';

export function TrackerForm({ children }) {
  return (
    <section className="bg-gray-200">
      <div className="max-w-4xl p-4 mx-auto">
        <div className="bg-blue-600 text-white py-5 rounded-t-lg p-7">
          <h2 className="font-bold text-2xl mb-2">
            Consultar Estado de Solicitud
          </h2>
          <p>Ingrese su CUN para consultar el estado de su solicitud PQR/S </p>
        </div>
        <div className="bg-white p-7 rounded-b-lg shadow-xl">{children} </div>
      </div>
    </section>
  );
}

export function CustomButton({ Icon, text, type = 'submit', ...props }) {
  return (
    <Button
      // @ts-ignore
      type={type}
      {...props}
    >
      {Icon}
      {text}
    </Button>
  );
}
