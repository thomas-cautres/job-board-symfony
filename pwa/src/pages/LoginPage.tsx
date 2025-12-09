import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import type { LoginCredentials, LoginResponse } from '../types/auth';
import { LoginForm } from '@/components/LoginForm';


const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginCredentials>({
    username: '',
    password: ''
  });

  const loginMutation = useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('Connexion réussie', data);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Erreur de login:', error.message);
    }
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <LoginForm
        className="w-full max-w-sm"
        formData={formData}
        isLoading={loginMutation.isPending}
        error={loginMutation.error}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default LoginPage;
