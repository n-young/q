import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { createQueue } from "../../util/db"

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

interface QueueModalProps {
    isOpen: boolean
    closeModal: () => void
}
export function QueueModal(props: QueueModalProps) {
    const [course, setCourse] = useState("");
    const [location, setLocation] = useState("");

    const modalStyle = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)"
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
            <Form
                onSubmit={(e) => {
                    createQueue(course, location);
                    e.preventDefault();
                }}
            >
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
                <button type="submit">create</button>
            </Form>
        </Modal>
    );
}
