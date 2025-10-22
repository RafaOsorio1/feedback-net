'use client';

import { Send } from 'lucide-react';
import { CustomButton } from '../../../components/trackerForm';

export function FormFooter({ isSubmitting }) {
  return (
    <div className="flex justify-center p-8">
      <CustomButton
        type="submit"
        Icon={<Send size={20} />}
        text={isSubmitting ? 'Enviando...' : 'Enviar Solicitud PQR/S'}
        size="4"
        disabled={isSubmitting}
      />
    </div>
  );
}
