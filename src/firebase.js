// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBPHh_s3Fn-f63tTgXASoLHWiUG36Bux-E",
    authDomain: "whatsapp-messenger-de844.firebaseapp.com",
    projectId: "whatsapp-messenger-de844",
    storageBucket: "whatsapp-messenger-de844.appspot.com",
    messagingSenderId: "874244784296",
    appId: "1:874244784296:web:0e49b50e161d681f09429d",
    measurementId: "G-JNFCDPZ9NB"
  };
  
 const firebaseApp = firebase.initializeApp(firebaseConfig);

 const db = firebaseApp.firestore();
 const auth = firebase.auth();
 const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};

  export default db;