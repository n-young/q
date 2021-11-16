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
            <h2>{queue.title}</h2>
            {user && <NewTicket qid={queue.id} />}
        </div>
    ) : (
        <></>
    );
}
