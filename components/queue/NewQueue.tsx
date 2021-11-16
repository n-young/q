import React, { useState } from "react";
import Modal from "react-modal";
import { createQueue } from "../../util/db";
import styles from "./Queue.module.css";

const modalStyle = {
    content: {
        top: "30%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        padding: "50px 100px",
        borderRadius: "0",
        border: "1px black solid",
        transform: "translate(-50%, -50%)",
    },
};

interface QueueModalProps {
    isOpen: boolean;
    closeModal: () => void;
}
function QueueModal(props: QueueModalProps) {
    const [course, setCourse] = useState("");
    const [location, setLocation] = useState("");

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
            style={modalStyle}
            contentLabel="Create a new Queue"
        >
            <h2>Create a New Queue</h2>
            <form
                onSubmit={(e) => {
                    createQueue(course, location);
                    setCourse("");
                    setLocation("");
                    props.closeModal();
                    e.preventDefault();
                }}
            >
                <div className={styles.form}>
                    <label>Course: </label>
                    <input
                        value={course}
                        onChange={(x) => setCourse(x.target.value)}
                        autoFocus={true}
                    />
                    <label>Location: </label>
                    <input
                        value={location}
                        onChange={(x) => setLocation(x.target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </Modal>
    );
}

export function NewQueue() {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <QueueModal
                isOpen={modalIsOpen}
                closeModal={() => setIsOpen(false)}
            />
            <div
                className={`${styles.queueHolder} ${styles.newQueueHolder}`}
                onClick={() => setIsOpen(true)}
            >
                <h2>New Queue</h2>
                <p>Create a new queue</p>
            </div>
        </>
    );
}
