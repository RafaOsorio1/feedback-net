'use client';

import { Send } from 'lucide-react';
import { CustomButton } from '../../../components/trackerForm';

interface FormFooterProps {
  isSubmitting: boolean;
}

export function FormFooter({ isSubmitting }: FormFooterProps) {
  return (
    <div className="flex justify-center p-8">
      <CustomButton
        type="submit"
        Icon={<Send size={20} />}
        text={isSubmitting ? 'Sending...' : 'Submit PQR/S Request'}
        size="4"
        disabled={isSubmitting}
      />
    </div>
  );
}
