import React from "react";
import Ticket from "./Ticket"
import NewTicket from "./NewTicket";
import { firestore } from "../../util/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";

interface TicketListProps {
    qid: string
}
export default function TicketList({ qid }: TicketListProps) {
    const [queue, loading, error] = useDocumentData(
        doc(firestore, "queues", qid)
    );

    return !loading && queue && queue.tickets ? (
        <div>
            {queue.tickets.map((x: string, i: number) => (
                <Ticket key={i} tid={x} />
            ))}
            <NewTicket qid={qid} />
        </div>
    ) : <></>
}