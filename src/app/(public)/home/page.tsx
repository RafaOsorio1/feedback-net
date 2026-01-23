'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Badge } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { MessageSquare, Search, User } from 'lucide-react';
import { DateTime } from 'luxon';
import { Fragment, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { statusConfig } from '../../(private)/dashboard/components/RecentActivity';
import RequestServices from '../../(private)/dashboard/core/request.services';
import { InputField } from '../../components/input';
import { CustomButton, TrackerForm } from '../../components/trackerForm';
import { ViewToggle } from '../../components/viewToggle';
import { useStore } from '../../core/store';
import { RequestForm } from './components';

const schema = z.object({
  cun: z
    .string()
    .min(1, 'Required field')
    .regex(
      /^PQR-[A-Za-z0-9]{6}$/,
      'Must be in the format PQR-XXXXXX (only numbers and letters after the hyphen)',
    ),
});

type FormData = z.infer<typeof schema>;

export default function Home() {
  const { initialView } = useStore();
  const [cunValue, setCunValue] = useState<string | null>(null);

  const typeConfig: Record<string, { label: string; color: any }> = {
    COMPLAINT: { label: 'Complaint', color: 'red' },
    PETITION: { label: 'Petition', color: 'blue' },
    CLAIM: { label: 'Claim', color: 'orange' },
    SUGGESTION: { label: 'Suggestion', color: 'green' },
  };

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      cun: '',
    },
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['request', cunValue],
    queryFn: () => RequestServices.getRequestById(cunValue!),
    enabled: !!cunValue,
  });

  const onSubmit = (values: FormData) => {
    setCunValue(values.cun);
    refetch();
  };

  return (
    <Fragment>
      <ViewToggle />
      <div className="h-full">
        {initialView === 'form' ? (
          <RequestForm />
        ) : (
          <TrackerForm>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-row justify-between items-end gap-4"
            >
              <div className="flex-1">
                <Controller
                  control={form.control}
                  name="cun"
                  render={({ field, fieldState }) => (
                    <InputField
                      containerClassName="w-full"
                      label="Unique Notification Code (CUN)"
                      required
                      placeholder="Ex: PQR-XXXXXX"
                      error={fieldState.error}
                      helperText={fieldState.error?.message}
                      {...field}
                    />
                  )}
                />
              </div>
              <CustomButton
                Icon={<Search />}
                text={isLoading ? 'Consulting...' : 'Consult'}
                size="3"
                type="submit"
              />
            </form>
            {data?.data && (
              <div id="request-results" className="mt-8 space-y-6">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Request Details
                      </h3>
                      <Badge
                        color={statusConfig[data.data.status]?.color || 'gray'}
                        className="inline-flex items-center gap-1"
                      >
                        {statusConfig[data.data.status]?.icon}
                        {statusConfig[data.data.status]?.label ||
                          data.data.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {data.data.referenceNumber} •{' '}
                      {DateTime.fromISO(data.data.createdAt)
                        .setLocale('en')
                        .toFormat('MMMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Requester
                          </h4>
                          <p className="mt-1">{data.data.fullName}</p>
                          <p className="text-sm text-gray-500">
                            {data.data.email}
                          </p>
                          <p className="text-sm text-gray-500">
                            {data.data.phone}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Request type
                          </h4>
                          <Badge
                            color={typeConfig[data.data.type]?.color || 'gray'}
                            className="mt-1"
                          >
                            {typeConfig[data.data.type]?.label ||
                              data.data.type}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Subject
                          </h4>
                          <p className="mt-1">{data.data.subject}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Service provider
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            {data.data.isp?.logo && (
                              <img
                                src={data.data.isp.logo}
                                alt={data.data.isp.name}
                                className="w-6 h-6 rounded-full"
                              />
                            )}
                            <span>
                              {data.data.isp?.name || 'Not specified'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-500">
                        Description
                      </h4>
                      <p className="mt-2 text-gray-700 whitespace-pre-line">
                        {data.data.details}
                      </p>
                    </div>

                    <div className="mt-8">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-medium text-gray-900">
                          Response History
                        </h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {data.data.responses?.length || 0} responses
                        </span>
                      </div>

                      <div className="mt-4 space-y-4">
                        {data.data.responses &&
                        data.data.responses.length > 0 ? (
                          data.data.responses.map((response: any) => (
                            <div
                              key={response.id}
                              className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                  {response.isp?.logo ? (
                                    <img
                                      src={response.isp.logo}
                                      alt={response.isp.name}
                                      className="w-8 h-8 rounded-full"
                                    />
                                  ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                      <User className="w-4 h-4 text-gray-500" />
                                    </div>
                                  )}
                                  <div>
                                    <p className="font-medium text-sm">
                                      {response.isp?.name || 'Support'}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {DateTime.fromISO(response.createdAt)
                                        .setLocale('en')
                                        .toFormat("MM/dd/yyyy 'at' HH:mm")}
                                      {response.updatedAt !==
                                        response.createdAt && ' (edited)'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <p className="mt-2 text-gray-700 whitespace-pre-line pl-10">
                                {response.content}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 bg-gray-50 rounded-lg">
                            <MessageSquare className="w-8 h-8 mx-auto text-gray-400" />
                            <p className="mt-2 text-sm text-gray-500">
                              No responses for this request yet.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-7 mb-1">
              <h4 className="font-semibold text-blue-900 mb-3">
                How to consult my request?
              </h4>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>
                  • Enter the CUN you received when submitting your request.
                </li>
                <li>• The CUN has the format: PQR-XXXXXX</li>
                <li>
                  • If you cannot find your CUN, check your confirmation email.
                </li>
                <li>• For additional help, contact 01 8000 123 456.</li>
              </ul>
            </div>
          </TrackerForm>
        )}
      </div>
    </Fragment>
  );
}
