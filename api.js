import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore/lite";

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

export async function getVans(id) {
    const url = id ? `/api/vans/${id}` : "/api/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
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