import React, { useReducer, useState } from "react";
import { setTicketStatus, removeTicketFromQueue } from "../../util/db";
import { firestore } from "../../util/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { TicketStatus } from "../../util/types";
import styles from "./Ticket.module.css";

interface ClaimButtonProps {
    status: TicketStatus;
    tid: string;
}
function ClaimButton({ status, tid }: ClaimButtonProps) {
    return status == TicketStatus.Unclaimed ? (
        <button onClick={() => setTicketStatus(tid, TicketStatus.Claimed)}>
            Claim
        </button>
    ) : (
        <button
            className={styles.unclaimed}
            onClick={() => setTicketStatus(tid, TicketStatus.Unclaimed)}
        >
            Unclaim
        </button>
    );
}

interface DeleteButtonProps {
    qid: string;
    tid: string;
}
function DeleteButton({ qid, tid }: DeleteButtonProps) {
    const [confirm, setConfirm] = useState(false);

    return confirm ? (
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
    );
}

interface StatusButtonProps {
    status: TicketStatus;
}
function StatusButton({ status }: StatusButtonProps) {
    return status == TicketStatus.Unclaimed ? (
        <button>Unclaimed</button>
    ) : (
        <button className={styles.unclaimed}>Claimed</button>
    );
}

interface TicketProps {
    qid: string;
    tid: string;
    user: any;
    isTa: boolean;
}
export default function Ticket({
    qid,
    tid,
    user,
    isTa,
}: TicketProps) {
    const [ticket, loading, error] = useDocumentData(
        doc(firestore, "tickets", tid)
    );
    const mine = ticket?.studentId === user.uid;

    return ticket ? (
        <div className={styles.ticket}>
            <div>
                <p>{ticket.student}</p>
                <p>{ticket.message}</p>
            </div>
            <div>
                {isTa && <ClaimButton status={ticket.status} tid={tid} />}
                {isTa && <DeleteButton qid={qid} tid={tid} />}
                {!isTa && <StatusButton status={ticket.status} />}
            </div>
        </div>
    ) : (
        <></>
    );
}
