import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBmvKvmyI1rriFB3IIfWnL5c-yYShzz1l4",
  authDomain: "todo-list-96880.firebaseapp.com",
  projectId: "todo-list-96880",
  storageBucket: "todo-list-96880.firebasestorage.app",
  messagingSenderId: "156050364586",
  appId: "1:156050364586:web:0aebe4454c092de82358d3"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app) //для работы с firestore database
const auth = getAuth(app) //для рабоыт с авторизацией

export {
  app,
  db,
  auth
}