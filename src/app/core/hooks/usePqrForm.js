// src/app/core/hooks/usePqrForm.js
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { RequestType } from '../constants/requestTypes';
import PqrFormService from '../services/pqrForm/services';
import { useStore } from '../store';

// Esquema de validación
const pqrSchema = z.object({
  fullName: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Correo electrónico inválido'),
  ispId: z.string().min(1, 'El ID de la empresa es requerido'),
  phone: z.string().min(1, 'El teléfono es requerido'),
  address: z.string().optional(),
  type: z.enum(RequestType, {
    error: () => ({
      message: 'Por favor selecciona un tipo de solicitud',
    }),
  }),
  subject: z.string().min(1, 'El asunto es requerido'),
  details: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

export function usePqrForm() {
  const { openNotificationModal } = useStore();
  const form = useForm({
    resolver: zodResolver(pqrSchema),
    defaultValues: {
      fullName: '',
      email: '',
      ispId: '',
      phone: '',
      address: '',
      type: '',
      subject: '',
      details: '',
    },
  });

  const mutation = useMutation({
    mutationFn: PqrFormService.createPqr,
    onSuccess: ({ data }) => {
      const referenceNumber = data?.referenceNumber || `PQR-${Date.now()}`;
      toast.success('PQR enviada exitosamente');
      form.reset();

      // Abrir el modal de notificación con los detalles
      openNotificationModal({
        title: '¡Solicitud enviada!',
        message: 'Hemos recibido tu solicitud correctamente.',
        referenceNumber: referenceNumber,
      });
    },
    onError: () => {
      toast.error('Error al enviar la PQR');
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isSubmitting: mutation.isPending,
  };
}
