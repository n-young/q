import React, { ReactElement } from "react";
import { useRouter } from 'next/router'
import { QueueType } from "../../util/types";
import styles from "./Queue.module.css"

interface QueueProps {
    queue: QueueType;
}
export function QueueIcon(props: QueueProps): ReactElement<QueueProps> {
    const router = useRouter()

    return (
        <div className={styles.queueHolder} onClick={() => router.push(`/q/${props.queue.id}`)}>
            <h2>{props.queue.course}</h2>
            <p>{props.queue.location}</p>
        </div>
    );
}
