// src/app/core/constants/requestTypes.js
export const RequestType = {
  PETITION: 'PETITION',
  COMPLAINT: 'COMPLAINT',
  CLAIM: 'CLAIM',
  SUGGESTION: 'SUGGESTION',
};

export const RequestTypeLabels = {
  [RequestType.PETITION]: 'Petición',
  [RequestType.COMPLAINT]: 'Queja',
  [RequestType.CLAIM]: 'Reclamo',
  [RequestType.SUGGESTION]: 'Sugerencia',
};

export const RequestTypeDescriptions = {
  [RequestType.PETITION]: 'Solicitud de información, servicios o trámites',
  [RequestType.COMPLAINT]: 'Manifestación de insatisfacción por un servicio',
  [RequestType.CLAIM]: 'Solicitud de corrección o compensación',
  [RequestType.SUGGESTION]: 'Propuesta de mejora o recomendación',
};
