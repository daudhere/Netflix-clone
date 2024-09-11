import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyBR54CIFnA8Lu_5HIAYoLDVqWD89gbEjkE",
  authDomain: "netflix-clone-2022e.firebaseapp.com",
  projectId: "netflix-clone-2022e",
  storageBucket: "netflix-clone-2022e.appspot.com",
  messagingSenderId: "93233065384",
  appId: "1:93233065384:web:eb1896ab0687ba30a3419d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch(error){

            console.log(error);
            toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = () => {
        signOut(auth);
}

export {auth, db, login, signup, logout};