import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signInWithPopup, signInWithRedirect, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCdvMq1k_TEekWQg-lhvepuMDdPGxQt0s4",
  authDomain: "crypto-4dd98.firebaseapp.com",
  projectId: "crypto-4dd98",
  storageBucket: "crypto-4dd98.appspot.com",
  messagingSenderId: "12449471759",
  appId: "1:12449471759:web:b42f237310b3ce3a7c727a"
};

const app = initializeApp(firebaseConfig);

const GoogleProvider = new GoogleAuthProvider();

GoogleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth();
export const db = getFirestore()

export const signInWithGooglePopup = () => signInWithPopup(auth, GoogleProvider);


export const createUserDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
      console.log('User Doc created')
    } catch (error) {
      console.error('Error setting user Doc')
    }
  }
  return userDocRef
}

export const createUserFromAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)

}
export const signInUsingEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutAccount = () => signOut(auth)