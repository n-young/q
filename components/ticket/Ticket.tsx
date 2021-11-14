import React, { useState, useEffect } from "react";
import { getTicket } from "../../util/db";
import { TicketType } from "../../util/types"
import styles from "../../styles/pages/Ticket.module.css"

interface TicketProps {
    tid: string;
}
export default function Ticket({ tid }: TicketProps) {
    const [ticket, setTicket] = useState<TicketType>()

    useEffect(() => {
        getTicket(tid).then(x => {
            const data = x.data()
            if (data) {
                setTicket({
                    id: data.id,
                    student: data.student, 
                    message: data.message
                })
            }
        })
    }, [tid])

    return ticket ? (
        <div className={styles.ticket}>
        <p>
            {ticket.student}
            </p>
            <p>
                {ticket.message}
                </p>
        </div>
    ) : (<></>)
}
