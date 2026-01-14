import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useRequestStore } from '../../(public)/home/core/store';
import RequestFormService from '../services/requestForm/services';

const schema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  ispId: z.string().min(1, 'ISP is required'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().optional(),
  email: z.string().email('Email is required'),
  subject: z.string().min(1, 'Subject is required'),
  details: z.string().min(1, 'Message is required'),
  type: z
    .string()
    .min(1, 'Please select a request type')
    .refine(
      (value) =>
        ['PETITION', 'COMPLAINT', 'CLAIM', 'SUGGESTION'].includes(value),
      {
        message: 'Invalid request type',
      },
    ),
});

export function useRequestForm({
  defaultValues = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    type: '',
    subject: '',
    details: '',
    ispId: '',
  },
}) {
  const { openModal } = useRequestStore();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: RequestFormService.createRequest,
    onSuccess: ({ data }) => {
      openModal(data);
      toast.success('Request created successfully');
    },
    onError: () => {
      toast.error('Error creating request');
    },
    onSettled: () => {
      form.reset();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data, {
      onSuccess: (response) => {
        toast.success(
          `Request created successfully - ${response.data.referenceNumber}`,
        );
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return {
    form,
    onSubmit,
  };
}
