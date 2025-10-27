import { WebHttpClient } from '../../../lib/ky.client';

export default class ISPsService extends WebHttpClient {
  static async getISPs() {
    const response = await WebHttpClient.client.get('api/isp');
    return response.json();
  }
}
