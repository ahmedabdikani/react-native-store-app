import firebase from "firebase/app"
import "firebase/storage"

let firebaseApp

var firebaseConfig = {
  apiKey: "AIzaSyAVp-ZY3H7KWVvQMO4TlvrouMV6TAWLQbk",
  authDomain: "suriapp-2f701.firebaseapp.com",
  projectId: "suriapp-2f701",
  storageBucket: "suriapp-2f701.appspot.com",
  messagingSenderId: "143103133078",
  appId: "1:143103133078:web:8165481c87869433b249b7"
};

if(!firebase.apps.length){
  firebaseApp = firebase.initializeApp(firebaseConfig)
}

const storage = firebaseApp?.storage()

export default storage