import React, { useState } from 'react';
import {
  CheckCircle,
  RadioButtonUnchecked,
  Edit,
  Delete,
  MoreVert,
  CalendarToday,
  AccessTime,
  Save,
  Cancel,
  Check,
  Clear,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';

function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleToggleComplete = () => {
    onUpdate(task.id, { completed: !task.completed });
  };

  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      onUpdate(task.id, {
        title: editedTitle,
        description: editedDescription
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      onDelete(task.id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Hoy';
    if (diffInDays === 1) return 'Ayer';
    if (diffInDays < 7) return `Hace ${diffInDays} días`;
    if (diffInDays < 30) return `Hace ${Math.floor(diffInDays / 7)} semanas`;
    return `Hace ${Math.floor(diffInDays / 30)} meses`;
  };

  return (
    <div className={`
      group bg-white rounded-xl shadow-sm border-l-4 hover:shadow-lg transition-all duration-300
      ${task.completed 
        ? 'border-green-500 bg-gradient-to-r from-green-50 to-white opacity-90' 
        : 'border-primary-500 hover:border-primary-600'}
      hover:transform hover:-translate-y-1
    `}>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          {/* Checkbox */}
          <button
            onClick={handleToggleComplete}
            className={`flex-shrink-0 mt-1 p-2 rounded-full transition-colors ${
              task.completed 
                ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >
            {task.completed ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <RadioButtonUnchecked className="w-6 h-6" />
            )}
          </button>

          {/* Contenido */}
          <div className="flex-grow min-w-0">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-primary-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  placeholder="Título de la tarea"
                  autoFocus
                />
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  placeholder="Descripción (opcional)"
                  rows="3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Guardar
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <Cancel className="w-4 h-4" />
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-grow">
                    <h3 className={`
                      text-lg font-semibold mb-2 transition-colors
                      ${task.completed 
                        ? 'text-gray-500 line-through decoration-2' 
                        : 'text-gray-800'}
                    `}>
                      {task.title}
                    </h3>
                    
                    {task.description && (
                      <div className="mt-3">
                        <button
                          onClick={() => setIsExpanded(!isExpanded)}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 mb-2"
                        >
                          {isExpanded ? (
                            <ExpandLess className="w-4 h-4" />
                          ) : (
                            <ExpandMore className="w-4 h-4" />
                          )}
                          {isExpanded ? 'Ver menos' : 'Ver descripción'}
                        </button>
                        
                        {isExpanded && (
                          <p className="text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
                            {task.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVert />
                  </button>
                </div>

                {/* Metadata y acciones */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-100">
                  {/* Metadata */}
                  <div className="flex items-center gap-4">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      task.completed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {task.completed ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <AccessTime className="w-3 h-3" />
                      )}
                      {task.completed ? 'Completada' : 'Pendiente'}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <CalendarToday className="w-4 h-4" />
                      <span>{getTimeAgo(task.createdAt)}</span>
                      <span className="text-gray-300">•</span>
                      <span>{formatDate(task.createdAt)}</span>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      disabled={task.completed}
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>
                    
                    <button
                      onClick={handleToggleComplete}
                      className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                        task.completed
                          ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                          : 'bg-green-50 text-green-600 hover:bg-green-100'
                      }`}
                    >
                      {task.completed ? (
                        <>
                          <Clear className="w-4 h-4" />
                          Pendiente
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Completar
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={handleDelete}
                      className="flex items-center gap-2 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Delete className="w-4 h-4" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;