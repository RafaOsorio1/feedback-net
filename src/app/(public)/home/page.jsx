// src/app/(public)/home/page.jsx
'use client';

import { Fragment } from 'react';
import { ViewToggle } from '../../components/viewToggle';
import { useStore } from '../../core/store';
import { PqrForm } from './components';

export default function Home() {
  const { initialView } = useStore();

  return (
    <Fragment>
      <ViewToggle />
      <div className="h-full">
        {initialView === 'form' ? <PqrForm /> : null}
      </div>
    </Fragment>
  );
}
