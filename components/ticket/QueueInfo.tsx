import React from "react";
import NewTicket from "./NewTicket";
import styles from "./Ticket.module.css";

interface QueueInfoProps {
    queue: any;
    user: any;
    isTa: boolean;
}
export default function QueueInfo({ queue, user, isTa }: QueueInfoProps) {
    return queue && queue.tickets ? (
        <div className={styles.info}>
            <h2>Course: {queue.course}</h2>
            {user && !isTa && <NewTicket qid={queue.id} />}
        </div>
    ) : (
        <></>
    );
}
