'use client';

import { KeyRound, LogOut, MailIcon, Wifi } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Controller } from 'react-hook-form';
import { InputField } from '../../components/input';
import { CustomButton } from '../../components/trackerForm';
import { useLoginForm } from './core/hooks/loginForm';

export default function LoginPage() {
  const { form, onSubmit, isLoading } = useLoginForm();

  const router = useRouter();

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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h2 className="font-semibold text-2xl flex justify-center mb-6 mt-4">
            Log In
          </h2>

          <div className="space-y-4">
            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <div>
                  <InputField
                    type="email"
                    required
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    value={field.value}
                    icon={<MailIcon />}
                    label="Email Address"
                    placeholder="admin@isp.com"
                    disabled={isLoading}
                    error={fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                </div>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <div>
                  <InputField
                    type="password"
                    required
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    value={field.value}
                    icon={<KeyRound />}
                    label="Password"
                    placeholder="••••••"
                    disabled={isLoading}
                    error={fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                </div>
              )}
            />
          </div>

          <CustomButton
            type="submit"
            size="3"
            radius="large"
            Icon={<LogOut />}
            text={isLoading ? 'Logging in...' : 'Log In'}
            style={{
              margin: '20px 0px',
              width: '100%',
            }}
            disabled={isLoading}
          />
        </form>

        <div className="bg-gray-100 rounded-lg p-4 mt-6 mb-7">
          <p className="font-semibold text-base mb-2">Demo credentials:</p>
          <p className="text-sm">Email: contacto@redveloz.com</p>
          <p className="text-sm">Password: password123</p>
        </div>

        <div className="flex flex-row gap-2 font-medium mb-4 justify-center">
          <p className="text-gray-600">Don't have an account?</p>
          <button
            type="button"
            onClick={() => router.push('/register')}
            className="text-blue-600 font-medium hover:underline"
            disabled={isLoading}
          >
            Register my ISP
          </button>
        </div>
      </div>

      <div className="text-center mt-10">
        <p className="text-white text-sm">
          Compliance with CRC Resolution 6242 of 2021
        </p>
      </div>
    </section>
  );
}
