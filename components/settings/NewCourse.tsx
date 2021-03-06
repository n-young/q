import React, { useState } from "react";
import Modal from "react-modal";
import { modalStyle } from "../../util/constants";
import { createCourse } from "../../util/db";
import styles from "./Settings.module.css";

interface CourseModalProps {
    isOpen: boolean;
    closeModal: () => void;
}
function CourseModal({ isOpen, closeModal }: CourseModalProps) {
    const [course, setCourse] = useState("");
    const [code, setCode] = useState("");

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={modalStyle}
            contentLabel="Create a new Course"
            ariaHideApp={false}
        >
            <h2>Create a New Course</h2>
            <form
                onSubmit={(e) => {
                    createCourse(course, code);
                    setCourse("");
                    setCode("");
                    closeModal();
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
                    <label>Code: </label>
                    <input
                        value={code}
                        onChange={(x) => setCode(x.target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </Modal>
    );
}

export function NewCourse() {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <CourseModal
                isOpen={modalIsOpen}
                closeModal={() => setIsOpen(false)}
            />
            <button onClick={() => setIsOpen(true)}>
                New course
            </button>
        </>
    );
}
