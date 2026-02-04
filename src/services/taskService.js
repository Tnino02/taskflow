import { db } from './firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';

const tasksCollection = collection(db, 'tasks');

export const taskService = {
  // Crear tarea
  createTask: async (task, userId) => {
    const newTask = {
      ...task,
      completed: false,
      createdAt: serverTimestamp(),
      userId: userId
    };
    return await addDoc(tasksCollection, newTask);
  },

  // Obtener tareas del usuario
  getUserTasks: async (userId) => {
    const q = query(tasksCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
    return tasks;
  },

  // Actualizar tarea
  updateTask: async (taskId, updates) => {
    const taskRef = doc(db, 'tasks', taskId);
    return await updateDoc(taskRef, updates);
  },

  // Eliminar tarea
  deleteTask: async (taskId) => {
    const taskRef = doc(db, 'tasks', taskId);
    return await deleteDoc(taskRef);
  },

  // Marcar como completada
  toggleComplete: async (taskId, completed) => {
    return await taskService.updateTask(taskId, { completed });
  }
};