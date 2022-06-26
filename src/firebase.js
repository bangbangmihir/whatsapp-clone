import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC_a78WfKVhPpwqq4u2d3JOYVfLtf-yQm0",
  authDomain: "whatsapp-clone-6bd40.firebaseapp.com",
  projectId: "whatsapp-clone-6bd40",
  storageBucket: "whatsapp-clone-6bd40.appspot.com",
  messagingSenderId: "71637274335",
  appId: "1:71637274335:web:7bdfd173aed7c10faa636a"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider}

export default db;