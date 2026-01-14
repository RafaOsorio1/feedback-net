'use client';

import { useQuery } from '@tanstack/react-query';
import { ChartColumnIncreasing, Clock, Plus, TrendingUp } from 'lucide-react';
import { Fragment } from 'react';
import { CustomButton } from '../../components/trackerForm';
import { useAuth } from '../../core/AuthContext/context';
import { Modal } from './components/modal';
import { Pqrs } from './components/RecentActivity';
import { StatsSection } from './components/statsSection';
import RequestServices from './core/request.services';

export default function DashboardPage() {
  const { isp } = useAuth();

  const requestQuery = useQuery({
    queryKey: ['request', isp?.id || ''],
    queryFn: () => RequestServices.getRequests(isp?.id!),
    enabled: !!isp?.id,
  });

  return (
    <Fragment>
      <header className="flex flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          Dashboard - {isp?.name || 'My ISP'}
        </h1>
        <Modal
          button={
            <CustomButton
              size="3"
              radius="large"
              Icon={<Plus />}
              text="New Request"
            />
          }
          isOpen={undefined}
          onOpenChange={undefined}
        />
      </header>
      <StatsSection />
      <section className="grid grid-cols-12 gap-4">
        <section className="col-span-8 flex flex-col flex-1">
          <div className="flex flex-col mt-4 border border-gray-200 rounded-2xl shadow-sm overflow-hidden h-full">
            <header className="flex flex-row items-center gap-4 w-full border-b border-gray-200 p-4 bg-white z-10">
              <Clock className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold">Recent Activity</h3>
            </header>
            {/* Scrollable container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-600px)]">
              {requestQuery.data?.data?.map((request) => (
                <Pqrs
                  key={request.id}
                  subject={request.subject}
                  fullName={request.fullName}
                  status={request.status}
                  type={request.type}
                  createdAt={request.createdAt}
                  isp={request.isp}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="col-span-4 mt-4 flex flex-col gap-4 border border-gray-200 rounded-2xl shadow-sm p-4">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
          <Modal
            button={
              <CustomButton
                size="3"
                radius="large"
                variant="soft"
                Icon={<Plus />}
                text="New PQR/S Request"
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                }}
              />
            }
            isOpen={undefined}
            onOpenChange={undefined}
          />
          <CustomButton
            size="3"
            radius="large"
            variant="soft"
            Icon={<ChartColumnIncreasing />}
            text="Generate report"
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
            }}
          />
          <CustomButton
            size="3"
            radius="large"
            variant="soft"
            Icon={<TrendingUp />}
            text="View Analytics"
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
            }}
          />
        </section>
      </section>
    </Fragment>
  );
}
