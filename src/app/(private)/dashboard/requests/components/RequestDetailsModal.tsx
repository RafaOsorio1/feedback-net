'use client';

import {
  AlertDialog,
  Badge,
  Button,
  Flex,
  Separator,
  Text,
  TextArea,
} from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { Mail, MapPin, MessageSquare, Phone, User, X } from 'lucide-react';
import { DateTime } from 'luxon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  RequestStatus,
  RequestStatusValue,
} from '../../../../core/constants/requestTypes';
import { statusConfig } from '../../components/RecentActivity';
import RequestServices from '../../core/request.services';

// Type configuration
const typeConfig: Record<string, { label: string; color: any }> = {
  COMPLAINT: { label: 'Complaint', color: 'red' },
  PETITION: { label: 'Petition', color: 'blue' },
  CLAIM: { label: 'Claim', color: 'orange' },
  SUGGESTION: { label: 'Suggestion', color: 'green' },
};

export function RequestDetailsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestId = searchParams.get('requestId');

  // Open modal when requestId is present in URL
  useEffect(() => {
    setIsOpen(!!requestId);
  }, [requestId]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Remove requestId from URL when closing modal
      const params = new URLSearchParams(searchParams.toString());
      params.delete('requestId');
      // If there was a responseId, remove it too
      params.delete('responseId');
      router.replace(`${pathname}?${params.toString()}`);
    }
    setIsOpen(open);
  };

  const requestQuery = useQuery({
    queryKey: ['request', requestId],
    queryFn: () => RequestServices.getRequestById(requestId!),
    enabled: !!requestId,
  });

  if (requestQuery.isLoading) {
    return <RequestDetailsSkeleton />;
  }

  const request = requestQuery.data?.data;

  if (!request && !requestQuery.isLoading && isOpen) {
    return null;
  }

  const hasResponses = (request?.responses?.length ?? 0) > 0;
  const statusConfigItem = request
    ? statusConfig[request.status] ||
      statusConfig[RequestStatus.PENDING as RequestStatusValue]
    : statusConfig[RequestStatus.PENDING as RequestStatusValue];

  const typeConfigItem = request
    ? typeConfig[request.type] || { label: request.type, color: 'gray' }
    : { label: '', color: 'gray' };

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialog.Content size="3" className="max-w-3xl rounded-xl shadow-2xl">
        {/* Header */}
        <Flex
          align="center"
          justify="between"
          className="p-4 border-b border-gray-200"
        >
          <AlertDialog.Title>Request Details</AlertDialog.Title>
          <AlertDialog.Cancel>
            <Button variant="ghost" color="gray" size="2" radius="full">
              <X className="w-4 h-4" />
            </Button>
          </AlertDialog.Cancel>
        </Flex>

        {request && (
          <div className="p-6">
            <div className="space-y-6">
              {/* Requester Information */}
              <div className="space-y-4">
                <Text as="div" size="3" weight="bold" className="text-gray-900">
                  Requester Information
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <div>
                      <Text as="div" size="1" className="text-gray-500">
                        Full name
                      </Text>
                      <Text as="div" size="2" className="font-medium">
                        {request.fullName || 'Not specified'}
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <div>
                      <Text as="div" size="1" className="text-gray-500">
                        Email address
                      </Text>
                      <Text as="div" size="2" className="font-medium">
                        {request.email || 'Not specified'}
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <div>
                      <Text as="div" size="1" className="text-gray-500">
                        Phone
                      </Text>
                      <Text as="div" size="2" className="font-medium">
                        {request.phone || 'Not specified'}
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div>
                      <Text as="div" size="1" className="text-gray-500">
                        Address
                      </Text>
                      <Text as="div" size="2" className="font-medium">
                        {request.address || 'Not specified'}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>

              {/* Request Information */}
              <div className="space-y-4">
                <Text as="div" size="3" weight="bold" className="text-gray-900">
                  Request Details
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Text as="div" size="1" className="text-gray-500 mb-1">
                      Reference Number
                    </Text>
                    <Text as="div" size="2" className="font-medium">
                      {request.referenceNumber}
                    </Text>
                  </div>
                  <div>
                    <Text as="div" size="1" className="text-gray-500 mb-1">
                      Subject
                    </Text>
                    <Text as="div" size="2" className="font-medium">
                      {request.subject || 'No subject'}
                    </Text>
                  </div>
                  <div>
                    <Text as="div" size="1" className="text-gray-500 mb-1">
                      Request Type
                    </Text>
                    <Badge color={typeConfigItem.color} size="1" radius="large">
                      {typeConfigItem.label}
                    </Badge>
                  </div>
                  <div>
                    <Text as="div" size="1" className="text-gray-500 mb-1">
                      Status
                    </Text>
                    <Badge
                      color={statusConfigItem.color}
                      size="1"
                      radius="large"
                      className="flex items-center gap-1 w-fit"
                    >
                      {statusConfigItem.icon}
                      {statusConfigItem.label}
                    </Badge>
                  </div>
                  <div>
                    <Text as="div" size="1" className="text-gray-500 mb-1">
                      Creation Date
                    </Text>
                    <Text as="div" size="2" className="font-medium">
                      {DateTime.fromISO(request.createdAt)
                        .setLocale('en')
                        .toFormat('dd/MM/yyyy HH:mm')}
                    </Text>
                  </div>
                  {request.updatedAt && (
                    <div>
                      <Text as="div" size="1" className="text-gray-500 mb-1">
                        Last update
                      </Text>
                      <Text as="div" size="2" className="font-medium">
                        {DateTime.fromISO(request.updatedAt)
                          .setLocale('en')
                          .toFormat('dd/MM/yyyy HH:mm')}
                      </Text>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Text as="div" size="1" className="text-gray-500">
                    Detailed description
                  </Text>
                  <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                    <Text as="p" size="2" className="whitespace-pre-line">
                      {request.details || 'No description provided.'}
                    </Text>
                  </div>
                </div>
              </div>

              {/* Response Section */}
              <Separator size="4" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Text
                    as="div"
                    size="3"
                    weight="bold"
                    className="text-gray-900"
                  >
                    Response History
                  </Text>
                  <Badge variant="soft" color="gray">
                    {hasResponses
                      ? `${request.responses?.length} response(s)`
                      : 'No responses'}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {hasResponses ? (
                    request.responses?.map((response: any) => (
                      <div
                        key={response.id}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <Text
                              as="div"
                              size="2"
                              weight="medium"
                              className="text-gray-900"
                            >
                              {response.isp?.name ||
                                response.employee?.name ||
                                'Support'}
                            </Text>
                            <Text as="div" size="1" className="text-gray-500">
                              {DateTime.fromISO(response.createdAt)
                                .setLocale('en')
                                .toFormat("MMMM dd, yyyy 'at' HH:mm")}
                              {response.updatedAt !== response.createdAt &&
                                ' (edited)'}
                            </Text>
                          </div>
                          {response.isp?.logo && (
                            <img
                              src={response.isp.logo}
                              alt={response.isp.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          )}
                        </div>
                        <div className="mt-3 p-3 bg-white rounded-md border border-gray-200">
                          <Text as="p" size="2" className="whitespace-pre-line">
                            {response.content}
                          </Text>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="text-center">
                        <MessageSquare className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <Text as="p" size="2" className="text-gray-500">
                          There are no responses for this request yet. Be the
                          first to respond.
                        </Text>
                      </div>
                    </div>
                  )}
                </div>

                {/* Response Form */}
                <div className="space-y-3 mt-6">
                  <Text
                    as="div"
                    size="3"
                    weight="bold"
                    className="text-gray-900"
                  >
                    Respond to this request
                  </Text>
                  <TextArea
                    placeholder="Write your response here..."
                    className="min-h-[120px] w-full"
                  />
                  <div className="flex justify-end gap-3 pt-2">
                    <Button
                      variant="soft"
                      color="gray"
                      onClick={() => handleOpenChange(false)}
                    >
                      Cancel
                    </Button>
                    <Button>Send response</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export function RequestDetailsSkeleton() {
  return (
    <div className="max-w-3xl w-full rounded-xl shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>

      <div className="p-6 space-y-6">
        {/* Request Information */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-56" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-40" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-5 w-40" />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>

        {/* Responses */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-40" />
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <Skeleton className="h-24 w-full" />
          </div>

          {/* Add Response */}
          <div className="mt-6 space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-24 w-full" />
            <div className="flex justify-end">
              <Skeleton className="h-9 w-32 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md ${className || ''}`}
    />
  );
}
