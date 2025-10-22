// src/app/(public)/home/page.jsx
'use client';

import { ViewToggle } from '../../components/viewToggle';
import { useStore } from '../../core/store';
import { PqrForm } from './components';

export default function Home() {
  const { initialView } = useStore();

  return (
    <main className="min-h-screen bg-gray-100">
      <ViewToggle />
      <div className="container mx-auto px-4 py-8">
        {initialView === 'form' ? <PqrForm /> : null}
      </div>
    </main>
  );
}
