import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

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
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl text-white">👤</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Crear Cuenta</h2>
          <p className="text-gray-600 mt-2">Comienza a organizar tus tareas hoy</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r">
            <p className="text-red-700 flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              <span className="flex items-center gap-2">
                <span className="text-blue-500">👤</span>
                Nombre completo
              </span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Tu nombre"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              <span className="flex items-center gap-2">
                <span className="text-blue-500">📧</span>
                Email
              </span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="tu@email.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              <span className="flex items-center gap-2">
                <span className="text-blue-500">🔒</span>
                Contraseña
              </span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="••••••••"
              required
            />
            <p className="mt-1 text-xs text-gray-500 ml-7">
              Mínimo 6 caracteres
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              <span className="flex items-center gap-2">
                <span className="text-blue-500">✓</span>
                Confirmar Contraseña
              </span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creando cuenta...
              </>
            ) : (
              <>
                <span className="text-lg">📝</span>
                Registrarse
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
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

        {/* Security Note - Versión simplificada sin enlaces problemáticos */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700 flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">🔐</span>
            <span>Tu información está segura con nosotros. Usamos encriptación para proteger tus datos.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;