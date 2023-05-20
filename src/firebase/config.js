import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyABqa8IV5okQj_1akB-K3m3IAuaG-Ux8r8",
  authDomain: "anime-quiz-data.firebaseapp.com",
  projectId: "anime-quiz-data",
  storageBucket: "anime-quiz-data.appspot.com",
  messagingSenderId: "728459233251",
  appId: "1:728459233251:web:64d5901397e962471082d6"
};

// Init firebase
firebase.initializeApp(firebaseConfig)

// Init firestore service
const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

// Export the initialized services
export { projectFirestore, timestamp, projectAuth }