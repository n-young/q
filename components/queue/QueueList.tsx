import React from "react";
import { collection, query, where, Timestamp } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../util/firebase";
import QueueIcon from "./QueueIcon";
import NewQueue from "./NewQueue";
import styles from "./Queue.module.css";
import { useAdmin, useTA } from "../../util/hooks";
import { times } from "../../util/constants";

export default function QueueList() {
    const [isAdmin, adminLoading] = useAdmin();
    const [isTA, TALoading] = useTA();
    const [queues, loading, error] = useCollectionData(
        query(
            collection(firestore, "queues"),
            where("endTime", ">", Timestamp.fromDate(times[0].toDate()))
        )
    );

    if (error) {
        return <p>An error occured.</p>;
    }

    return (
        <div className={styles.queues}>
            {!loading &&
                !adminLoading &&
                !TALoading &&
                queues &&
                queues
                    .sort((x) => x.code)
                    .map((x) => {
                        const q = {
                            id: x.id,
                            course: x.course,
                            title: x.title,
                            location: x.location,
                            zoomLink: x.zoomLink,
                            endTime: x.endTime.toDate(),
                            tickets: x.tickets,
                        };
                        return <QueueIcon key={x.id} queue={q} />;
                    })}
            {(isAdmin || isTA) && <NewQueue />}
        </div>
    );
}
