import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';   //  para conectar o banco de dados

const firebaseConfig = {
  apiKey: "AIzaSyDJ6uRi3h-FNrI-9gwX2kHkk88NWJsRPVU",
  authDomain: "app-tarefas-plus.firebaseapp.com",
  projectId: "app-tarefas-plus",
  storageBucket: "app-tarefas-plus.appspot.com",
  messagingSenderId: "486772903214",
  appId: "1:486772903214:web:0290896f812a5d9544bebf"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };