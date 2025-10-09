'use client';

import { KeyRound, MailIcon, Wifi } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { InputField } from '../../components/input';
import { useLoginForm } from './core/hooks/loginForm';

export default function LoginPage() {
  const { form, onSubmit, isLoading } = useLoginForm();
  const {
    handleSubmit,
    formState: { errors },
  } = form;

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
            Iniciar Sesión
          </h2>

          <div className="space-y-4">
            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <div>
                  <InputField
                    type="email"
                    required
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    value={field.value}
                    icon={<MailIcon />}
                    label="Correo Electrónico"
                    placeholder="admin@isp.com"
                    disabled={isLoading}
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
              control={form.control}
              render={({ field }) => (
                <div>
                  <InputField
                    type="password"
                    required
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    value={field.value}
                    icon={<KeyRound />}
                    label="Contraseña"
                    placeholder="••••••"
                    disabled={isLoading}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-6 font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="bg-gray-100 rounded-lg p-4 mt-6 mb-7">
          <p className="font-semibold text-base mb-2">
            Credenciales de demostración:
          </p>
          <p className="text-sm">Email: admin@isp.com</p>
          <p className="text-sm">Contraseña: password</p>
        </div>

        <div className="flex flex-row gap-2 font-medium mb-4 justify-center">
          <p className="text-gray-600">¿No tienes cuenta?</p>
          <button
            type="submit"
            onClick={() => alert('TODO: navegar a registro')}
            className="text-blue-600 font-medium hover:underline"
            disabled={isLoading}
          >
            Registrar mi ISP
          </button>
        </div>
      </div>

      <div className="text-center mt-10">
        <p className="text-white text-sm">
          Cumplimiento Resolución CRC 6242 de 2021
        </p>
      </div>
    </section>
  );
}
