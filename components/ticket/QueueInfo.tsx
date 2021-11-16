import React from "react";
import moment from "moment";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../../util/firebase";
import NewTicket from "./NewTicket";
import EditQueue from "./EditQueue";
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
                    {isTa && <EditQueue qid={queue.id} />}
                </div>
            </div>
            <div className={styles.info}>
                <p>
                    Ends at:{" "}
                    <strong>
                        {moment(queue.endTime.toDate()).format("h:mm A")}
                    </strong>
                </p>
                <p>
                    Currently <strong>{queue.tickets.length}</strong> student
                    {queue.tickets.length === 1 ? " " : "s "}
                    in line
                </p>
            </div>
            {queue.zoomLink && (
                <div className={styles.info}>
                    <p>
                        Zoom link:{" "}
                        <strong>
                            <a href={queue.zoomLink}>{queue.zoomLink}</a>
                        </strong>
                    </p>
                </div>
            )}
        </>
    ) : (
        <></>
    );
}
