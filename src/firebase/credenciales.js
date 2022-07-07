// Importa la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Crea una nueva aplicación de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCU_4NmNJUG7r_e5A732ss_i0j-b2VaqcQ",
  authDomain: "flexcom-f033f.firebaseapp.com",
  projectId: "flexcom-f033f",
  storageBucket: "flexcom-f033f.appspot.com",
  messagingSenderId: "853979304082",
  appId: "1:853979304082:web:69671f1e344fa2c182564b"
};

// Inicializa la aplicación y la guarda en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

// Exporta firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
