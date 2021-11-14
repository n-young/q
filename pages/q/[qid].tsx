import React from "react";
import { ToastContainer } from "react-toastify";
import { useRouter } from 'next/router'
import Nav from "../../components/Nav";
import TicketList from "../../components/ticket/TicketList"

export default function Q() {
    const router = useRouter()
    const { qid } = router.query

    if (qid && typeof qid == "string") {
        return (
            <>
            <ToastContainer />
            <main>
                <Nav />
            <TicketList qid={qid} />
            </main>
            </>
        )
    }
    return <></>
}