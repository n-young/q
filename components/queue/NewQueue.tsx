import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { createQueue } from "../../util/db";
import styles from "./Queue.module.css";
import { modalStyle } from "../../util/constants";
import { useTaCourses } from "../../util/hooks";

interface QueueModalProps {
    isOpen: boolean;
    closeModal: () => void;
}
function QueueModal({ isOpen, closeModal }: QueueModalProps) {
    const courses = useTaCourses();
    const [course, setCourse] = useState("");
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={modalStyle}
            contentLabel="Create a new Queue"
        >
            <h2>Create a New Queue</h2>
            <form
                onSubmit={(e) => {
                    createQueue(course, title, location);
                    setCourse("");
                    setTitle("");
                    setLocation("");
                    closeModal();
                    e.preventDefault();
                }}
            >
                <div className={styles.form}>
                    <label>Course: </label>
                    <select
                        value={course}
                        onChange={(x) => setCourse(x.target.value)}
                        required
                    >
                        <option disabled value={""}></option>
                        {courses.map((x) => (
                            <option value={x.id} key={x.id}>
                                {x.code}
                            </option>
                        ))}
                    </select>
                    <label>Title: </label>
                    <input
                        value={title}
                        onChange={(x) => setTitle(x.target.value)}
                        required
                    />
                    <label>Location: </label>
                    <input
                        value={location}
                        onChange={(x) => setLocation(x.target.value)}
                        required
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </Modal>
    );
}

export default function NewQueue() {
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
