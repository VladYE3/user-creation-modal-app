'use client';

import { ModalWindow } from '@/shared/ui/ModalWindow/ModalWindow';
import { Button } from '@/components/ui/button';
import { CreateUserForm } from '@/features/create-user/ui/CreateUserForm';

export const CreateUserModal = () => {
  return (
    <ModalWindow trigger={<Button>Создать пользователя</Button>}>
      {({ close }) => (
        <>
          <ModalWindow.Header>Создание пользователя</ModalWindow.Header>
          <ModalWindow.Body>
            <CreateUserForm onSuccess={close} />
          </ModalWindow.Body>
          <ModalWindow.Footer>
            <ModalWindow.Close>
              <Button variant="outline">Отмена</Button>
            </ModalWindow.Close>
          </ModalWindow.Footer>
        </>
      )}
    </ModalWindow>
  );
};
