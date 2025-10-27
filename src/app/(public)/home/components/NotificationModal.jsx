'use client';

import { AlertDialog } from '@radix-ui/themes';
import { useStore } from '../../../core/store';

export function NotificationModal() {
  const { modalOpen, setModalOpen } = useStore();
  return (
    <AlertDialog.Root open={modalOpen} onOpenChange={setModalOpen}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Enviado correctamente</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Se envió correctamente la PQR, para ver el estado de la solicitud mas
          tarde, tome nota de su número de solicitud.
        </AlertDialog.Description>
        <AlertDialog.Cancel>
          <AlertDialog.Action>Ok</AlertDialog.Action>
        </AlertDialog.Cancel>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
