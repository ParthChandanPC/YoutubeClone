import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBkcDnhJ6uJyJW7LNlFKI7priMf3eujW3U",
    authDomain: "ytclonepc.firebaseapp.com",
    projectId: "ytclonepc",
    storageBucket: "ytclonepc.appspot.com",
    messagingSenderId: "1034104710979",
    appId: "1:1034104710979:web:d799b679c2ce2af9d0b1f6"
  };

firebase.initializeApp(firebaseConfig)
export default firebase.auth