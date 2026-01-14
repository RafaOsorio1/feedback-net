import clsx from 'clsx';
import { Control, useController } from 'react-hook-form';
import {
  RequestType,
  RequestTypeDescriptions,
  RequestTypeLabels,
  RequestTypeValue,
} from '../core/constants/requestTypes';

interface CardProps {
  name: string;
  value: RequestTypeValue;
  control: Control<any>;
}

export function Card({ name, value, control }: CardProps) {
  const { field } = useController({
    name,
    control,
    defaultValue: '',
  });

  return (
    <label
      className={clsx(
        'p-4 flex flex-row items-center gap-2 border-2 border-solid border-gray-300 rounded-md cursor-pointer',
        'hover:border-blue-500 transition-colors',
        field.value === value && 'border-blue-500 bg-blue-50',
      )}
    >
      <input
        type="radio"
        {...field}
        value={value}
        checked={field.value === value}
        onChange={(e) => field.onChange(e.target.value)}
        className="sr-only"
      />
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          field.value === value ? 'border-blue-500' : 'border-gray-400'
        }`}
      >
        {field.value === value && (
          <div className="w-3 h-3 rounded-full bg-blue-500" />
        )}
      </div>
      <div>
        <h2 className="font-bold text-2xl">{RequestTypeLabels[value]}</h2>
        <p className="text-gray-600 font-semibold">
          {RequestTypeDescriptions[value]}
        </p>
      </div>
    </label>
  );
}

interface CardContainerProps {
  control: Control<any>;
}

export function CardContainer({ control }: CardContainerProps) {
  return (
    <section className="p-5">
      <h4 className="font-semibold mb-4 text-2xl">Request Type *</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card name="type" value={RequestType.PETITION} control={control} />
        <Card name="type" value={RequestType.COMPLAINT} control={control} />
        <Card name="type" value={RequestType.CLAIM} control={control} />
        <Card name="type" value={RequestType.SUGGESTION} control={control} />
      </div>
    </section>
  );
}
