import firebase from "firebase/compat/app"
import 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAASAmkPyMQPC-dK7nIulkVWFVbiV1i-Yc",
    authDomain: "auth-ef82e.firebaseapp.com",
    projectId: "auth-ef82e",
    storageBucket: "auth-ef82e.appspot.com",
    messagingSenderId: "465982025794",
    appId: "1:465982025794:web:5c69a6ac6bd0c555cd3ddb",
    measurementId: "G-L5JYBWTHP7"
  };
  
 // Initialize Firebase
firebase.initializeApp(firebaseConfig);

 export const auth = firebase.auth();

 const provider = new firebase.auth.GoogleAuthProvider();
 provider.setCustomParameters({ prompt: 'select_account' });

 export const signInWithGoogle = () => auth.signInWithPopup(provider);

 export default firebase
