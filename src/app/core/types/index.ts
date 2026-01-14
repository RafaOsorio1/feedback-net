// src/app/core/types/index.ts

export interface ISP {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

export interface RequestResponseEntry {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  ispId?: string;
  employeeId?: string;
  isp?: {
    name: string;
    logo?: string;
  };
  employee?: {
    name: string;
  };
}

export interface RequestDetail {
  id: string;
  referenceNumber: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  subject: string;
  details: string;
  type: 'PETITION' | 'COMPLAINT' | 'CLAIM' | 'SUGGESTION';
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CANCELED';
  ispId: string;
  isp?: {
    name: string;
    logo?: string;
  };
  createdAt: string;
  updatedAt: string;
  responses: RequestResponseEntry[];
  respondedBy?: {
    name: string;
    email: string;
  };
}
