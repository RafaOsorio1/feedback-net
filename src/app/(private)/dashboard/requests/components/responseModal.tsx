'use client';

import {
  AlertDialog,
  Avatar,
  Button,
  Flex,
  Separator,
  Text,
  TextArea,
} from '@radix-ui/themes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Send, X } from 'lucide-react';
import { DateTime } from 'luxon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../core/AuthContext/context';
import RequestServices from '../../core/request.services';

export function ResponseModal() {
  const { isp } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [responseText, setResponseText] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestId = searchParams.get('requestId');
  const responseId = searchParams.get('responseId');
  const queryClient = useQueryClient();

  // Open modal when responseId is present in URL
  useEffect(() => {
    setIsOpen(!!responseId);
  }, [responseId]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Remove responseId from URL when closing modal
      const params = new URLSearchParams(searchParams.toString());
      params.delete('responseId');
      router.replace(`${pathname}?${params.toString()}`);
    }
    setIsOpen(open);
  };

  const { data: request } = useQuery({
    queryKey: ['request', requestId],
    queryFn: () => RequestServices.getRequestById(requestId!),
    enabled: !!requestId,
  });

  const responseMutation = useMutation({
    mutationFn: RequestServices.createResponse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['request', requestId],
      });
      setResponseText('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (responseText.trim() && requestId && isp?.id) {
      responseMutation.mutate({
        content: responseText,
        requestId,
        ispId: isp.id,
      });
    }
  };

  if (!request?.data && isOpen) return null;

  const responses = request?.data?.responses || [];
  const currentResponse = responses.find((r: any) => r.id === responseId);

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialog.Content size="3" className="max-w-2xl rounded-xl shadow-2xl">
        <Flex
          align="center"
          justify="between"
          className="p-4 border-b border-gray-200"
        >
          <AlertDialog.Title>
            {currentResponse ? 'View Response' : 'Respond to Request'}
          </AlertDialog.Title>
          <AlertDialog.Cancel>
            <Button variant="ghost" color="gray" size="2" radius="full">
              <X className="w-4 h-4" />
            </Button>
          </AlertDialog.Cancel>
        </Flex>

        <div className="p-6 space-y-6">
          {/* Existing Responses */}
          {responses.length > 0 && (
            <div className="space-y-4">
              <Text as="div" size="2" weight="bold" className="text-gray-900">
                Response History
              </Text>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {responses.map((response: any) => (
                  <div
                    key={response.id}
                    className={`p-4 rounded-lg border ${
                      response.id === responseId
                        ? 'border-blue-300 bg-blue-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar
                        src={response.isp?.logo}
                        fallback={response.isp?.name?.[0] || 'U'}
                        size="2"
                        radius="full"
                        className="shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <Text as="div" weight="bold" size="2">
                            {response.isp?.name ||
                              response.employee?.name ||
                              'Support'}
                          </Text>
                          <Text as="div" size="1" color="gray">
                            {DateTime.fromISO(response.createdAt)
                              .setLocale('en')
                              .toFormat("MM/dd/yyyy 'at' HH:mm")}
                            {response.updatedAt !== response.createdAt &&
                              ' (edited)'}
                          </Text>
                        </div>
                        <Text
                          as="p"
                          size="2"
                          className="mt-2 whitespace-pre-line"
                        >
                          {response.content}
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Response Form */}
          {!currentResponse && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Separator size="4" />
              <Text as="div" size="2" weight="bold" className="text-gray-900">
                {responses.length > 0
                  ? 'Add another response'
                  : 'Write your response'}
              </Text>

              <TextArea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Write your response here..."
                className="min-h-[120px] w-full"
                required
              />

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="soft"
                  color="gray"
                  onClick={() => handleOpenChange(false)}
                  disabled={responseMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!responseText.trim() || responseMutation.isPending}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {responseMutation.isPending ? 'Sending...' : 'Send response'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
