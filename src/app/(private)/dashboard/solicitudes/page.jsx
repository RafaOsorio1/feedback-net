'use client';

import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Fragment } from 'react';
import { CustomButton } from '../../../components/trackerForm';
import { useAuth } from '../../../core/AuthContext/context';
import { Modal } from '../components/modal';
import RequestServices from '../core/request.services';
import { RequestDetailsModal } from './components/RequestDetailsModal';
import { RequestsTable } from './components/table';

export default function SolicitudPage() {
  const { isp } = useAuth();
  const requestQuery = useQuery({
    queryKey: ['request', isp?.id || ''],
    queryFn: () => RequestServices.getRequests(isp?.id),
  });

  const tableData = requestQuery.data?.data || [];

  return (
    <Fragment>
      <header className="flex flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gestión de Solicitudes PQR/S</h1>
        <Modal
          button={
            <CustomButton
              size="3"
              radius="large"
              Icon={<Plus />}
              text="Nueva Solicitud"
            />
          }
          isOpen={undefined}
          onOpenChange={undefined}
        />
      </header>

      <section className="w-full shadow-lg rounded-md min-h-7 border border-gray-100">
        <RequestsTable data={tableData} />
      </section>

      {/* Request Details Modal */}
      <RequestDetailsModal />
    </Fragment>
  );
}
