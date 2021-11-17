import React from "react";
import { collection, query, where, Timestamp } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../util/firebase";
import QueueIcon from "./QueueIcon";
import NewQueue from "./NewQueue";
import styles from "./Queue.module.css";
import { useAdmin, useTA, useHTA } from "../../util/hooks";
import { times } from "../../util/constants";

export default function QueueList() {
    const [isAdmin, adminLoading] = useAdmin();
    const [isTA, TALoading] = useTA();
    const [isHTA, HTALoading] = useHTA();
    const [queues, loading, error] = useCollectionData(
        query(
            collection(firestore, "queues"),
            where("endTime", ">", Timestamp.fromDate(times[0].toDate()))
        )
    );

    return (
        <div className={styles.queues}>
            {!loading &&
                !adminLoading &&
                !TALoading &&
                !HTALoading &&
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
            {(isAdmin || isTA || isHTA) && <NewQueue />}
        </div>
    );
}
