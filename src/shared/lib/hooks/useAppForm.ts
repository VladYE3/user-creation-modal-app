import { useForm, UseFormProps, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export function useAppForm<T extends z.ZodObject>(
  schema: T,
  options?: Omit<UseFormProps<z.infer<T>>, 'resolver'>
) {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema) as Resolver<z.infer<T>>,
    ...options,
  });
}
