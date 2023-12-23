// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {


//     apiKey: import.meta.env.VITE_apiKey,
//     authDomain: import.meta.env.VITE_authDomain,
//     projectId: import.meta.env.VITE_projectId,
//     storageBucket: import.meta.env.VITE_storageBucket,
//     messagingSenderId: import.meta.env.VITE_messagingSenderId,
//     appId: import.meta.env.VITE_appId


// };


// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHvL3mDyuGQzVUe_GN-Q8kRQnlXPgJDnY",
    authDomain: "bdtaskflow.firebaseapp.com",
    projectId: "bdtaskflow",
    storageBucket: "bdtaskflow.appspot.com",
    messagingSenderId: "837786441212",
    appId: "1:837786441212:web:240a1fcab16dbc2a8c8e79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);