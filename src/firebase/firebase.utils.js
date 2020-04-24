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

export const createUserProfileDocument = async (userAuth, additionalData) => {

    // jezeli userAuth jest nullem to metoda kończy działanie
    if(!userAuth) return;

    // znajduje referencje w bazie danych (referencje są obiektem)
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    //pobiera dane dla podanych referencji (pobiera jako obiekt)
    const snapShot = await userRef.get();

    //sprawdza czy takie dane istnieją
    if(!snapShot.exists) {
        //jeżeli nie istnieją to tworzy nowy obiekt do zapisania
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        //próbuje zapisać nowy obiekt jako dokument w bazie danych
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        //    jeżeli się nie uda wywala błąd
        }catch (error) {
            console.log('error creating user', error.message);
        }
    }

    //na końcu zawsze zwraca referencje (które od początku są obiektem)
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
