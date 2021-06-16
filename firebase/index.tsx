import { createContext, FC } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMPluWY37TITVkGONGgnS1xW2q4kd3fX4",
  authDomain: "sarang-jeja-bible-recitation.firebaseapp.com",
  projectId: "sarang-jeja-bible-recitation",
  storageBucket: "sarang-jeja-bible-recitation.appspot.com",
  messagingSenderId: "650223408754",
  appId: "1:650223408754:web:dfed7c75693c14888d54eb",
};

type FireStoreContextProp = {
  firestore?: firebase.firestore.Firestore;
};

export const FireStoreContext = createContext<FireStoreContextProp>({});
FireStoreContext.displayName = "FireStore";

export const FireStoreProvider: FC = ({ children }) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  const db = firebase.firestore();
  return (
    <FireStoreContext.Provider value={{ firestore: db }}>
      {children}
    </FireStoreContext.Provider>
  );
};
