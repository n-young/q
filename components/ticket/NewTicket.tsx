import React, { useState } from "react";
import Modal from "react-modal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../util/firebase";
import { createTicket } from "../../util/db";
import { modalStyle } from "../../util/constants";

interface TicketModalProps {
    isOpen: boolean;
    closeModal: () => void;
    qid: string;
}
function TicketModal({ isOpen, closeModal, qid }: TicketModalProps) {
    const [user] = useAuthState(auth);
    const [message, setMessage] = useState("");

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={modalStyle}
            contentLabel="Join the Queue"
        >
            <h2>Join the Queue</h2>
            <form
                onSubmit={(e) => {
                    if (user && user.displayName && qid) {
                        createTicket(user.displayName, user.uid, message, qid);
                    }
                    setMessage("");
                    closeModal();
                    e.preventDefault();
                }}
            >
                <input
                    value={message}
                    onChange={(x) => setMessage(x.target.value)}
                    placeholder={"message (required)"}
                    autoFocus={true}
                    required
                />
                <button type="submit">join</button>
            </form>
        </Modal>
    );
}

interface NewTicketProps {
    qid: string;
}
export default function NewTicket({ qid }: NewTicketProps) {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <TicketModal
                qid={qid}
                isOpen={modalIsOpen}
                closeModal={() => setIsOpen(false)}
            />
            <button onClick={() => setIsOpen(true)}>Join</button>
        </>
    );
}
