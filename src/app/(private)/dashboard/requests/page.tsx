import { Plus } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { Fragment, Suspense } from 'react';
import { CustomButton } from '../../../components/trackerForm';
import { Modal } from '../components/modal';
import {
  RequestDetailsModal,
  RequestDetailsSkeleton,
} from './components/RequestDetailsModal';
import { ResponseModal } from './components/responseModal';
import { RequestsTable } from './components/table';
import SsrRequestServices from './core/ssrServices';

//how is this working?!!!

export default async function RequestPage() {
  await connection();

  const cookieStore = await cookies();
  const ispCookie = cookieStore.get('isp')?.value;

  if (!ispCookie) {
    redirect('/login');
  }

  let ispId = '';
  try {
    const isp = JSON.parse(ispCookie);
    ispId = isp.id;
  } catch {
    ispId = ispCookie;
  }

  const tableData = (await SsrRequestServices.getRequests(ispId)).data;

  return (
    <Fragment>
      <header className="flex flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">PQR/S Request Management</h1>
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

      <section className="w-full shadow-lg rounded-md min-h-7 border border-gray-100">
        <RequestsTable data={tableData} />
      </section>

      {/* Request Details Modal */}
      <Suspense fallback={<RequestDetailsSkeleton />}>
        <RequestDetailsModal />
      </Suspense>
      <ResponseModal />
    </Fragment>
  );
}
