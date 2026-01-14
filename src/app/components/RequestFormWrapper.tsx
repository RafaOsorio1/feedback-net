'use client';

import { ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';
import { useRequestForm } from '../core/hooks/useRequestForm';

interface PqrFormProps {
  children: ReactNode;
}

export function RequestFormWrapper({ children }: PqrFormProps) {
  const { form, onSubmit } = useRequestForm();
  return (
    <section className="bg-gray-200">
      <div className="max-w-4xl p-4 mx-auto">
        <div className="bg-blue-600 text-white py-5 rounded-t-lg p-7">
          <h2 className="font-bold text-2xl mb-2">Submit PQR/S Request</h2>
          <p className="">
            Complete the form to submit your petition, complaint, claim or
            suggestion
          </p>
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="bg-white rounded-b-lg shadow-xl p-3">
              {children}
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
}
