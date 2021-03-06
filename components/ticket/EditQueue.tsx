import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Modal from "react-modal";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../../util/firebase";
import {
    dtformat,
    modalStyle,
    nextNHours,
    timezone,
} from "../../util/constants";
import { setQueue } from "../../util/db";
import styles from "./Ticket.module.css";

interface EditQueueModalProps {
    isOpen: boolean;
    closeModal: () => void;
    qid: string;
}
function EditQueueModal({ isOpen, closeModal, qid }: EditQueueModalProps) {
    const [queue, loading, error] = useDocumentData(
        doc(firestore, "queues", qid || "dummy")
    );
    const [title, setTitle] = useState(queue?.title);
    const [location, setLocation] = useState(queue?.location);
    const [zoomLink, setZoomLink] = useState(queue?.zoomLink);
    const [endTime, setEndTime] = useState(-1);
    const [loaded, setLoaded] = useState(false);
    const times = nextNHours(12);

    useEffect(() => {
        if (!loading && queue && !loaded) {
            setTitle(queue.title);
            setLocation(queue.location);
            setZoomLink(queue.zoomLink);
            setLoaded(true);
        }
    }, [queue, loading, times, loaded]);

    const setNewQueue = (newQueue: any) => {
        const toset = {
            ...queue,
            ...newQueue,
        };

        if (queue)
            setQueue(
                toset.id,
                toset.course,
                toset.title,
                toset.location,
                toset.zoomLink,
                toset.endTime.toDate()
            );
    };

    return !loading && queue ? (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => {
                closeModal();
                setLoaded(false);
            }}
            style={modalStyle}
            contentLabel="Edit Queue"
            ariaHideApp={false}
        >
            <h2>Edit Queue</h2>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <label>Title:</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Location:</label>
                <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <label>Zoom Link:</label>
                <input
                    value={zoomLink}
                    onChange={(e) => setZoomLink(e.target.value)}
                />
                <label>End time:</label>
                <select
                defaultValue={-1}
                    onChange={(x) => setEndTime(parseInt(x.target.value, 10))}
                    required
                >
                    {times.map((y, i) => (
                        <option value={i} key={i}>
                            {moment.tz(y, timezone).format(dtformat)}
                        </option>
                    ))}
                </select>
                <button
                    onClick={(_) => {
                        console.log(times);
                        console.log(endTime);
                        setNewQueue({
                            title: title,
                            location: location,
                            zoomLink: zoomLink,
                            endTime: times[endTime],
                        });
                    }}
                >
                    Save Queue
                </button>
                <button
                    onClick={(_) => {
                        setNewQueue({
                            endTime: moment.utc(),
                        });
                        closeModal();
                    }}
                >
                    Close Queue
                </button>
            </form>
        </Modal>
    ) : (
        <></>
    );
}

interface EditQueueProps {
    qid: string;
}
export default function EditQueue({ qid }: EditQueueProps) {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <EditQueueModal
                qid={qid}
                isOpen={modalIsOpen}
                closeModal={() => setIsOpen(false)}
            />
            <button onClick={() => setIsOpen(true)}>Edit</button>
        </>
    );
}
