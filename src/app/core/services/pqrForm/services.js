import { WebHttpClient } from '../../../lib/ky.client';

export default class PqrFormService extends WebHttpClient {
  static async createPqr(pqrData) {
    try {
      const response = await WebHttpClient.client.post('api/request', {
        json: pqrData,
      });

      const data = await response.json().catch(() => null); // evita crash si no hay body

      console.log('📦 Respuesta bruta:', response);
      console.log('🧩 JSON recibido:', data);

      return data;
    } catch (error) {
      console.error('❌ Error en createPqr:', error);
      throw error;
    }
  }
}
