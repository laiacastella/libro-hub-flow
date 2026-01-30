// src/lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Tu configuración tal cual te la da Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBi-ucn8KgE3TrRwv2Ld3JIiF5ZadStuYU",
    authDomain: "librohubflow.firebaseapp.com",
    projectId: "librohubflow",
    storageBucket: "librohubflow.firebasestorage.app",
    messagingSenderId: "249603977235",
    appId: "1:249603977235:web:9e731e443621336f198fe6",
    measurementId: "G-F14NDTD32K",
};

// Inicializa Firebase solo si no hay otra app
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Exporta Firestore
export const db = getFirestore(app);

// Exporta Analytics (opcional)
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
