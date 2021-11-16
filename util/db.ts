import {
    doc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    collection,
    query,
    where,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
import { firestore } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import * as T from "./types";

// --------------------------------------------------------------------
// CONSTANTS
// --------------------------------------------------------------------

const USERS = "users";
const ADMINS = "admins";
const COURSES = "courses";
const QUEUES = "queues";
const TICKETS = "tickets";

// --------------------------------------------------------------------
// USERS
// --------------------------------------------------------------------

export function setUser(uid: string, user: T.UserType) {
    return setDoc(doc(firestore, USERS, uid), user);
}

export function getUser(uid: string) {
    return getDoc(doc(firestore, USERS, uid));
}

export function getAdminByID(uid: string) {
    return getDocs(
        query(collection(firestore, ADMINS), where("id", "==", uid))
    );
}

export function isTaFor(uid: string, cid: string) {
    return getDocs(query(
        collection(firestore, COURSES),
        where("id", "==", cid),
        where("tas", "array-contains", uid)
    ));
}

export function isHtaFor(uid: string, cid: string) {
    return getDocs(query(
        collection(firestore, COURSES),
        where("id", "==", cid),
        where("htas", "array-contains", uid)
    ));
}

// --------------------------------------------------------------------
// COURSES
// --------------------------------------------------------------------

export function createCourse(name: string, code: string) {
    return setCourse(uuidv4(), name, code, [], []);
}

export function setCourse(
    id: string,
    name: string,
    code: string,
    htas: string[],
    tas: string[]
) {
    return setDoc(doc(firestore, COURSES, id), {
        id: id,
        name: name,
        code: code,
        htas: htas,
        tas: tas,
    });
}

export function getCourse(id: string) {
    return getDoc(doc(firestore, COURSES, id));
}

export function addTA(course_id: string, ta: string) {
    return updateDoc(doc(firestore, COURSES, course_id), {
        tas: arrayUnion(ta),
    });
}

export function removeTA(course_id: string, ta: string) {
    return updateDoc(doc(firestore, COURSES, course_id), {
        tas: arrayRemove(ta),
    });
}

export function addHTA(course_id: string, hta: string) {
    return updateDoc(doc(firestore, COURSES, course_id), {
        htas: arrayUnion(hta),
    });
}

export function removeHTA(course_id: string, hta: string) {
    return updateDoc(doc(firestore, COURSES, course_id), {
        htas: arrayRemove(hta),
    });
}

export function removeCourse(id: string) {
    return deleteDoc(doc(firestore, COURSES, id));
}

// --------------------------------------------------------------------
// QUEUES
// --------------------------------------------------------------------

export function createQueue(course: string, location: string) {
    return setQueue(uuidv4(), course, location);
}

export function setQueue(id: string, course: string, location: string) {
    return setDoc(doc(firestore, QUEUES, id), {
        id: id,
        course: course,
        location: location,
        tickets: [],
    });
}

export function getQueue(id: string) {
    return getDoc(doc(firestore, QUEUES, id));
}

export function getQueuesByCourse(course: string) {
    return getDocs(
        query(collection(firestore, QUEUES), where("course", "==", course))
    );
}

export function removeQueue(id: string) {
    getQueue(id).then((q) => {
        if (!q) return;
        for (let x of q.data()?.tickets) {
            removeTicket(x.id);
        }
    });
    deleteDoc(doc(firestore, QUEUES, id));
}

// --------------------------------------------------------------------
// TICKETS
// --------------------------------------------------------------------

export function createTicket(
    student: string,
    message: string,
    queue_id: string
) {
    const id = uuidv4();
    setTicket(id, student, message, T.TicketStatus.Unclaimed);
    addTicketToQueue(queue_id, id);
}

export function setTicket(
    id: string,
    student: string,
    message: string,
    status: T.TicketStatus
) {
    return setDoc(doc(firestore, TICKETS, id), {
        id: id,
        student: student,
        message: message,
        status: status,
    });
}

export function getTicket(id: string) {
    return getDoc(doc(firestore, TICKETS, id));
}

export function removeTicket(id: string) {
    return deleteDoc(doc(firestore, TICKETS, id));
}

export function addTicketToQueue(queue_id: string, ticket_id: string) {
    return updateDoc(doc(firestore, QUEUES, queue_id), {
        tickets: arrayUnion(ticket_id),
    });
}

export function removeTicketFromQueue(queue_id: string, ticket_id: string) {
    updateDoc(doc(firestore, QUEUES, queue_id), {
        tickets: arrayRemove(ticket_id),
    });
    removeTicket(ticket_id);
}

export function setTicketStatus(id: string, status: T.TicketStatus) {
    return updateDoc(doc(firestore, TICKETS, id), {
        status: status,
    });
}
