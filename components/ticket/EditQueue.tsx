import React from "react";
import moment from "moment";
import Modal from "react-modal";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../../util/firebase";
import { dtformat, modalStyle, nextNHours } from "../../util/constants";
import { setQueue } from "../../util/db";
import styles from "./Ticket.module.css";

interface EditQueueModalProps {
    isOpen: boolean;
    closeModal: () => void;
    qid: string;
}
function EditQueueModal({ isOpen, closeModal, qid }: EditQueueModalProps) {
    const times = nextNHours(12);
    const [queue, loading, error] = useDocumentData(
        doc(firestore, "queues", qid || "dummy")
    );

    const setNewQueue = (newQueue: any) => {
        const toset = {
            ...queue,
            ...newQueue,
        };
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
            onRequestClose={closeModal}
            style={modalStyle}
            contentLabel="Edit Queue"
        >
            <h2>Edit Queue</h2>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <label>Title:</label>
                <input
                    value={queue.title}
                    onChange={(e) => setNewQueue({ title: e.target.value })}
                />
                <label>Location:</label>
                <input
                    value={queue.location}
                    onChange={(e) => setNewQueue({ location: e.target.value })}
                />
                <label>Zoom Link:</label>
                <input
                    value={queue.zoomLink}
                    onChange={(e) => setNewQueue({ zoomLink: e.target.value })}
                />
                <label>End time:</label>
                <select
                    onChange={(x) =>
                        setNewQueue({
                            endTime: times[parseInt(x.target.value, 10)],
                        })
                    }
                    required
                >
                    <option value={-1} disabled selected></option>
                    {times.map((y, i) => (
                        <option value={i} key={i}>
                            {y.format(dtformat)}
                        </option>
                    ))}
                </select>
                <button
                    onClick={(_) =>
                        setNewQueue({
                            endTime: moment.utc(),
                        })
                    }
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
