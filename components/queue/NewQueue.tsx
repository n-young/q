import React, { useState } from "react";
import moment from "moment-timezone";
import Modal from "react-modal";
import styles from "./Queue.module.css";
import { createQueue } from "../../util/db";
import { useTaCourses } from "../../util/hooks";
import { dtformat, modalStyle, times, timezone } from "../../util/constants";

interface QueueModalProps {
    isOpen: boolean;
    closeModal: () => void;
}
function QueueModal({ isOpen, closeModal }: QueueModalProps) {
    const courses = useTaCourses();
    const [course, setCourse] = useState("");
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [zoomLink, setZoomLink] = useState("");
    const [endTime, setEndTime] = useState(0);

    const reset = () => {
        setCourse("");
        setTitle("");
        setLocation("");
        setZoomLink("");
        setEndTime(-1);
        closeModal();
    };

    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={modalStyle}
            contentLabel="Create a new Queue"
            ariaHideApp={false}
        >
            <h2>Create a New Queue</h2>
            <form
                onSubmit={(e) => {
                    createQueue(
                        course,
                        title,
                        location,
                        zoomLink,
                        times[endTime].toDate()
                    );
                    reset();
                    e.preventDefault();
                }}
            >
                <div className={styles.form}>
                    <label>Course: </label>
                    <select
                        value={course}
                        defaultValue={""}
                        onChange={(x) => setCourse(x.target.value)}
                        required
                    >
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
                    <label>Zoom Link: </label>
                    <input
                        value={zoomLink}
                        onChange={(x) => setZoomLink(x.target.value)}
                        placeholder={"optional"}
                    />
                    <label>End Time: </label>
                    <select
                        value={endTime}
                        defaultValue={-1}
                        onChange={(x) =>
                            setEndTime(parseInt(x.target.value, 10))
                        }
                        required
                    >
                        {times.map((y, i) => (
                            <option value={i} key={i}>
                                {moment.tz(y, timezone).format(dtformat)}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">create</button>
            </form>
        </Modal>
    );
}

export default function NewQueue() {
    const [modalIsOpen, setIsOpen] = useState(false);

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
                <h2 className={styles.courseTitle}>New Queue</h2>
            <div className={styles.queueInfo}>
                <p>Create a new queue.</p>
                <p></p>
            </div>
            </div>
        </>
    );
}
