import React from "react";
import { QueueHolder } from "./QueueIcon"
import { QueueModal } from "./QueueModal"

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
            <QueueHolder>
                <h2>New Queue</h2>
                <button onClick={openModal}>Create</button>
            </QueueHolder>
        </>
    );
}