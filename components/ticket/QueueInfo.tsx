import React from "react";
import moment from "moment-timezone";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../../util/firebase";
import NewTicket from "./NewTicket";
import EditQueue from "./EditQueue";
import styles from "./Ticket.module.css";
import { useQueueTickets } from "../../util/hooks";
import { dtformat, timezone } from "../../util/constants";

interface QueueInfoProps {
    queue: any;
    user: any;
    isTa: boolean;
}
export default function QueueInfo({ queue, user, isTa }: QueueInfoProps) {
    const [course, loading, error] = useDocumentData(
        doc(firestore, "courses", queue.course || "dummy")
    );
    const tickets = useQueueTickets(queue);
    const isSignedUp = tickets.some((x: any) => x?.studentId === user?.uid);
    const ended = queue.endTime < new Date();

    if (loading || !course || !queue || !queue.tickets) return <></>;

    const QueueDetails = () => (
        <div className={styles.info}>
            <h2>
                {course.code} : {queue.title}
            </h2>
            <div>
                {user && !isSignedUp && !ended && (
                    <NewTicket qid={queue.id} ended={ended} />
                )}
                {isTa && <EditQueue qid={queue.id} />}
            </div>
        </div>
    );

    const QueueNotes = () => (
        <div className={styles.info}>
            <p>
                Ends at:{" "}
                <strong>
                    {moment
                        .tz(moment.utc(queue.endTime.toDate()), timezone)
                        .format(dtformat)}
                </strong>
                .
            </p>
            <p>
                Currently <strong>{queue.tickets.length}</strong> student
                {queue.tickets.length === 1 ? " " : "s "}
                in line.
            </p>
        </div>
    );

    const QueueLinks = () =>
        queue.zoomLink && (
            <div className={styles.info}>
                <p>
                    Zoom link:{" "}
                    <strong>
                        <a href={queue.zoomLink}>{queue.zoomLink}</a>
                    </strong>
                    .
                </p>
            </div>
        );

    return (
        <>
            <QueueDetails />
            <QueueNotes />
            <QueueLinks />
        </>
    );
}
