// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// AUTENTIFICACION
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut  } from 'firebase/auth'

import { getFirestore, doc, setDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

// Storage o Almacenamiento
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5gOjDlYXYxoMhXXHYvKJckOP62LHDz8Q",
  authDomain: "para-practicar-27253.firebaseapp.com",
  projectId: "para-practicar-27253",
  storageBucket: "para-practicar-27253.appspot.com",
  messagingSenderId: "205252703958",
  appId: "1:205252703958:web:013e7dadb3c85ecc353b77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore();

const storage = getStorage();

// CREAR USUARIO
export const crearUsuario = async (email, password) => {
  	try {
    	const user = await createUserWithEmailAndPassword(auth, email, password);
    	return user.user.email;
   } catch (error) {
    	console.log(error.code)
      return error.code;
   }
}

// INICIAR SESION
export const iniciarSesion = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user.user.email
  } catch (error) {
    console.log(error.code)
    return error.code;
  }
}

// AUTENTIFICACION CON GOOGLE
export const autentificacionGoggle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider);
    return user.user.email;
  } catch (error) {
    console.log(error.code)
    return error.code;
  }
}

// AUTO INICIO DE SESION
// export const autoInicioSesion = async () => {
//   onAuthStateChanged(auth, (user) => {
//     if(user){
//       return user.email;
//     }else {
      
//     }
//   })
// }

// CERRAR SESION
export const cerrarSesion = async () => {
  await signOut(auth)
}


////////////////////   BASE DE DATOS

// Crear documento
export const agregarDocumento = async (coleccion, id, info) => {

  console.log(info)
  try {
    await setDoc(doc(db, coleccion, id ), {
      id: id,
      nombre: info.nombre,
      apellidos: info.apellidos,
      empresa: info.empresa,
      telefono: info.telefono,
      email: info.email,
      comentario: info.comentario,
      img:info.img,
    });
    return 'bien';
  } catch (error) {
    return error.code;
  }
}

// Obtener Datos
export const obtenerDatos = async (user) => {
  const querySnapshot = await getDocs(collection(db, `contactos-${user}`));
  let datos = [];
  querySnapshot.forEach((data)=>{
    datos.push(data.data());
  });
  return datos;
}

// Actualizar Dato 
export const actualizarDato = async (collecion, documento, info) => {

  const docRef = doc(db, collecion, documento )

  await updateDoc(docRef, {
    nombre: info.nombre,
    apellidos: info.apellidos,
    empresa: info.empresa,
    telefono: info.telefono,
    email: info.email,
    comentario: info.comentario,
    img: info.img
  });
}

// Borrar Dato 
export const borrarDato = async (collecion, documento) => {
  await deleteDoc(doc(db, collecion, documento));
}


//////////////////////////////////////// Almacenamiento Imagenes
// Subir imagen
export const subirImagen = async (carpetaYArchivo, imgFile) => {
  try {
    const imgRef = ref(storage, carpetaYArchivo);
    await uploadBytes( imgRef, imgFile);
    console.log('imagen subida con exito');
    return 'bien';
  } catch (error) {
    console.log(error);
    return error.code;
  }
}

// Obtener Imagen
export const obtenerImagen = async (imgRef) => {
  const res = await getDownloadURL(ref(storage, imgRef));
  return res;
}

// Borrar Imagen
export const borrarImagen = async (imgRef) => {
  const desertRef = ref(storage, imgRef)
  await deleteObject(desertRef);
}