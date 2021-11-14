import { addDoc, setDoc, doc, collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import * as T from "./types"

export function createQueue(course: string, location: string) {
    return addDoc(collection(firestore, "queues"), {
        id: uuidv4(),
        course: course,
        location: location,
        tickets: [],
    })
}

export function persistUser(uid: string, user: T.UserType) {
    setDoc(doc(firestore, "users", uid), user)
}

export function getAdminByID(uid: string) {
    return getDocs(query(collection(firestore, "admins"), where("id", "==", uid)))
}