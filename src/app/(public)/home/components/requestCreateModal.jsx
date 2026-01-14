// src/app/(public)/home/components/requestCreateModal.jsx
'use client';

import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes';
import { CheckCircle, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRequestStore } from '../core/store';

export function RequestCreatedModal() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const { isModalOpen, requestData, closeModal } = useRequestStore();

  const handleCopy = () => {
    if (requestData?.referenceNumber) {
      navigator.clipboard.writeText(requestData.referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    closeModal();
    router.push('/');
  };

  if (!isModalOpen || !requestData) return null;

  return (
    <AlertDialog.Root open={isModalOpen} onOpenChange={closeModal}>
      <AlertDialog.Content className="max-w-md p-6 rounded-xl">
        <Flex direction="column" align="center" gap="4" className="text-center">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          <AlertDialog.Title className="text-xl font-semibold">
            Request created successfully!
          </AlertDialog.Title>

          <Text className="text-gray-600">
            We have received your request. Please save this tracking number:
          </Text>

          <div className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <code className="font-mono text-lg font-bold text-gray-800">
                {requestData.referenceNumber}
              </code>
              <Button
                variant="ghost"
                size="1"
                onClick={handleCopy}
                className="text-blue-600 hover:bg-blue-50"
              >
                {copied ? (
                  'Copied!'
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          <Text size="2" className="text-gray-500">
            This code will allow you to track the status of your request.
          </Text>

          <Button onClick={handleClose} className="mt-2 w-full" size="3">
            Got it
          </Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
