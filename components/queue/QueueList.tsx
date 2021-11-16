import React, { useState, useEffect } from "react";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../util/firebase";
import { QueueIcon } from "./QueueIcon";
import { NewQueue } from "./NewQueue";
import styles from "./Queue.module.css";
import { useAdmin } from "../../util/hooks";

export default function QueueList() {
    const isAdmin = useAdmin();
    const [messages, loading, error] = useCollectionData(
        collection(firestore, "queues")
    );

    if (error) {
        return <p>An error occured.</p>;
    }

    return (
        <div className={styles.queues}>
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
        </div>
    );
}
