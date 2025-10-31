import { WebHttpClient } from '../../../lib/ky.client';

export default class AuthService extends WebHttpClient {
  static async login({ email, password }) {
    const response = await WebHttpClient.client.post('api/auth/login', {
      json: { email, password },
    });

    return response.json();
  }

  static async register(userData) {
    const response = await WebHttpClient.client.post('api/auth/signup', {
      json: userData,
    });
    return response.json();
  }
}
