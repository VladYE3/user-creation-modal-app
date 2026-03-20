'use client';

import { useAppForm } from '@/shared/lib/hooks/useAppForm';
import { userSchema, UserFormData } from '@/entities/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CreateUserFormProps {
  onSuccess?: () => void;
}

export const CreateUserForm = ({ onSuccess }: CreateUserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useAppForm(userSchema);

  const onSubmit = (data: UserFormData) => {
    console.log('User created:', data);

    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Имя
        </label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Пароль
        </label>
        <Input id="password" type="password" {...register('password')} />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>
      <Button type="submit">Создать пользователя</Button>
    </form>
  );
};
