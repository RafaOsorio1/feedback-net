'use client';

import { useFormContext } from 'react-hook-form';

import {
  RequestType,
  RequestTypeDescriptions,
  RequestTypeLabels,
  RequestTypeValue,
} from '../../../core/constants/requestTypes';
import { Card } from './card';

export function RequestTypeStep() {
  const { setValue, watch } = useFormContext();
  const requestValue = watch('type');

  return (
    <section>
      <h4 className="font-semibold text-2xl mb-4">Request Type *</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(Object.values(RequestType) as RequestTypeValue[]).map((type) => (
          <Card
            key={type}
            isSelected={requestValue === type}
            onClick={() => setValue('type', type, { shouldValidate: true })}
            title={RequestTypeLabels[type]}
            description={RequestTypeDescriptions[type]}
          />
        ))}
      </div>
    </section>
  );
}
