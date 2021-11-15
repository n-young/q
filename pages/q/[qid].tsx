import React from "react";
import { useRouter } from "next/router";
import Main from "../../components/Main";
import QueueInfo from "../../components/ticket/QueueInfo";
import TicketList from "../../components/ticket/TicketList";

export default function Q() {
    const router = useRouter();
    const { qid } = router.query;

    if (qid && typeof qid == "string") {
        return (
            <Main>
                <QueueInfo qid={qid} />
                <TicketList qid={qid} />
            </Main>
        );
    }
    return <></>;
}
