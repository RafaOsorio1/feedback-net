'use client';

import {
  Building,
  Clock8,
  MailIcon,
  MapPinnedIcon,
  Phone,
  Wifi,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { CustomButton } from '../../components/trackerForm';

export default function PublicLayout({ children }) {
  const router = useRouter();

  return (
    <Fragment>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <header className="flex flex-row w-full justify-between px-16 py-4 items-center border-b border-solid border-gray-200 bg-white">
          <div className="flex flex-row gap-4 items-center">
            <div className="bg-blue-600 text-white w-10 h-10 flex justify-center items-center rounded-lg">
              <Wifi className="text-[36px]" />
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">FeedbackNet</h1>
              <p className="text-gray-600 font-medium">PQR/S Portal</p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-10">
            <LayoutItem
              Icon={<Phone className="text-gray-600" />}
              label1="01 8000 123 456"
              label={undefined}
            />

            <LayoutItem
              Icon={<MailIcon className="text-gray-600" />}
              label1="soporte@feedbacknet.co"
              label={undefined}
            />
          </div>
        </header>
        <main className="flex flex-col justify-center w-full h-full">
          {children}
        </main>
        <footer className="bg-blue-950 w-full flex flex-col items-center mt-auto">
          <div className="flex flex-row gap-18 justify-center items-start border-b border-solid border-gray-700 py-10 px-8 flex-wrap lg:flex-nowrap">
            <section className="w-lg max-w-sm mb-8 lg:mb-0">
              <div className="flex flex-row items-center gap-3 py-2">
                <div className="bg-blue-600 text-white w-10 h-10 flex justify-center items-center rounded-lg">
                  <Wifi className="text-[36px]" />
                </div>
                <h1 className="text-white font-bold text-lg">FeedbackNet</h1>
              </div>
              <p className="text-white py-3">
                Platform specialized in PQR/S management for internet service
                providers in Colombia. We comply with CRC Resolution 6242 of
                2021.
              </p>
              <p className="text-emerald-300">CRC 6242 Certificate of 2021</p>
            </section>
            <section className="flex flex-col justify-center mb-8 lg:mb-0">
              <h1 className="text-white font-bold text-lg pb-3">Contact</h1>
              <div className="flex flex-col gap-3">
                <LayoutItem
                  Icon={<Phone className="text-white" />}
                  label="01 8000 123 456"
                  label1={undefined}
                />

                <LayoutItem
                  Icon={<MapPinnedIcon className="text-white" />}
                  label="Bogotá, Colombia"
                  label1={undefined}
                />

                <LayoutItem
                  Icon={<Clock8 className="text-white" />}
                  label="Mon - Fri: 8:00 AM - 6:00 PM"
                  label1={undefined}
                />
              </div>
            </section>
            <section className="flex justify-end">
              <div>
                <h1 className="text-white font-bold text-lg pb-3">Legal</h1>
                <p className="text-white pb-3">Terms and Conditions</p>
                <p className="text-white pb-3">Privacy Policy</p>
                <p className="text-white pb-3">Data Processing</p>
                <p className="text-white pb-3">CRC Resolution 6242</p>
              </div>
            </section>
          </div>
          <section className="flex flex-col text-gray-400 justify-center items-center py-9 text-center">
            <p>© 2024 FeedbackNet. All rights reserved.</p>
            <p>
              Certified system for telecommunications regulatory compliance in
              Colombia.
            </p>
          </section>
        </footer>
      </div>
      <div className="fixed bottom-6 right-6 z-50">
        <CustomButton
          Icon={<Building />}
          text="ISP Portal"
          size="3"
          radius="large"
          onClick={() => router.push('/login')}
        />
      </div>
    </Fragment>
  );
}

function LayoutItem({ Icon, label, label1 }) {
  return (
    <div className="flex flex-row gap-1.5 items-center">
      {Icon}
      {label && <p className="text-white">{label}</p>}
      {label1 && (
        <p className="text-gray-600 font-semibold text-[18px]">{label1}</p>
      )}
    </div>
  );
}
