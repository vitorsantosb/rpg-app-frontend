import {AxiosService} from '@/services/axios.service.ts';
import {StorageSystem} from '../storage';

const api = new AxiosService('http://localhost:4000');

export async function loginUser(email: string, password: string) {
  try {
    const response = await api.post<LoginResponse>('/user/login', {
      email,
      password,
    });

    if (response.status === 200 && response.data?.request?.token) {
      const token = response.data.request.token;

      const storage = new StorageSystem('userData');
      storage.set('auth_token', token);

      api.setUserJWT(token);

      return { success: true, token };
    }

    return { success: false };
  } catch (err) {
    console.error('Failure to store user token:', err);
    return { success: false, error: err };
  }
}
