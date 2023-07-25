import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBBU-AaLITtEL-ZG1q_CNAKgsMsxKtxoO4",
  authDomain: "vanlife-6c01f.firebaseapp.com",
  projectId: "vanlife-6c01f",
  storageBucket: "vanlife-6c01f.appspot.com",
  messagingSenderId: "467889402818",
  appId: "1:467889402818:web:33bc16e88bbca8c9ecdc5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Refactoring the fetching functions below

const vansCollection = collection(db, "vans");

export async function getVans() {
    const snapshot = await getDocs(vansCollection);
    const vansArray = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vansArray

}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)

    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}