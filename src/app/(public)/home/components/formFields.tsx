'use client';

import { PersonalInfoStep } from './PersonalInfoStep';
import { RequestDetailsStep } from './RequestDetailsStep';
import { RequestTypeStep } from './RequestTypeStep';

export function FormFields() {
  return (
    <div className="bg-white rounded-b-lg shadow-xl p-6">
      <RequestTypeStep />
      <PersonalInfoStep />
      <RequestDetailsStep />
    </div>
  );
}
