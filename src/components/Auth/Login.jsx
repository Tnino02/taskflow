import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Login as LoginIcon, Email, Lock } from '@mui/icons-material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/tasks');
    } catch (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="auth-card animate-fadeIn">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#4361ee] to-[#7209b7] rounded-full flex items-center justify-center">
            <LoginIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Iniciar Sesión</h2>
          <p className="text-gray-600 mt-2">Accede a tu cuenta de TaskFlow</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="form-label flex items-center gap-2">
              <Email className="w-4 h-4" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="tu@email.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-primary w-full flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Cargando...
              </>
            ) : (
              <>
                <LoginIcon className="w-5 h-5" />
                Iniciar Sesión
              </>
            )}
          </button>
        </form>
        
        <div className="auth-links mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-600">
            ¿No tienes cuenta? 
            <Link to="/register" className="text-[#4361ee] font-medium ml-2 hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;