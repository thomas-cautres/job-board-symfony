import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');

    const timer = setTimeout(() => {
      navigate('/login', { replace: true });
    }, 500);

    return () => clearTimeout(timer);

  }, [navigate]);

  return <div>Déconnexion en cours...</div>;
};

export default LogoutPage;