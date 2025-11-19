import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// GUARDAR UN APUNTE
export async function guardarAunte(titulo, contenido) {
  await addDoc(collection(db, "apuntes"), {
    titulo,
    contenido,
    area,
    nivel,
    fecha: Date.now()
  });
}

// LEER APUNTES
export async function leerApuntes() {
  const snap = await getDocs(collection(db, "apuntes"));
  const lista = [];
  snap.forEach(doc => lista.push({ id: doc.id, ...doc.data() }));
  return lista;
}

