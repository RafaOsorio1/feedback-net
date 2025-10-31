import { WebHttpClient } from '../../../lib/ky.client';

export default class RequestServices extends WebHttpClient {
  static async getRequests(ispId) {
    const response = await WebHttpClient.client.get(`api/request/${ispId}`);
    return response.json();
  }

  static async getRequestById(requestId) {
    const response = await WebHttpClient.client.get(
      `api/request/get-one/${requestId}`,
    );
    return response.json();
  }
}
