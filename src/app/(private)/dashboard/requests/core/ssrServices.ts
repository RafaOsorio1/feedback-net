import {
  ApiResponse,
  RequestDetail,
  RequestResponseEntry,
} from '../../../../core/types';
import { SsrHttpClient } from '../../../../lib/ky.ssrClient';

export default class RequestServices extends SsrHttpClient {
  static async getRequests(
    ispId: string,
  ): Promise<ApiResponse<RequestDetail[]>> {
    const response = await SsrHttpClient.client.get(`api/request/${ispId}`);

    return response.json<ApiResponse<RequestDetail[]>>();
  }

  static async getRequestById(
    requestId: string,
  ): Promise<ApiResponse<RequestDetail>> {
    const response = await SsrHttpClient.client.get(
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
    const response = await SsrHttpClient.client.post(`api/response`, {
      json: { content, ispId, requestId },
    });
    return response.json();
  }
}
