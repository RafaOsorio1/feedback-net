import { WebHttpClient } from '../../../lib/ky.client';

export default class RequestServices extends WebHttpClient {
  static async getRequests(ispId) {
    const response = await WebHttpClient.client.get(`api/request/${ispId}`);
    return response.json();
  }
}
