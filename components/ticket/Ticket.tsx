import React, { useState } from "react";
import { setTicketStatus, removeTicketFromQueue } from "../../util/db";
import { firestore } from "../../util/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { TicketStatus } from "../../util/types";
import styles from "./Ticket.module.css";

interface TicketProps {
    qid: string;
    tid: string;
}
export default function Ticket({ qid, tid }: TicketProps) {
    const [confirm, setConfirm] = useState(false);
    const [ticket, loading, error] = useDocumentData(
        doc(firestore, "tickets", tid)
    );

    const f = (status: TicketStatus) => {
        if (ticket && ticket.id) setTicketStatus(ticket.id, status);
    };

    return ticket ? (
        <div className={styles.ticket}>
            <div>
                <p>{ticket.student}</p>
                <p>{ticket.message}</p>
            </div>
            <div>
                {ticket.status == TicketStatus.Unclaimed ? (
                    <button onClick={() => f(TicketStatus.Claimed)}>
                        Claim
                    </button>
                ) : (
                    <button
                        className={styles.unclaimed}
                        onClick={() => f(TicketStatus.Unclaimed)}
                    >
                        Unclaim
                    </button>
                )}
                {confirm ? (
                    <button
                        className={styles.unclaimed}
                        onClick={() => {
                            removeTicketFromQueue(qid, tid);
                            setConfirm(false);
                        }}
                        onBlur={() => setConfirm(false)}
                    >
                        Confirm
                    </button>
                ) : (
                    <button onClick={() => setConfirm(true)}>Delete</button>
                )}
            </div>
        </div>
    ) : (
        <></>
    );
}
