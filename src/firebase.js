import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDZDRkU2YpFKblJ8Yek487z1PakvotIP5k',
  authDomain: 'penta-reddit-clone.firebaseapp.com',
  databaseURL: 'https://penta-reddit-clone.firebaseio.com',
  projectId: 'penta-reddit-clone',
  storageBucket: 'penta-reddit-clone.appspot.com',
  messagingSenderId: '734049778622',
  appId: '1:734049778622:web:af81d6bb7e4ed29dda17ef',
  measurementId: 'G-W8FBG6HEWW',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
