'use client';

import { MoveLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CustomButton } from '../../components/trackerForm';

export default function LoginLayout({ children }) {
  const router = useRouter();
  return (
    <section className="flex justify-center items-center w-full h-screen bg-blue-700">
      {children}
      <div className="fixed bottom-6 left-6">
        <CustomButton
          Icon={<MoveLeft />}
          text="Portal publico"
          size="2"
          radius="large"
          color="gray"
          onClick={() => {
            router.push('/home');
          }}
        />
      </div>
    </section>
  );
}
