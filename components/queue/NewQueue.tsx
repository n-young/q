import React, { useState } from "react";
import Modal from "react-modal";
import { createQueue } from "../../util/db";
import styles from "../../styles/pages/Queue.module.css";

interface QueueModalProps {
    isOpen: boolean;
    closeModal: () => void;
}
function QueueModal(props: QueueModalProps) {
    const [course, setCourse] = useState("");
    const [location, setLocation] = useState("");

    const modalStyle = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            padding: "50px 100px",
            borderRadius: "0",
            border: "2px black solid",
            transform: "translate(-50%, -50%)",
        },
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
            style={modalStyle}
            contentLabel="Example Modal"
        >
            <h2>Create a New Queue</h2>
            <form
                onSubmit={(e) => {
                    createQueue(course, location);
                    props.closeModal();
                    e.preventDefault();
                }}
            >
                <div className={styles.form}>
                    <label>Course: </label>
                    <input
                        value={course}
                        onChange={(x) => setCourse(x.target.value)}
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

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <QueueModal isOpen={modalIsOpen} closeModal={closeModal} />
            <div
                className={`${styles.queueHolder} ${styles.newQueueHolder}`}
                onClick={openModal}
            >
                <h2>New Queue</h2>
                <p>Create a new queue</p>
            </div>
        </>
    );
}
