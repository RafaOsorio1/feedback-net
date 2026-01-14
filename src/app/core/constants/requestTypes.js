// src/app/core/constants/requestTypes.js
export const RequestType = {
  PETITION: 'PETITION',
  COMPLAINT: 'COMPLAINT',
  CLAIM: 'CLAIM',
  SUGGESTION: 'SUGGESTION',
};

export const RequestTypeLabels = {
  [RequestType.PETITION]: 'Petition',
  [RequestType.COMPLAINT]: 'Complaint',
  [RequestType.CLAIM]: 'Claim',
  [RequestType.SUGGESTION]: 'Suggestion',
};

export const RequestTypeDescriptions = {
  [RequestType.PETITION]: 'Request for information, services or procedures',
  [RequestType.COMPLAINT]: 'Expression of dissatisfaction with a service',
  [RequestType.CLAIM]: 'Request for correction or compensation',
  [RequestType.SUGGESTION]: 'Improvement proposal or recommendation',
};
export const RequestStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
  CANCELED: 'CANCELED',
};
