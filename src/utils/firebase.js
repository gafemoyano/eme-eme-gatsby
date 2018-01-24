import * as firebase from "firebase"

const config = {
  apiKey: "AIzaSyBrJ3MHEoebcqIzaBD-WWMGtXmUkAbv5F8",
  authDomain: "eme-eme.firebaseapp.com",
  databaseURL: "https://eme-eme.firebaseio.com",
  storageBucket: "eme-eme.appspot.com",
  messagingSenderId: "1046357356195"
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase
