import { CreateUserModal } from '@/widgets/create-user-modal/ui/CreateUserModal';

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Управление пользователями</h1>
      <CreateUserModal />
    </main>
  );
}
