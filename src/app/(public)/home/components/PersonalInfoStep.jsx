'use client';

import { MailIcon, MapPin, Phone, UserRound } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { InputField } from '../../../components/input';

export function PersonalInfoStep() {
  return (
    <section>
      <h4 className="font-semibold text-2xl mb-4">Datos Personales</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="fullName"
          render={({ field, fieldState }) => (
            <InputField
              {...field}
              icon={<UserRound size={20} />}
              label="Nombre completo *"
              placeholder="Su nombre completo"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="email"
          render={({ field, fieldState }) => (
            <InputField
              {...field}
              type="email"
              icon={<MailIcon size={20} />}
              label="Correo electrónico *"
              placeholder="su.email@ejemplo.com"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="phone"
          render={({ field, fieldState }) => (
            <InputField
              {...field}
              type="tel"
              icon={<Phone size={20} />}
              label="Teléfono *"
              placeholder="3001234567"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="address"
          render={({ field, fieldState }) => (
            <InputField
              {...field}
              icon={<MapPin size={20} />}
              label="Dirección"
              placeholder="Calle 123 # 45-67, Barrio, Ciudad"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </div>
    </section>
  );
}
