'use client';

import { FormProvider } from 'react-hook-form';
import { FormFields } from './formFields';

import { usePqrForm } from '../../../core/hooks/usePqrForm';
import { FormFooter } from './FormFooter';
import { FormHeader } from './formHeader';

export function PqrForm() {
  const { form, onSubmit, isSubmitting } = usePqrForm();

  return (
    <section className="bg-gray-200">
      <div className="max-w-4xl p-4 mx-auto">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormHeader />
            <FormFields />
            <FormFooter isSubmitting={isSubmitting} />
          </form>
        </FormProvider>
      </div>
    </section>
  );
}
