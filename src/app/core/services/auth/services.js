import { WebHttpClient } from '../../../lib/ky.client';

export default class AuthService extends WebHttpClient {
  static async login(email, password) {
    console.log('email, password', email, password);

    try {
      const response = await WebHttpClient.client.post('api/auth/login', {
        json: { email, password },
      });
      return response.json();
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw new Error(error.message || 'Error al iniciar sesión');
    }
  }

  static async register(userData) {
    try {
      const response = await WebHttpClient.client.post('api/auth/signup', {
        json: userData,
      });
      return response.json();
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw new Error(error.message || 'Error al registrar el usuario');
    }
  }
}
