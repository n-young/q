import React, { useState } from "react";
import Modal from "react-modal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../util/firebase";
import { addTicketToQueue, createTicket } from "../../util/db";

interface TicketModalProps {
    isOpen: boolean;
    closeModal: () => void;
    qid: string
}
function TicketModal(props: TicketModalProps) {
    const [user] = useAuthState(auth);
    const [message, setMessage] = useState("");

    const modalStyle = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
            style={modalStyle}
            contentLabel="Join the Queue"
        >
            <h2>Join the Queue</h2>
            <form
                onSubmit={(e) => {
                    if (user && user.displayName && props.qid) {
                        createTicket(user.displayName, message, props.qid);
                    }
                    props.closeModal();
                    e.preventDefault();
                }}
            >
                <label>Message: </label>
                <input
                    value={message}
                    onChange={(x) => setMessage(x.target.value)}
                />
                <button type="submit">join</button>
            </form>
        </Modal>
    );
}

interface NewTicketProps {
    qid: string
}
export default function NewTicket({ qid }: NewTicketProps) {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <TicketModal qid={qid} isOpen={modalIsOpen} closeModal={closeModal} />
            <div>
                <h2>New Ticket</h2>
                <button onClick={openModal}>Create</button>
            </div>
        </>
    );
}
