import {
  ApiResponse,
  RequestDetail,
  RequestResponseEntry,
} from '../../../core/types';
import { WebHttpClient } from '../../../lib/ky.client';

export default class RequestServices extends WebHttpClient {
  static async getRequests(
    ispId: string,
  ): Promise<ApiResponse<RequestDetail[]>> {
    const response = await WebHttpClient.client.get(`api/request/${ispId}`);
    return response.json();
  }

  static async getRequestById(
    requestId: string,
  ): Promise<ApiResponse<RequestDetail>> {
    const response = await WebHttpClient.client.get(
      `api/request/get-one/${requestId}`,
    );
    return response.json();
  }

  static async createResponse({
    content,
    requestId,
    ispId,
  }: {
    content: string;
    requestId: string;
    ispId: string;
  }): Promise<ApiResponse<RequestResponseEntry>> {
    const response = await WebHttpClient.client.post(`api/response`, {
      json: { content, ispId, requestId },
    });
    return response.json();
  }
}
