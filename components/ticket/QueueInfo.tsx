import React from "react";
import moment from "moment"
import { doc, Timestamp } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../../util/firebase";
import NewTicket from "./NewTicket";
import styles from "./Ticket.module.css";

interface QueueInfoProps {
    queue: any;
    user: any;
    isTa: boolean;
}
export default function QueueInfo({ queue, user, isTa }: QueueInfoProps) {
    const [course, loading, error] = useDocumentData(
        doc(firestore, "courses", queue.course || "dummy")
    );


    return !loading && course && queue && queue.tickets ? (
        <>
        <div className={styles.info}>
            <h2>
                {course.code} : {queue.title}
            </h2>
            <div>
                {user && <NewTicket qid={queue.id} />}
                {/* {isTa && <CloseQueue qid={queue.id} />} */}
            </div>
        </div>
        <div className={styles.info}>
                <p>Ends at: <strong>{moment(queue.endTime.toDate()).format("h:MM A")}</strong></p>
                <p>Currently <strong>{queue.tickets.length}</strong> students in line</p>
        </div>
        </>
    ) : (
        <></>
    );
}
