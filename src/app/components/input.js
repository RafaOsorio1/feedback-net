// src/app/components/input.js
import { Text, TextField } from '@radix-ui/themes';

export function InputField({
  label,
  required = false,
  className = '',
  containerClassName = '',
  classLabel = '',
  error,
  helperText,
  ...props
}) {
  const { icon } = props;
  const hasError = !!error;

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label
          className={`block mb-2 text-base font-semibold ${
            required ? 'after:content-["*"] after:ml-1 after:text-red-500' : ''
          } ${hasError ? 'text-red-700' : 'text-gray-900'} ${classLabel}`}
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
      )}
      <TextField.Root
        size="3"
        radius="large"
        className={`${className} ${
          hasError
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        }`}
        {...props}
      >
        {icon && <TextField.Slot>{icon}</TextField.Slot>}
      </TextField.Root>

      {(error || helperText) && (
        <Text
          as="p"
          size="2"
          color={hasError ? 'red' : 'gray'}
          className={`mt-1 ${hasError ? 'text-red-600' : 'text-gray-500'}`}
        >
          {error?.message || helperText}
        </Text>
      )}
    </div>
  );
}
