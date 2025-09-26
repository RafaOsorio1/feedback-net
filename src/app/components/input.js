import { TextField } from '@radix-ui/themes';

export function InputField({
  label,
  required = false,
  className = '',
  containerClassName = '',
  classLabel = '',
  ...props
}) {
  const { icon } = props;
  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label
          className={`block mb-2  text-base font-semibold ${required ? 'after:content-["*"] after:ml-1 after:text-red-500' : ''} ${classLabel || 'font-medium text-base'}`}
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
