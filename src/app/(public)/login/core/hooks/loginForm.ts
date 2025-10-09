'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import AuthService from '../../../../core/services/auth/services';

const loginSchema = z.object({
  email: z.email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export function useLoginForm() {
  const router = useRouter();
  const toastId = 'login-toast';

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: LoginFormData) => {
      toast.loading('Iniciando sesión...', { id: toastId });
      return AuthService.login(data.email, data.password);
    },
    onSuccess: () => {
      toast.success('¡Inicio de sesión exitoso!', {
        id: toastId,
        duration: 2000,
      });
      router.push('/dashboard');
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error(
        error.message || 'Error al iniciar sesión. Verifica tus credenciales.',
        {
          id: toastId,
          duration: 4000,
        },
      );
      router.push('/login');
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    loginMutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
}
