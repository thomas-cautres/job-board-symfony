import type {LoginCredentials, LoginResponse} from '../types/auth';

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetch('/api/login_check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Échec de l\'authentification');
  }

  return response.json();
};
