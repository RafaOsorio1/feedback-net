import { WebHttpClient } from '../../../lib/ky.client';
import { ApiResponse, ISP } from '../../types';

export default class ISPsService extends WebHttpClient {
  static async getISPs(): Promise<ApiResponse<ISP[]>> {
    const response = await WebHttpClient.client.get('api/isp');
    return response.json();
  }
}
