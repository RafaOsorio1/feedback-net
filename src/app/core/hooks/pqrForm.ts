import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.email('El correo es requerido'),
  phone: z.string().min(1, 'El telefono es requerido'),
  address: z.string().optional(),
  requestType: z.string().optional(),
  subject: z.string().min(1, 'El asunto es requerido'),
  message: z.string().min(1, 'El mensaje es requerido'),
});

export function usePqrForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      requestType: '',
      subject: '',
      message: '',
    },
  });

  return {
    form,
  };
}
