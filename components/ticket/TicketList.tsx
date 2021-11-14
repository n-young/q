import React from "react";
import Ticket from "./Ticket"
import { firestore } from "../../util/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import styles from "./Ticket.module.css"

interface TicketListProps {
    qid: string
}
export default function TicketList({ qid }: TicketListProps) {
    const [queue, loading, error] = useDocumentData(
        doc(firestore, "queues", qid)
    );

    return !loading && queue && queue.tickets ? (
        <div className={styles.list}>
            {queue.tickets.map((x: string, i: number) => (
                <Ticket key={i} qid={qid} tid={x} />
            ))}
        </div>
    ) : <></>
}