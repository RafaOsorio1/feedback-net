import { WebHttpClient } from '../../../lib/ky.client';
import { ApiResponse, Employee } from '../../types';

export default class EmployeeServices extends WebHttpClient {
  static async getEmployees(ispId: string): Promise<ApiResponse<Employee[]>> {
    const response = await WebHttpClient.client.get(`api/employee/${ispId}`);
    return response.json();
  }

  static async createEmployee(payload: any): Promise<ApiResponse<Employee>> {
    const response = await WebHttpClient.client.post(`api/employee`, {
      json: payload,
    });
    return response.json();
  }

  static async updateEmployee(
    id: string,
    payload: any,
  ): Promise<ApiResponse<Employee>> {
    const response = await WebHttpClient.client.patch(`api/employee/${id}`, {
      json: payload,
    });
    return response.json();
  }

  static async deleteEmployee(id: string): Promise<ApiResponse<Employee>> {
    const response = await WebHttpClient.client.delete(`api/employee/${id}`);
    return response.json();
  }
}
