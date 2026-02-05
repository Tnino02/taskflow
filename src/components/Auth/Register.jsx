import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  AppRegistration, 
  Email, 
  Lock, 
  Person,
  CheckCircle 
} from '@mui/icons-material';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      return setError('Las contraseñas no coinciden');
    }
    
    if (formData.password.length < 6) {
      return setError('La contraseña debe tener al menos 6 caracteres');
    }

    try {
      setError('');
      setLoading(true);
      await register(formData.email, formData.password, formData.name);
      navigate('/tasks');
    } catch (error) {
      setError('Error al crear la cuenta. Intenta de nuevo.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="auth-card animate-fadeIn w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <AppRegistration className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Crear Cuenta</h2>
          <p className="text-gray-600 mt-2">Únete a TaskFlow y organiza tus tareas</p>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div className="form-group">
            <label className="form-label flex items-center gap-2">
              <Person className="w-5 h-5 text-blue-500" />
              Nombre completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Tu nombre"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label flex items-center gap-2">
              <Email className="w-5 h-5 text-blue-500" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="tu@email.com"
              required
            />
          </div>

          {/* Contraseña */}
          <div className="form-group">
            <label className="form-label flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-500" />
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="••••••••"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Mínimo 6 caracteres
            </p>
          </div>

          {/* Confirmar Contraseña */}
          <div className="form-group">
            <label className="form-label flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              Confirmar Contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Botón de registro */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creando cuenta...
              </>
            ) : (
              <>
                <AppRegistration className="w-5 h-5" />
                Registrarse
              </>
            )}
          </button>
        </form>

        {/* Enlace para login */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            ¿Ya tienes cuenta?
            <Link 
              to="/" 
              className="text-blue-600 font-semibold ml-2 hover:text-blue-800 hover:underline transition-colors"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>

        {/* Términos y condiciones */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Al registrarte, aceptas nuestros
            <a href="#" className="text-blue-500 hover:underline ml-1">Términos</a>
            <span className="mx-1">y</span>
            <a href="#" className="text-blue-500 hover:underline">Política de Privacidad</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;