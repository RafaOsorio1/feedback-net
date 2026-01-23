import { Control, FieldValues, Path } from 'react-hook-form';

export interface CardProps<T extends FieldValues> {
  name: Path<T>;
  value: string;
  title: string;
  description: string;
  className?: string;
  control: Control<T>;
}

export interface CardContainerProps<T extends FieldValues> {
  control: Control<T>;
}
