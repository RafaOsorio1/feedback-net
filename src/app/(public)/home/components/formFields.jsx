'use client';

import { PersonalInfoStep } from './PersonalInfoStep.jsx';
import { RequestDetailsStep } from './RequestDetailsStep.jsx';
import { RequestTypeStep } from './RequestTypeStep.jsx';

export function FormFields() {
  return (
    <div className="bg-white rounded-b-lg shadow-xl p-6">
      <RequestTypeStep />
      <PersonalInfoStep />
      <RequestDetailsStep />
    </div>
  );
}
