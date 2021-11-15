import React from "react";
import Ticket from "./Ticket";
import styles from "./Ticket.module.css";

interface TicketListProps {
    queue: any;
    user: any;
    isTa: boolean;
}
export default function TicketList({ queue, user, isTa }: TicketListProps) {
    return queue && queue.tickets ? (
        <div className={styles.list}>
            {queue.tickets.map((x: string) => (
                <Ticket key={x} qid={queue.id} tid={x} user={user} isTa={isTa} />
            ))}
        </div>
    ) : (
        <></>
    );
}
