import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc } from "firebase/firestore";
import { auth, firestore } from "../../util/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Main from "../../components/common/Main";
import QueueInfo from "../../components/ticket/QueueInfo";
import TicketList from "../../components/ticket/TicketList";
import { useTAFor } from "../../util/hooks";

function definitelyQid(qid: string | string[] | undefined): string {
    return typeof qid == "string" ? qid : "dummy";
}

export default function Q() {
    const qid = definitelyQid(useRouter().query.qid);
    const [user] = useAuthState(auth);
    const [queue, loading, error] = useDocumentData(
        doc(firestore, "queues", qid)
    );
    const isTa = useTAFor(queue);

    if (qid && !loading && typeof qid == "string") {
        return (
            <Main>
                <QueueInfo queue={queue} user={user} isTa={isTa} />
                <TicketList queue={queue} user={user} isTa={isTa} />
            </Main>
        );
    }
    return <></>;
}
