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
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof loginSchema>;

export function useLoginForm() {
  const router = useRouter();
  const toastId = 'login-toast';
  const { setIsp } = useContext(AuthContext);

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: AuthService.login,
    onSuccess: (response: any) => {
      const { data } = response;
      toast.success('Login successful!', {
        id: toastId,
        duration: 2000,
      });

      if (data.token) {
        setToken(data.token);
      }

      if (data.isp) {
        setIsp(data.isp);
      }

      router.push('/dashboard');
    },
    onError: (error: any) => {
      toast.error(
        error.message || 'Error logging in. Please check your credentials.',
        {
          id: toastId,
          duration: 4000,
        },
      );
    },
  });

  const onSubmit = (data: FormData) => {
    toast.loading('Logging in...', { id: toastId });
    loginMutation.mutate({ email: data.email, password: data.password });
  };

  return {
    form,
    onSubmit,
    isLoading: loginMutation.isPending,
  };
}
