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
  [RequestType.PETITION]: 'Petition',
  [RequestType.COMPLAINT]: 'Complaint',
  [RequestType.CLAIM]: 'Claim',
  [RequestType.SUGGESTION]: 'Suggestion',
};

export const RequestTypeDescriptions: Record<RequestTypeValue, string> = {
  [RequestType.PETITION]: 'Request for information, services or procedures',
  [RequestType.COMPLAINT]: 'Expression of dissatisfaction with a service',
  [RequestType.CLAIM]: 'Request for correction or compensation',
  [RequestType.SUGGESTION]: 'Improvement proposal or recommendation',
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
