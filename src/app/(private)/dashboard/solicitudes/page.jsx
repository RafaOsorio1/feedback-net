'use client';

import { Plus } from 'lucide-react';
import { Fragment } from 'react';
import { CustomButton } from '../../../components/trackerForm';
import { Modal } from '../components/modal';
import SimpleTanStackTable from './components/table';

export default function SolicitudPage() {
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
        />
      </header>

      <section className="w-full shadow-lg rounded-md min-h-7 border border-gray-100">
        <SimpleTanStackTable />
      </section>
    </Fragment>
  );
}
