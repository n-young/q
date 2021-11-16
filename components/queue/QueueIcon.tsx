import React, { ReactElement } from "react";
import moment from "moment"
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../../util/firebase";
import { useRouter } from "next/router";
import { QueueType } from "../../util/types";
import styles from "./Queue.module.css";

interface QueueProps {
    queue: QueueType;
}
export default function QueueIcon({
    queue,
}: QueueProps): ReactElement<QueueProps> {
    const router = useRouter();
    const [course, loading, error] = useDocumentData(
        doc(firestore, "courses", queue.course || "dummy")
    );
    const ended = queue.endTime < new Date()

    return !loading && course ? (
        <div
            className={`${styles.queueHolder} ${ended ? styles.queueExpired : ""}`}
            onClick={() => router.push(`/q/${queue.id}`)}
        >
            <h2 className={styles.courseTitle}>{course.code} : {queue.title}</h2>
            <div className={styles.queueInfo}>
                <p>{ended ? "Ended" : "Ends"} at: <strong>{moment.utc(queue.endTime).tz().format("h:mm A")}</strong></p>
                <p>Currently <strong>{queue.tickets.length}</strong> students in line</p>
            </div>
        </div>
    ) : <></>;
}
