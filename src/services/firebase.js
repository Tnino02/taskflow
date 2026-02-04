import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ¡USA ESTA CONFIGURACIÓN EXACTA!
const firebaseConfig = {
  apiKey: "AIzaSyBdzoacZaU8zYqm6t_Lw5vWfF6qohko9rI",  // ← ¡ESTA ES LA CORRECTA!
  authDomain: "taskflow-b7879.firebaseapp.com",
  projectId: "taskflow-b7879",
  storageBucket: "taskflow-b7879.firebasestorage.app",
  messagingSenderId: "468204891720",
  appId: "1:468204891720:web:833c0b3a3d7f9fb43bb27d",
  measurementId: "G-9G35HNSL8P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
