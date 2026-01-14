import { WebHttpClient } from '../../../lib/ky.client';

export default class RequestFormService extends WebHttpClient {
  static async createRequest(requestData) {
    try {
      const response = await WebHttpClient.client.post('api/request', {
        json: requestData,
      });

      const data = await response.json().catch(() => null); // avoid crash if no body

      console.log('📦 Raw response:', response);
      console.log('🧩 JSON received:', data);

      return data;
    } catch (error) {
      console.error('❌ Error in createRequest:', error);
      throw error;
    }
  }
}
