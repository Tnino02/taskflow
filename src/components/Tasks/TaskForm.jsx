import React, { useState } from 'react';
import { AddCircleOutline, Title, Description, Send, KeyboardReturn } from '@mui/icons-material';

function TaskForm({ onAddTask }) {
  const [newTask, setNewTask] = useState({
    title: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newTask.title.trim() === '') {
      alert('Por favor ingresa un título para la tarea');
      return;
    }
    
    const taskData = {
      title: newTask.title.trim(),
      description: newTask.description.trim()
    };
    
    onAddTask(taskData);
    
    // Limpiar formulario
    setNewTask({
      title: '',
      description: ''
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-6 animate-fadeIn">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-white/20 rounded-full">
          <AddCircleOutline className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">Nueva Tarea</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Título */}
        <div className="relative group">
          <div className="absolute left-4 top-4 text-white/80">
            <Title className="w-5 h-5" />
          </div>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
            placeholder="¿Qué necesitas hacer hoy?"
            required
          />
          {/* Contador de caracteres con color blanco */}
          <div className="absolute right-4 top-4 text-white/60 text-sm">
            {newTask.title.length}/100
          </div>
        </div>
        
        {/* Descripción */}
        <div className="relative group">
          <div className="absolute left-4 top-4 text-white/80">
            <Description className="w-5 h-5" />
          </div>
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all min-h-[120px] resize-y"
            placeholder="Agrega detalles importantes... (opcional)"
            rows="3"
          />
        </div>
        
        {/* Botón y shortcuts */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white/70 text-sm flex items-center gap-2">
            <KeyboardReturn className="w-4 h-4" />
            <span className="text-white">Ctrl + Enter para agregar rápidamente</span>
          </div>
          
          <button
            type="submit"
            disabled={!newTask.title.trim()}
            className={`
              flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg
              transition-all duration-300 transform hover:scale-105
              ${newTask.title.trim()
                ? 'bg-white text-blue-600 hover:bg-gray-100 hover:shadow-2xl'
                : 'bg-white/30 text-white/50 cursor-not-allowed'}
            `}
          >
            <Send className="w-6 h-6" />
            Agregar Tarea
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;