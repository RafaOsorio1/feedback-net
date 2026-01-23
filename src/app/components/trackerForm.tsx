'use client';

import { Button } from '@radix-ui/themes';
import React, { ReactNode } from 'react';

interface TrackerFormProps {
  children: ReactNode;
}

export function TrackerForm({ children }: TrackerFormProps) {
  return (
    <section>
      <div className="max-w-4xl p-4 mx-auto">
        <div className="bg-blue-600 text-white py-5 rounded-t-lg p-7">
          <h2 className="font-bold text-2xl mb-2">Track Request Status</h2>
          <p>Enter your CUN to check the status of your PQR/S request </p>
        </div>
        <div className="bg-white p-7 rounded-b-lg shadow-xl">{children} </div>
      </div>
    </section>
  );
}

interface CustomButtonProps extends React.ComponentProps<typeof Button> {
  Icon?: ReactNode;
  text?: string;
}

export function CustomButton({
  Icon,
  text,
  type = 'submit',
  ...props
}: CustomButtonProps) {
  return (
    <Button type={type as any} {...props}>
      {Icon}
      {text}
    </Button>
  );
}
