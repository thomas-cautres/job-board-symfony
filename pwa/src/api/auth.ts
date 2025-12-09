import { ApiClient } from "./client";
import type { LoginCredentials, LoginResponse } from '../types/auth';

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  return ApiClient.request<LoginResponse>('/api/login_check', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};
