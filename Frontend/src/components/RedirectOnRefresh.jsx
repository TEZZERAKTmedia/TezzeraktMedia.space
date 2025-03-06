import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectOnRefresh = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = () => {
      navigate('/');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);

  return null;
};

export default RedirectOnRefresh;