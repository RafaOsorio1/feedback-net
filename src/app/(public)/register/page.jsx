'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Home, KeyRound, MailIcon, Phone, User, Wifi } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { InputField } from '../../components/input';
import { CustomButton } from '../../components/trackerForm';
import AuthService from '../../core/services/auth/services';

const registerSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  address: z.string().min(5, 'La dirección es requerida'),
  phone: z.string().min(7, 'El teléfono es requerido'),
});

export default function RegisterPage() {
  const router = useRouter();
  const toastId = 'register-toast';

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      address: '',
      phone: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      toast.loading('Creando cuenta...', { id: toastId });
      await AuthService.register(data);

      toast.success('¡Cuenta creada exitosamente!', {
        id: toastId,
        duration: 2000,
      });

      // Redirect to login after successful registration
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(
        error.message || 'Error al crear la cuenta. Intenta nuevamente.',
        {
          id: toastId,
          duration: 4000,
        },
      );
    }
  };

  return (
    <section className="w-lg max-w-md mx-auto px-4">
      <div className="text-white flex flex-col justify-center items-center gap-3 ">
        <div className="bg-white flex justify-center items-center w-24 h-24 p-4 rounded-full shadow-xl mb-2">
          <Wifi className="text-blue-500 w-full h-full" />
        </div>
        <h1 className="text-4xl font-extrabold text-center">FeedbackNet</h1>
        <p className="text-center text-sm font-medium">
          Sistema de Gestion PQR/S para ISPs
        </p>
      </div>

      <div className="bg-white rounded-lg px-6 py-5 shadow-xl mt-9">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="font-semibold text-2xl flex justify-center mb-6 mt-4">
            Crear Cuenta
          </h2>

          <div className="space-y-4">
            {/* Name */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <div>
                  <InputField
                    type="text"
                    required
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    value={field.value}
                    icon={<User size={18} />}
                    label="Nombre Completo"
                    placeholder="Juan Pérez"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div>
                  <InputField
                    type="email"
                    required
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    value={field.value}
                    icon={<MailIcon size={18} />}
                    label="Correo Electrónico"
                    placeholder="usuario@isp.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div>
                  <InputField
                    type="password"
                    required
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    value={field.value}
                    icon={<KeyRound size={18} />}
                    label="Contraseña"
                    placeholder="••••••"
                    disabled={isSubmitting}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Address */}
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <div>
                  <InputField
                    type="text"
                    required
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    value={field.value}
                    icon={<Home size={18} />}
                    label="Dirección"
                    placeholder="Calle 123 #45-67"
                    disabled={isSubmitting}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Phone */}
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <div>
                  <InputField
                    type="tel"
                    required
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    value={field.value}
                    icon={<Phone size={18} />}
                    label="Teléfono"
                    placeholder="+57 300 123 4567"
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <CustomButton
            type="submit"
            size="3"
            radius="large"
            text={isSubmitting ? 'Creando cuenta...' : 'Registrarse'}
            style={{
              margin: '20px 0px',
              width: '100%',
            }}
            disabled={isSubmitting}
            Icon={undefined}
          />
        </form>

        <div className="flex flex-row gap-2 font-medium mt-6 justify-center">
          <p className="text-gray-600">¿Ya tienes una cuenta?</p>
          <Link
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </section>
  );
}
