import { WebHttpClient } from '../../../lib/ky.client';

export default class PqrFormService extends WebHttpClient {
  static async createPqr(pqrData) {
    const response = await WebHttpClient.client.post('api/request', {
      json: pqrData,
    });
    return response.json();
  }
}
