import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../../util/firebase";
import { QueueIcon } from "./QueueIcon";
import { NewQueue } from "./NewQueue";
import { getAdminByID } from "../../util/db";

const QueuesHolder = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`;

export default function QueueList() {
    const [user] = useAuthState(auth);
    const [messages, loading, error] = useCollectionData(
        collection(firestore, "queues")
    );
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (user) {
            getAdminByID(user?.uid).then((res) => {
                res.forEach((_) => setIsAdmin(true));
            });
        }
    }, [user]);

    if (error) {
        return <p>An error occured.</p>;
    }

    return (
        <QueuesHolder>
            {!loading &&
                messages &&
                messages.map((x, i) => {
                    const q = {
                        id: x.id,
                        course: x.course,
                        location: x.location,
                        tickets: x.tickets,
                    };
                    return <QueueIcon key={i} queue={q} />;
                })}
            {isAdmin && <NewQueue />}
        </QueuesHolder>
    );
}
