import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      return setError('Por favor completa todos los campos');
    }
    
    if (password !== confirmPassword) {
      return setError('Las contraseñas no coinciden');
    }
    
    if (password.length < 6) {
      return setError('La contraseña debe tener al menos 6 caracteres');
    }
    
    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/tasks');
    } catch (error) {
      setError('Error al crear la cuenta. Intenta con otro email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Crear Cuenta</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>
        
        <div className="auth-links">
          <span>¿Ya tienes cuenta?</span>
          <Link to="/">Inicia sesión aquí</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;