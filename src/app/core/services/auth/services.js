import { WebHttpClient } from '../../../lib/ky.client';

export default class AuthService extends WebHttpClient {
  static async login(email, password) {
    const response = await WebHttpClient.client.post('/auth/login', {
      json: { email, password },
    });
    return response.json();
  }

  static async test() {
    const response = await WebHttpClient.client.get('api/auth/test');
    return response.json();
  }
}
