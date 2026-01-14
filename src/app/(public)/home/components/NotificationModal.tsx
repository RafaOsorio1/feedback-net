'use client';

import { AlertDialog, Box, Button, Flex, Text } from '@radix-ui/themes';
import { CheckCircle } from 'lucide-react';
import { useStore } from '../../../core/store';

export function NotificationModal() {
  const { notificationModal, closeNotificationModal, setInitialView } =
    useStore();

  const handleClose = () => {
    closeNotificationModal();
    setInitialView('form');
  };

  return (
    <AlertDialog.Root open={notificationModal.isOpen}>
      <AlertDialog.Content
        onEscapeKeyDown={handleClose}
        style={{ maxWidth: 450 }}
      >
        <Box mb="4">
          <Flex direction="column" align="center" gap="3">
            <Box
              p="3"
              style={{
                backgroundColor: 'var(--green-3)',
                borderRadius: '50%',
                color: 'var(--green-9)',
              }}
            >
              <CheckCircle size={32} />
            </Box>

            <AlertDialog.Title align="center">
              {notificationModal.data?.title ||
                'Request submitted successfully!'}
            </AlertDialog.Title>

            <Text align="center" color="gray">
              {notificationModal.data?.message ||
                'We have correctly received your request.'}
            </Text>

            {notificationModal.data?.referenceNumber && (
              <Box
                mt="2"
                p="3"
                style={{
                  backgroundColor: 'var(--gray-2)',
                  borderRadius: 'var(--radius-2)',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <Text size="2" weight="bold" color="gray">
                  Reference number:
                </Text>
                <Text size="5" weight="bold">
                  {notificationModal.data.referenceNumber}
                </Text>
              </Box>
            )}
          </Flex>
        </Box>

        <Flex gap="3" mt="4" justify="end">
          <Button variant="soft" color="gray" onClick={handleClose}>
            Close
          </Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
