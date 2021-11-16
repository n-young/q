import React, { ReactElement } from "react";
import moment from "moment-timezone";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../../util/firebase";
import { useRouter } from "next/router";
import { QueueType } from "../../util/types";
import styles from "./Queue.module.css";
import { timezone, dtformat } from "../../util/constants";

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
    const ended = queue.endTime < new Date();

    return !loading && course ? (
        <div
            className={`${styles.queueHolder} ${
                ended ? styles.queueExpired : ""
            }`}
            onClick={() => router.push(`/q/${queue.id}`)}
        >
            <h2 className={styles.courseTitle}>
                {course.code} : {queue.title}
            </h2>
            <div className={styles.queueInfo}>
                <p>
                    {ended ? "Ended" : "Ends"} at:{" "}
                    <strong>
                        {moment
                            .tz(moment.utc(queue.endTime), timezone)
                            .format(dtformat)}
                    </strong>
                    .
                </p>
                <p>
                    Currently <strong>{queue.tickets.length}</strong> student
                    {queue.tickets.length === 1 ? " " : "s "} in line.
                </p>
            </div>
        </div>
    ) : (
        <></>
    );
}
