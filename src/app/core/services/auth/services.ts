import { WebHttpClient } from '../../../lib/ky.client';
import { ApiResponse, ISP } from '../../types';

export default class AuthService extends WebHttpClient {
  static async login({ email, password }: any): Promise<ApiResponse<ISP>> {
    const response = await WebHttpClient.client.post('api/auth/login', {
      json: { email, password },
    });

    return response.json();
  }

  static async register(userData: any): Promise<ApiResponse<ISP>> {
    const response = await WebHttpClient.client.post('api/auth/signup', {
      json: userData,
    });
    return response.json();
  }
}
