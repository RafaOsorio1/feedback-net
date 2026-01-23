'use client';

import { FormProvider } from 'react-hook-form';
import { FormFields } from './formFields';

import { useRequestForm } from '../../../core/hooks/useRequestForm';
import { FormFooter } from './FormFooter';
import { FormHeader } from './formHeader';
import { NotificationModal } from './NotificationModal';
import { RequestCreatedModal } from './requestCreateModal';

export function RequestForm() {
  const { form, onSubmit, isSubmitting } = useRequestForm({
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
            <RequestCreatedModal />
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
