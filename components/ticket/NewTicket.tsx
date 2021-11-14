import React, { useState } from "react";
import Modal from "react-modal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../util/firebase";
import { createTicket } from "../../util/db";
import styles from "../../styles/pages/Ticket.module.css"

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
                <input
                    value={message}
                    onChange={(x) => setMessage(x.target.value)}
                    required
                    placeholder={"message (required)"}
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
            <div className={styles.newticket}>
                <button onClick={openModal}>New Ticket</button>
            </div>
        </>
    );
}
