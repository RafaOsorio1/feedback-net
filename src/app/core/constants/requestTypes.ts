// src/app/core/constants/requestTypes.ts
export type RequestTypeValue =
  | 'PETITION'
  | 'COMPLAINT'
  | 'CLAIM'
  | 'SUGGESTION';

export const RequestType: Record<string, RequestTypeValue> = {
  PETITION: 'PETITION',
  COMPLAINT: 'COMPLAINT',
  CLAIM: 'CLAIM',
  SUGGESTION: 'SUGGESTION',
};

export const RequestTypeLabels: Record<RequestTypeValue, string> = {
  PETITION: 'Petition',
  COMPLAINT: 'Complaint',
  CLAIM: 'Claim',
  SUGGESTION: 'Suggestion',
};

export const RequestTypeDescriptions: Record<RequestTypeValue, string> = {
  PETITION: 'Request for information, services or procedures',
  COMPLAINT: 'Expression of dissatisfaction with a service',
  CLAIM: 'Request for correction or compensation',
  SUGGESTION: 'Improvement proposal or recommendation',
};

export type RequestStatusValue =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'CANCELED';

export const RequestStatus: Record<string, RequestStatusValue> = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
  CANCELED: 'CANCELED',
};
