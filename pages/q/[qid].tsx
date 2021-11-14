import React from "react";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import Nav from "../../components/Nav";
import QueueInfo from "../../components/ticket/QueueInfo";
import TicketList from "../../components/ticket/TicketList";

export default function Q() {
    const router = useRouter();
    const { qid } = router.query;

    if (qid && typeof qid == "string") {
        return (
            <>
                <Nav />
                <ToastContainer />
                <main>
                    <QueueInfo qid={qid} />
                    <TicketList qid={qid} />
                </main>
            </>
        );
    }
    return <></>;
}
