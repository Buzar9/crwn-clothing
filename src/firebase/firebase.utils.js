import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyALen6yRLpA3P9aOPOtuzYQx0wul6H4MMo",
    authDomain: "crwn-db-8d035.firebaseapp.com",
    databaseURL: "https://crwn-db-8d035.firebaseio.com",
    projectId: "crwn-db-8d035",
    storageBucket: "crwn-db-8d035.appspot.com",
    messagingSenderId: "314812852554",
    appId: "1:314812852554:web:9f3d8cb78626e523bd39b3"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
