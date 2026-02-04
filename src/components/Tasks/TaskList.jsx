import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { FilterList, Dashboard, Assignment, CheckCircle, PendingActions } from '@mui/icons-material';

function TaskList() {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      const savedTasks = localStorage.getItem(`tasks_${currentUser?.uid}`);
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      } else {
        setTasks([
          { 
            id: 1, 
            title: 'Bienvenido a TaskFlow', 
            description: 'Esta es tu primera tarea. ¡Márcala como completada cuando termines!', 
            completed: false,
            createdAt: new Date().toISOString().split('T')[0],
            userId: currentUser?.uid
          }
        ]);
      }
      setLoading(false);
    }, 500);
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && tasks.length > 0) {
      localStorage.setItem(`tasks_${currentUser.uid}`, JSON.stringify(tasks));
    }
  }, [tasks, currentUser]);

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'pending') return !task.completed;
    if (activeFilter === 'completed') return task.completed;
    return true;
  });

  const handleAddTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      completed: false,
      userId: currentUser?.uid
    };
    
    setTasks(prev => [...prev, taskWithId]);
    return taskWithId;
  };

  const handleUpdateTask = (id, updatedData) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updatedData } : task
    ));
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      setTasks(prev => prev.filter(task => task.id !== id));
    }
  };

  const pendingCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#4361ee]"></div>
        <p className="mt-4 text-gray-600">Cargando tus tareas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="card mb-6 bg-gradient-to-r from-[#4361ee] to-[#7209b7] text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Assignment className="w-8 h-8" />
                TaskFlow
              </h1>
              <p className="mt-2 opacity-90">
                ¡Hola {currentUser?.email?.split('@')[0]}! Gestiona tus tareas eficientemente
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <Dashboard className="w-5 h-5" />
              <span className="font-medium">Panel de tareas</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar con filtros */}
          <div className="lg:col-span-1 space-y-6">
            {/* Filtros */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <FilterList className="w-6 h-6 text-[#4361ee]" />
                <h2 className="text-xl font-bold text-gray-800">Filtros</h2>
              </div>
              
              <div className="space-y-2">
                {[
                  { key: 'all', label: 'Todas', count: tasks.length, icon: <Assignment className="w-4 h-4" /> },
                  { key: 'pending', label: 'Pendientes', count: pendingCount, icon: <PendingActions className="w-4 h-4" /> },
                  { key: 'completed', label: 'Completadas', count: completedCount, icon: <CheckCircle className="w-4 h-4" /> }
                ].map(({ key, label, count, icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(key)}
                    className={`filter-btn w-full flex items-center justify-between ${
                      activeFilter === key ? 'active' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {icon}
                      <span>{label}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activeFilter === key ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      {count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Estadísticas */}
            <div className="stats-card">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Estadísticas</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="stats-item">
                  <div className="stats-value text-[#4361ee]">{tasks.length}</div>
                  <div className="stats-label">Total</div>
                </div>
                <div className="stats-item">
                  <div className="stats-value text-yellow-500">{pendingCount}</div>
                  <div className="stats-label">Pendientes</div>
                </div>
                <div className="stats-item">
                  <div className="stats-value text-green-500">{completedCount}</div>
                  <div className="stats-label">Completadas</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lista de tareas */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {activeFilter === 'all' ? 'Todas las tareas' : 
                 activeFilter === 'pending' ? 'Tareas pendientes' : 'Tareas completadas'}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({filteredTasks.length} de {tasks.length})
                </span>
              </h2>

              {filteredTasks.length === 0 ? (
                <div className="empty-state">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Assignment className="w-10 h-10 text-[#4361ee]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {activeFilter === 'all' 
                      ? '¡No hay tareas aún!' 
                      : activeFilter === 'pending' 
                        ? '¡No tienes tareas pendientes!' 
                        : '¡No hay tareas completadas!'}
                  </h3>
                  <p className="text-gray-500">
                    {activeFilter === 'all' 
                      ? 'Comienza agregando tu primera tarea usando el formulario.'
                      : 'Cambia al filtro "Todas" para ver todas tus tareas.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onUpdate={handleUpdateTask}
                      onDelete={handleDeleteTask}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Formulario de nueva tarea */}
            <TaskForm onAddTask={handleAddTask} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskList;