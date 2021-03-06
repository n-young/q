import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import useSound from "use-sound";
import { toast } from "react-toastify";
import { setTicketStatus, removeTicketFromQueue } from "../../util/db";
import { firestore } from "../../util/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { TicketStatus } from "../../util/types";
import styles from "./Ticket.module.css";
import EditTicket from "./EditTicket";
import { timezone, dtformat } from "../../util/constants";

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
export default function Ticket({ qid, tid, user, isTa }: TicketProps) {
    const [ticket, loading, error] = useDocumentData(
        doc(firestore, "tickets", tid)
    );
    const mine = ticket && user && ticket.studentId === user.uid;
    const [dingding] = useSound("/claimed.mp3");

    const [claimed, setClaimed] = useState(false);
    useEffect(() => {
        if (ticket?.status === TicketStatus.Claimed && !claimed) {
            toast("You've been claimed!", {
                position: "top-center",
                type: "success",
            });
            dingding();
            setClaimed(true);
        }

        if (ticket?.status === TicketStatus.Unclaimed && claimed) {
            setClaimed(false);
        }
    }, [ticket?.status, claimed, dingding]);

    return ticket ? (
        <div className={styles.ticket}>
            <div className={styles.ticketInfo}>
                <div>
                    <p>
                        <strong>Student</strong>: {ticket.student}
                    </p>
                    <p>
                        <strong>Message</strong>: {ticket.message}
                    </p>
                    <p>
                        <strong>Submitted</strong>:{" "}
                        {moment
                            .tz(
                                moment.utc(ticket.timestamp.toDate()),
                                timezone
                            )
                            .format(dtformat)}
                    </p>
                </div>
                <div>
                    {!isTa && <StatusButton status={ticket.status} />}
                    {isTa && <ClaimButton status={ticket.status} tid={tid} />}
                    {mine && <EditTicket tid={tid} />}
                    {(mine || isTa) && <DeleteButton qid={qid} tid={tid} />}
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
}
