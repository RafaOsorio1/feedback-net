'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { AuthContext } from '../../../../core/AuthContext/context';
import AuthService from '../../../../core/services/auth/services';
import { setToken } from '../../../../lib/setToken';

const loginSchema = z.object({
  email: z.email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export function useLoginForm() {
  const router = useRouter();
  const toastId = 'login-toast';
  const { setIsp } = useContext(AuthContext);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: AuthService.login,
    onSuccess: ({ data }) => {
      toast.success('¡Inicio de sesión exitoso!', {
        id: toastId,
        duration: 2000,
      });

      setToken(data.token);

      console.log(data.isp);
      setIsp(data.isp);

      router.push('/dashboard');
    },
    onError: (error) => {
      console.log(error);
      toast.error(
        error.message || 'Error al iniciar sesión. Verifica tus credenciales.',
        {
          id: toastId,
          duration: 4000,
        },
      );
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate({ email: data.email, password: data.password });
  };

  return {
    form,
    onSubmit,
    isLoading: loginMutation.isPending,
  };
}
