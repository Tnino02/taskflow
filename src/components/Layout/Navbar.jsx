import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Logout, Dashboard, Person } from '@mui/icons-material';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <Link 
          to={currentUser ? "/tasks" : "/"} 
          className="flex items-center gap-2 text-xl font-bold text-[#4361ee]"
        >
          <Dashboard className="w-6 h-6" />
          <span>TaskFlow</span>
        </Link>
        
        {currentUser && (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
              <Person className="w-4 h-4 text-[#4361ee]" />
              <span className="text-sm text-gray-600">{currentUser.email}</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="btn-danger flex items-center gap-2"
            >
              <Logout className="w-4 h-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;