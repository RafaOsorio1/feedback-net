'use client';

import { FormProvider } from 'react-hook-form';
import { FormFields } from './formFields';

import { usePqrForm } from '../../../core/hooks/usePqrForm';
import { FormFooter } from './FormFooter';
import { FormHeader } from './formHeader';
import { NotificationModal } from './NotificationModal';

export function PqrForm() {
  const { form, onSubmit, isSubmitting } = usePqrForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      type: '',
      subject: '',
      details: '',
      ispId: '',
    },
  });

  return (
    <section className="h-full flex flex-col justify-center items-center">
      <div className="max-w-4xl p-4 mx-auto">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <NotificationModal />
            <FormHeader />
            <FormFields />
            <FormFooter isSubmitting={isSubmitting} />
          </form>
        </FormProvider>
      </div>
    </section>
  );
}
