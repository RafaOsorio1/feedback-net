import { TextField } from '@radix-ui/themes';

export function InputField({
  label,
  icon,
  required = false,
  className = '',
  containerClassName = '',
  ...props
}) {
  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label
          className={`block text-base font-semibold ${required ? 'after:content-["*"] after:ml-1 after:text-red-500' : ''} mb-2`}
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
      )}
      <TextField.Root size="3" radius="large" className={className} {...props}>
        {icon && <TextField.Slot>{icon}</TextField.Slot>}
      </TextField.Root>
    </div>
  );
}
