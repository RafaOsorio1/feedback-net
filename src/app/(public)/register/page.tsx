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
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  address: z.string().min(5, 'Address is required'),
  phone: z.string().min(7, 'Phone is required'),
});

type FormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const toastId = 'register-toast';

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      address: '',
      phone: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    toast.loading('Creating account...', { id: toastId });
    try {
      await AuthService.register(data);
      toast.success('Account created successfully!', {
        id: toastId,
        duration: 2000,
      });

      // Redirect to login after successful registration
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch {
      toast.error('Error creating account', { id: toastId });
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
          PQR/S Management System for ISPs
        </p>
      </div>

      <div className="bg-white rounded-lg px-6 py-5 shadow-xl mt-9">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="font-semibold text-2xl flex justify-center mb-6 mt-4">
            Create Account
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
                    label="Full Name"
                    placeholder="John Doe"
                    disabled={isSubmitting}
                    error={errors.name}
                    helperText={errors.name?.message}
                  />
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
                    label="Email Address"
                    placeholder="user@isp.com"
                    disabled={isSubmitting}
                    error={errors.email}
                    helperText={errors.email?.message}
                  />
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
                    label="Password"
                    placeholder="••••••"
                    disabled={isSubmitting}
                    error={errors.password}
                    helperText={errors.password?.message}
                  />
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
                    label="Address"
                    placeholder="123 Main St"
                    disabled={isSubmitting}
                    error={errors.address}
                    helperText={errors.address?.message}
                  />
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
                    label="Phone"
                    placeholder="+57 300 123 4567"
                    disabled={isSubmitting}
                    error={errors.phone}
                    helperText={errors.phone?.message}
                  />
                </div>
              )}
            />
          </div>

          <CustomButton
            type="submit"
            size="3"
            radius="large"
            text={isSubmitting ? 'Creating account...' : 'Register'}
            style={{
              margin: '20px 0px',
              width: '100%',
            }}
            disabled={isSubmitting}
            Icon={undefined}
          />
        </form>

        <div className="flex flex-row gap-2 font-medium mt-6 justify-center">
          <p className="text-gray-600">Already have an account?</p>
          <Link
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
}
