import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../util/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import NewTicket from "./NewTicket";
import styles from "./Ticket.module.css";

interface QueueInfoProps {
    qid: string;
}
export default function QueueInfo({ qid }: QueueInfoProps) {
    const [user] = useAuthState(auth);
    const [queue, loading, error] = useDocumentData(
        doc(firestore, "queues", qid)
    );

    return !loading && queue && queue.tickets ? (
        <div className={styles.info}>
            <h2>Course: {queue.course}</h2>
            {user && <NewTicket qid={qid} />}
        </div>
    ) : (
        <></>
    );
}
