import { WebHttpClient } from '../../../lib/ky.client';
import { ApiResponse, RequestDetail } from '../../types';

export default class RequestFormService extends WebHttpClient {
  static async createRequest(
    requestData: any,
  ): Promise<ApiResponse<RequestDetail>> {
    try {
      const response = await WebHttpClient.client.post('api/request', {
        json: requestData,
      });

      const data = (await response
        .json()
        .catch(() => null)) as ApiResponse<RequestDetail>;

      console.log('📦 Raw response:', response);
      console.log('🧩 JSON received:', data);

      return data;
    } catch (error) {
      console.error('❌ Error in createRequest:', error);
      throw error;
    }
  }
}
