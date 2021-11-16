import React from "react";
import moment from "moment";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../util/firebase";
import QueueIcon from "./QueueIcon";
import NewQueue from "./NewQueue";
import styles from "./Queue.module.css";
import { useAdmin } from "../../util/hooks";

export default function QueueList() {
    const [isAdmin, adminLoading] = useAdmin();
    const [queues, loading, error] = useCollectionData(
        collection(firestore, "queues")
    );

    if (error) {
        return <p>An error occured.</p>;
    }

    return (
        <div className={styles.queues}>
            {!loading &&
                !adminLoading &&
                queues &&
                queues.map((x) => {
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
            {isAdmin && <NewQueue />}
        </div>
    );
}
