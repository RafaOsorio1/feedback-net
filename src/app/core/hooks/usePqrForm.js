import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import PqrFormService from '../services/pqrForm/services';

const schema = z.object({
  fullName: z.string().min(1, 'El nombre es requerido'),
  ispId: z.string().min(1, 'El ISP es requerido'),
  phone: z.string().min(1, 'El telefono es requerido'),
  address: z.string().optional(),
  email: z.email('El correo es requerido'),
  subject: z.string().min(1, 'El asunto es requerido'),
  details: z.string().min(1, 'El mensaje es requerido'),
  type: z
    .string()
    .min(1, 'Por favor selecciona un tipo de solicitud')
    .refine(
      (value) =>
        ['PETITION', 'COMPLAINT', 'CLAIM', 'SUGGESTION'].includes(value),
      {
        message: 'Tipo de solicitud no válido',
      },
    ),
});

export function usePqrForm({
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
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: PqrFormService.createPqr,
    onSuccess: () => {
      toast.success('PQR creada exitosamente');
    },
    onError: () => {
      toast.error('Error al crear la PQR');
    },
    onSettled: () => {
      form.reset();
    },
  });

  const onSubmit = (data) => {
    console.log('Datos del formulario:', data);
    mutation.mutate(data, {
      onSuccess: (response) => {
        console.log('Respuesta del servidor:', response);
      },
      onError: (error) => {
        console.error('Error al enviar el formulario:', error);
      },
    });
  };

  return {
    form,
    onSubmit,
  };
}
